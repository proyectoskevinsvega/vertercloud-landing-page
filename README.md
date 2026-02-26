# VerterCloud - Infrastructure as a Service (IaaS) Landing Page

![VerterCloud Logo](public/vite.svg)

**Edición 2026 • Infraestructura de Próxima Generación**

Landing page corporativa para **VerterCloud**, una plataforma IaaS (Infrastructure as a Service) diseñada para sistemas distribuidos modernos, microservicios y despliegues de alta disponibilidad.

## 🚀 Características Principales

- **Diseño Premium 2026**: Interfaz minimalista con estética de obsidian y glassmorphism.
- **Portafolio de Infraestructura**: VerterVPN, VerterAuth (Zero Trust), VerterVPS, API Gateway y Load Balancer.
- **Internacionalización (i18n)**: Soporte completo nativo para Español e Inglés con selector dinámico.
- **Sección de Cumplimiento Legal**: Adaptado a la normativa colombiana (Ley 1581 de 2012, Superintendencia de Industria y Comercio).
- **Alto Rendimiento**: Optimizaciones para carga ultrarrápida y animaciones fluidas con Framer Motion.

## 🛠️ Stack Tecnológico

- **Core**: React 18 + Vite + TypeScript.
- **Estilos**: Tailwind CSS v4 (Alpha/Next generation).
- **Animaciones**: Framer Motion.
- **Iconografía**: Lucide React.
- **Internacionalización**: i18next + react-i18next.

---

## 💻 Desarrollo

### Requisitos Previos

- Node.js v18 o superior.
- npm o pnpm.

### Variables de Entorno

El proyecto utiliza variables de entorno para gestionar las URLs de los servicios. Copie el archivo de ejemplo y ajuste los valores:

```bash
cp .env.example .env
```

Variables disponibles (prefijo `VITE_` requerido):

- `VITE_SITE_URL`: URL principal del sitio (ej. `https://bravexcolombia.com`).
- `VITE_VPN_PATH`: Ruta interna para el servicio VerterVPN (ej. `/vpn`).
- `VITE_AUTH_PATH`: Ruta interna para el servicio VerterAuth (ej. `/auth`).
- `VITE_VPS_PATH`: Ruta interna para el servicio VerterVPS (ej. `/vps`).
- `VITE_GATEWAY_PATH`: Ruta interna para el API Gateway (ej. `/api-gateway`).
- `VITE_BALANCER_PATH`: Ruta interna para el Load Balancer (ej. `/load-balancing`).

---

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/proyectoskevinsvega/vertercloud-landing-page.git

# Instalar dependencias
npm install
```

### Ejecutar en Desarrollo

```bash
npm run dev
```

### Compilar para Producción

```bash
npm run build
```

---

## 📂 Estructura del Proyecto

- `/src/components`: Componentes reutilizables (Navbar, Footer, ServiceCards).
- `/src/pages`: Páginas legales (Términos de Servicio, Política de Privacidad) y Centro de Soporte.
- `/src/i18n.ts`: Configuración global de traducciones.
- `/nginx`: Configuraciones de alta disponibilidad e integración con Cloudflare.

## 🛡️ Cumplimiento Legal

El proyecto incluye páginas dedicadas y validadas profesionalmente para la jurisdicción de Colombia:

- **Responsable del Tratamiento**: Información del operador (VEGA MARMOLEJO KEVINS YESID) con NIT y domicilio en Girardota, Antioquia.
- **Privacidad**: Derechos ARCO, política de menores y oficial de protección de datos (DPO).
- **Certificaciones**: Basado en el Registro Único Tributario (RUT) ante la DIAN.

## 🌐 Despliegue

Para un despliegue optimizado, consulte la carpeta `/nginx` donde encontrará:

- `nginx.conf`: Configuración global para miles de RPS.
- `verter-landing.conf`: Integración con Real-IP de Cloudflare y cabeceras de seguridad.

---

## 🚀 Despliegue con PM2

Para mantener la aplicación ejecutándose en segundo plano de forma persistente:

1. **Instalar PM2** (si no lo tienes):

   ```bash
   sudo npm install -g pm2
   ```

2. **Compilar el proyecto**:

   ```bash
   npm run build
   ```

3. **Iniciar con el archivo de configuración**:

   ```bash
   pm2 start ecosystem.config.js
   ```

4. **Comandos Útiles**:

   ```bash
   # Ver estado de los procesos
   pm2 status

   # Ver logs en tiempo real
   pm2 logs vertercloud-landing-page

   # Reiniciar la aplicación
   pm2 restart vertercloud-landing-page

   # Configurar inicio automático tras reiniciar el servidor
   pm2 startup
   pm2 save
   ```

---

© 2026 [VerterCloud](https://github.com/proyectoskevinsvega). Todos los derechos reservados.
