# Zero-Downtime VPS Deployment — vertercloud-landing

Deploy automático al hacer `git push main` → GitHub Actions → VPS.

---

## 📁 Estructura en el VPS

```
/var/www/vertercloud/landing-page/
├── releases/
│   ├── a1b2c3d.../   ← SHA del commit anterior
│   └── cfaf00d.../   ← SHA del commit actual (activo)
└── current           ← symlink al release activo (Nginx apunta aquí)
```

Nginx sirve siempre desde `/var/www/vertercloud/landing-page/current/dist`.

---

## 🚀 Flujo de deploy automático

```
git push origin main
       ↓
GitHub Actions (.github/workflows/deploy.yml)
  1. Checkout del código
  2. bun install + bun run build   ← en el runner de GitHub (gratis)
  3. gzip -9 de todos los assets   ← para gzip_static en Nginx
  4. scp dist/ → VPS /releases/SHA_COMMIT
  5. ln -sfn releases/SHA current  ← switch atómico
  6. systemctl reload nginx
  7. curl health check (HTTP 200)
  8. rollback automático si falla  ← restaura el symlink anterior
  9. cleanup: conserva últimos 5 releases
```

---

## 🔄 Rollback instantáneo

```bash
# 1. Ver releases disponibles (SHA de cada commit)
ls -dt /var/www/vertercloud/landing-page/releases/*

# 2. Apuntar al release anterior
ln -sfn /var/www/vertercloud/landing-page/releases/[SHA_COMMIT] \
        /var/www/vertercloud/landing-page/current

# 3. Recargar Nginx
sudo systemctl reload nginx
```

---

## 🔑 GitHub Secrets requeridos

| Secret        | Valor                   |
| ------------- | ----------------------- |
| `VPS_HOST`    | IP o dominio del VPS    |
| `VPS_USER`    | Usuario SSH             |
| `VPS_SSH_KEY` | Clave privada SSH (PEM) |

Configurar en: **GitHub → Settings → Secrets and variables → Actions**

---

## 📜 Logs

```bash
# Nginx access
tail -f /var/log/nginx/access.log

# Nginx errors
tail -f /var/log/nginx/error.log
```

---

## 🛠️ Setup inicial del VPS

```bash
# Crear estructura de directorios
sudo mkdir -p /var/www/vertercloud/landing-page/{releases,errors}
sudo chown -R $USER:$USER /var/www/vertercloud

# Permitir reload de Nginx sin contraseña
echo "$USER ALL=(ALL) NOPASSWD: /bin/systemctl reload nginx" | sudo tee /etc/sudoers.d/nginx-reload
```

Ver `nginx/README.md` para la instalación completa de Nginx.
