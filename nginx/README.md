# VerterCloud High-Performance Nginx Configuration

Esta configuración está diseñada para manejar miles de solicitudes por segundo, optimizada para el modelo IaaS de VerterCloud y preparada para operar detrás de un proxy de **Cloudflare**.

## Estructura de Archivos

- `nginx.conf`: Configuración global optimizada (Worker connections, buffers, compresión).
- `conf.d/verter-landing.conf`: Configuración del servidor (Real-IP de Cloudflare, Caché, Seguridad).

## Requisitos Previos

- Nginx instalado o Docker.
- Los archivos estáticos de la landing page generados en la carpeta `dist/` (`npm run build`).

---

## Opción 1: Despliegue con Docker (Recomendado)

Crea un `Dockerfile` en la raíz del proyecto para empaquetar la configuración y el contenido:

```dockerfile
# Dockerfile
FROM nginx:alpine

# Copiar configuraciones
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/conf.d/verter-landing.conf /etc/nginx/conf.d/verter-landing.conf

# Copiar contenido estático (asegúrate de haber corrido npm run build)
COPY dist /usr/share/nginx/html

# Exponer puerto
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Comandos de construcción:

1. `npm run build`
2. `docker build -t verter-landing .`
3. `docker run -d -p 80:80 --name verter-landing verter-landing`

---

## Opción 2: Integración en Servidor con Múltiples Sitios (sites-available)

Dado que tu servidor ya gestiona múltiples servicios (como `headscale`, `verter-frontend`, etc.), seguiremos tu estructura estándar:

1. **Crear Configuración del Sitio**:
   Copia el archivo de configuración a la carpeta de sitios disponibles con un nombre descriptivo:

   ```bash
   sudo cp nginx/conf.d/verter-landing.conf /etc/nginx/sites-available/verter-landing.conf
   ```

2. **Habilitar el Sitio**:
   Crea el enlace simbólico para activar la configuración:

   ```bash
   sudo ln -s /etc/nginx/sites-available/verter-landing.conf /etc/nginx/sites-enabled/
   ```

3. **Verificar y Recargar**:
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

> [!TIP]
> **Evitar Conflictos**: Asegúrate de que el `server_name` en `verter-landing.conf` sea diferente al de `verter-frontend` (por ejemplo, usando un subdominio distinto o el dominio principal de VerterCloud).

---

## Opción 3: Instalación Directa (Servidor Dedicado)

1. **Copiar archivos**:
   Copia el contenido de `nginx/` al directorio de configuración de Nginx (usualmente `/etc/nginx/`).

   ```bash
   cp nginx/nginx.conf /etc/nginx/nginx.conf
   cp nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
   ```

2. **Cargar contenido**:
   Copia los archivos generados en `dist/` a la ruta definida en `default.conf` (`/usr/share/nginx/html`).

   ```bash
   cp -r dist/* /usr/share/nginx/html/
   ```

3. **Verificar y Reiniciar**:
   ```bash
   nginx -t          # Verifica que la sintaxis sea correcta
   systemctl restart nginx
   ```

---

## Opción 4: Servidor Linux con Directorio Estándar (/var/www)

Si prefieres usar la ruta estándar de servidores Debian/Ubuntu/CentOS:

1. **Descargar Proyecto y Compilar**:

   ```bash
   # Crear directorio y entrar
   sudo mkdir -p /var/www/verter-landing
   cd /var/www/verter-landing

   # Clonar el repositorio
   sudo git clone https://github.com/proyectoskevinsvega/vertercloud-landing-page.git .

   # Instalar y compilar (Asegúrate de tener Node.js instalado)
   sudo npm install
   sudo npm run build
   ```

2. **Ajustar Permisos (Crucial)**:
   Asegúrate de que el usuario de Nginx (usualmente `www-data` o `nginx`) tenga acceso de lectura:

   ```bash
   # Cambiar propietario al usuario del servidor web
   sudo chown -R www-data:www-data /var/www/verter-landing

   # Ajustar permisos: Directorios (755) y Archivos (644)
   sudo find /var/www/verter-landing -type d -exec chmod 755 {} \;
   sudo find /var/www/verter-landing -type f -exec chmod 644 {} \;
   ```

3. **Actualizar Ruta en `conf.d/default.conf`**:
   Abre el archivo `nginx/conf.d/default.conf` y cambia la línea `root`:

   ```nginx
   # Antes
   root /usr/share/nginx/html;

   # Después (ajustado a tu nueva ruta)
   root /var/www/verter-landing/dist;
   ```

---

## Verificación de Permisos

Si ves un error **403 Forbidden**, verifica que el usuario de Nginx tenga permisos de ejecución en toda la ruta jerárquica:

```bash
sudo namei -om /var/www/verter-landing
```

---

## Características de Rendimiento

### 1. Integración con Cloudflare (Real-IP)

Nginx está configurado para leer la cabecera `CF-Connecting-IP`. Esto asegura que tus logs muestren la IP real del visitante y no las del servidor proxy de Cloudflare.

> [!IMPORTANT]
> Los rangos de IP en `conf.d/default.conf` están actualizados a Febrero 2026. Si Cloudflare actualiza sus rangos, deberás actualizarlos allí.

### 2. Caché Agresiva

Los archivos estáticos (`.js`, `.css`, imágenes) se sirven con una cabecera de caché de **1 año**. Esto reduce drásticamente las solicitudes al servidor una vez que el usuario ha cargado el sitio.

### 3. Seguridad Hardened

- **HSTS**: Obliga el uso de HTTPS.
- **Rate Limiting**: Configurado a 100 req/s con burst de 50 para evitar ataques de denegación de servicio (DoS) a nivel de servidor local.
- **Security Headers**: Protección contra XSS, sniff de tipos y frames no autorizados.

### 4. Alta Concurrencia

Configurado con `worker_connections 65535` para soportar tráfico masivo simultáneo.

---

## Monitoreo de Salud

Puedes verificar el estado del servidor accediendo a la ruta `/health`. Debería devolver un código `200` con el texto `healthy`.
