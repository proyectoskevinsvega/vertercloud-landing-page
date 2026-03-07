# VerterCloud — Landing Page 🚀

Landing page corporativa para **VerterCloud**, plataforma IaaS de infraestructura de próxima generación.

---

## 🛠️ Stack Tecnológico

|                 |                          |
| --------------- | ------------------------ |
| **Framework**   | React 19 + Vite 7        |
| **Lenguaje**    | TypeScript (Strict Mode) |
| **Estilos**     | Tailwind CSS 4           |
| **Animaciones** | Framer Motion            |
| **Iconografía** | Lucide React             |
| **Ruteo**       | React Router Dom v7      |
| **i18n**        | i18next + react-i18next  |

---

## ✨ Características

- **Diseño Premium 2026**: Estética de obsidian con glassmorphism y animaciones fluidas.
- **Portafolio IaaS**: VerterVPN, VerterAuth, VerterVPS, API Gateway y Load Balancer.
- **i18n nativo**: Español e Inglés con cambio dinámico.
- **Cumplimiento legal**: Adaptado a normativa colombiana (Ley 1581 de 2012).

---

## 💻 Desarrollo local

```bash
# Instalar dependencias
bun install

# Iniciar servidor de desarrollo
bun run dev
```

### Variables de entorno

```bash
cp .env.example .env
```

| Variable             | Descripción                  |
| -------------------- | ---------------------------- |
| `VITE_SITE_URL`      | URL principal del sitio      |
| `VITE_API_BASE_URL`  | Base URL del API (proxied)   |
| `VITE_VPN_PATH`      | Ruta del servicio VerterVPN  |
| `VITE_AUTH_PATH`     | Ruta del servicio VerterAuth |
| `VITE_VPS_PATH`      | Ruta del servicio VerterVPS  |
| `VITE_GATEWAY_PATH`  | Ruta del API Gateway         |
| `VITE_BALANCER_PATH` | Ruta del Load Balancer       |
| `VITE_TENANT_SLUG`   | Alias de empresa (SaaS B2B)  |

En producción, las variables se leen de `.env.production` (commiteado en el repo, sin secretos).

---

## 🚀 Deploy (automático)

El deploy a producción es **completamente automático**. Solo haz:

```bash
git push origin main
```

GitHub Actions se encarga del resto:

```
git push
  → Build en GitHub runner (gratis)
  → gzip -9 de todos los assets
  → scp dist/ → VPS /releases/SHA_COMMIT
  → ln -sfn releases/SHA current   ← switch atómico
  → nginx reload + health check
  → rollback automático si HTTP ≠ 200
```

Cada deploy crea un release en `/var/www/vertercloud/landing-page/releases/SHA_COMMIT/`.
Nginx sirve desde el symlink `/var/www/vertercloud/landing-page/current` — **cero downtime**.

Para más detalles:

- 📄 [`doc/README_DEPLOY.md`](doc/README_DEPLOY.md) — flujo completo, rollback y logs
- 📄 [`nginx/README.md`](nginx/README.md) — configuración Nginx del VPS

### Setup inicial (solo la primera vez)

**1. Generar clave SSH para GitHub Actions (en tu máquina local):**

```bash
ssh-keygen -t ed25519 -C "github-actions-vertercloud-landing" -f ~/.ssh/github_actions_vertercloud
```

**2. Copiar la clave pública al VPS:**

```bash
# Opción A — automático
ssh-copy-id -i ~/.ssh/github_actions_vertercloud.pub USUARIO@IP_DEL_VPS

# Opción B — manual (Windows)
cat ~/.ssh/github_actions_vertercloud.pub
# Luego en el VPS:
echo "PEGA_AQUI_LA_CLAVE_PUB" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

**3. En el VPS:**

```bash
# Crear estructura de directorios
sudo mkdir -p /var/www/vertercloud/landing-page/{releases,errors}
sudo chown -R $USER:$USER /var/www/vertercloud

# Permitir recargar Nginx sin contraseña
echo "$USER ALL=(ALL) NOPASSWD: /bin/systemctl reload nginx" | sudo tee /etc/sudoers.d/nginx-reload
```

**4. Agregar los 3 secrets en GitHub → Settings → Secrets and variables → Actions:**

| Secret        | Valor                                                            |
| ------------- | ---------------------------------------------------------------- |
| `VPS_HOST`    | IP del VPS                                                       |
| `VPS_USER`    | Usuario SSH                                                      |
| `VPS_SSH_KEY` | Contenido de `~/.ssh/github_actions_vertercloud` (clave privada) |

---

## ⚡ Code Splitting

El bundle está dividido en chunks independientes para caché óptimo del browser:

| Chunk           | Contenido                      | Tamaño gzip |
| --------------- | ------------------------------ | ----------- |
| `vendor-motion` | framer-motion                  | ~40 KB      |
| `vendor-i18n`   | i18next + react-i18next        | ~18 KB      |
| `vendor-ui`     | clsx + sonner + tailwind-merge | ~5 KB       |
| `vendor-router` | react-router-dom               | ~14 KB      |
| `vendor-icons`  | lucide-react                   | ~4 KB       |
| `index`         | Tu código de app               | ~79 KB      |

Después de un deploy, el browser solo descarga el chunk `index` si cambias código de la app — los chunks de vendor se sirven desde caché (1 año).

---

## 🔄 Rollback instantáneo

```bash
# Ver releases disponibles (SHA de cada commit)
ls -dt /var/www/vertercloud/landing-page/releases/*

# Apuntar al release anterior
ln -sfn /var/www/vertercloud/landing-page/releases/[SHA_COMMIT] \
        /var/www/vertercloud/landing-page/current
sudo systemctl reload nginx
```

---

## 🛡️ Seguridad

- **Cloudflare** delante del VPS — CDN + DDoS mitigation automático
- **SSL**: Cloudflare Origin Certificate (TLS entre Cloudflare y VPS)
- **Nginx**: CSP, HSTS 2 años, rate limiting, bloqueo de archivos sensibles
- **Kernel**: TCP BBR, syncookies, IP spoofing protection (`nginx/etc/sysctl.conf`)
- **UFW**: Solo puertos 80, 443 y 22

---

_Desarrollado con ❤️ para el ecosistema VerterCloud_
