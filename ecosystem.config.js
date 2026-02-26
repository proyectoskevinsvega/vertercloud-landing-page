module.exports = {
  apps: [
    {
      name: 'vertercloud-landing-page',
      script: 'bun',
      args: 'run preview', // Ejecuta el servidor de previsualización con Bun
      env: {
        NODE_ENV: 'production',
        VITE_PORT: 3006 // Puerto que configuramos en Nginx
      },
      autorestart: true,   // Reiniciar automáticamente si el proceso falla
      watch: false,        // No vigilar cambios de archivos en producción (evita reinicios infinitos)
      max_memory_restart: '2G' // Reiniciar si el proceso consume más de 1GB de RAM
    }
  ]
};
