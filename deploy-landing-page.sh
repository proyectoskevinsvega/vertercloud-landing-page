#!/usr/bin/env bash

export BUN_INSTALL="/root/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

set -euo pipefail

# ============================================================
#  deploy-landing-page.sh
#  Deploy manual de emergencia para vertercloud/landing-page
#  Uso normal: el deploy lo hace GitHub Actions automáticamente
#  Este script es para fallback o deploy manual desde el VPS
# ============================================================

# Configuration
PROJECT_NAME="vertercloud-landing"
BASE_DIR="/var/www/vertercloud/landing-page"
RELEASES_DIR="$BASE_DIR/releases"
CURRENT_DIR="$BASE_DIR/current"
LOG_FILE="$BASE_DIR/deploy.log"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
NEW_RELEASE_DIR="$RELEASES_DIR/$TIMESTAMP"
KEEP_RELEASES=5

# Capture previous release BEFORE any changes (used for automatic rollback)
PREVIOUS_RELEASE=$(readlink -f "$CURRENT_DIR" 2>/dev/null || echo "")

# Logging function
log() {
    local message=$1
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $message" | tee -a "$LOG_FILE"
}

# Error handler — automatic rollback to previous release
on_error() {
    log "❌ ERROR: Deployment failed at line $1"
    if [ -n "$PREVIOUS_RELEASE" ] && [ -d "$PREVIOUS_RELEASE" ]; then
        log "⏪ Rolling back to: $PREVIOUS_RELEASE"
        ln -sfn "$PREVIOUS_RELEASE" "$CURRENT_DIR"
        sudo systemctl reload nginx && log "✅ Nginx reloaded — previous release restored"
    else
        log "⚠️  No previous release found — manual intervention required"
    fi
    exit 1
}
trap 'on_error "$LINENO"' ERR

log "-------------------------------------------"
log "🚀 Starting deployment for $PROJECT_NAME..."
log "📅 Release: $TIMESTAMP"

# 1. Create structure if not exists
mkdir -p "$RELEASES_DIR"
touch "$LOG_FILE"

# 2. Isolated Build Prep
log "📦 Creating isolated release directory: $NEW_RELEASE_DIR"
mkdir -p "$NEW_RELEASE_DIR"

# El script se ejecuta desde /var/www/vertercloud/landing-page/source
log "📂 Copying source files to release directory..."
rsync -a --exclude 'node_modules' --exclude '.git' --exclude 'releases' ./ "$NEW_RELEASE_DIR/"

# 3. Build Process
cd "$NEW_RELEASE_DIR"

if command -v bun &> /dev/null; then
    log "⚡ Bun detected. Using Bun for build..."
    bun install
    bun run build
else
    log "📦 npm detected. Using npm for build..."
    npm install
    npm run build
fi

# Pre-comprimir assets para gzip_static
log "🗜️  Pre-comprimiendo assets (gzip_static)..."
find dist -type f \( -name "*.js" -o -name "*.css" -o -name "*.svg" -o -name "*.html" -o -name "*.json" \) \
    -print0 | xargs -0 -P4 -I{} gzip -9 -k -f "{}"
log "✅ Pre-compresión completada"

# 4. Atomic Switch
log "🔄 Switching to new release (atomic symlink)..."
ln -sfn "$NEW_RELEASE_DIR" "$CURRENT_DIR"

# 5. Nginx Refresh
log "🌐 Reloading Nginx..."
sudo systemctl reload nginx
log "✅ Nginx reloaded successfully"

# 6. Health Check
sleep 2
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
    http://localhost/ -H "Host: bravexcolombia.com")

if [ "$HTTP_STATUS" != "200" ] && [ "$HTTP_STATUS" != "301" ]; then
    log "❌ Health check failed (HTTP $HTTP_STATUS)"
    on_error "$LINENO"
fi
log "✅ Health check passed — HTTP $HTTP_STATUS"

# 7. Cleanup old releases
log "🧹 Cleaning up old releases (keeping last $KEEP_RELEASES)..."
cd "$RELEASES_DIR"
ls -1dt 20* | tail -n +$((KEEP_RELEASES + 1)) | xargs -r rm -rf --

log "🎉 Deployment finished successfully!"
log "-------------------------------------------"
