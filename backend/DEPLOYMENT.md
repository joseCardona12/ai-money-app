# Guía de Despliegue en Render

Esta guía te ayudará a desplegar el backend de AI Money App en Render.

## Prerrequisitos

1. Una cuenta en [Render](https://render.com)
2. Una base de datos MySQL (puedes usar Railway, PlanetScale, o cualquier proveedor de MySQL)
3. Tu repositorio de GitHub con el código del backend

## Paso 1: Preparar la Base de Datos

Antes de desplegar, necesitas tener una base de datos MySQL lista. Opciones recomendadas:

### Opción A: Railway (Recomendado)
1. Ve a [Railway.app](https://railway.app)
2. Crea un nuevo proyecto
3. Agrega un servicio MySQL
4. Copia las credenciales de conexión (host, puerto, usuario, contraseña, nombre de BD)

### Opción B: PlanetScale
1. Ve a [PlanetScale](https://planetscale.com)
2. Crea una nueva base de datos
3. Obtén las credenciales de conexión

### Opción C: Aiven
1. Ve a [Aiven](https://aiven.io)
2. Crea un servicio MySQL
3. Obtén las credenciales de conexión

## Paso 2: Desplegar en Render

### Método 1: Usando el Dashboard de Render (Recomendado)

1. **Inicia sesión en Render**
   - Ve a [dashboard.render.com](https://dashboard.render.com)

2. **Crear un nuevo Web Service**
   - Click en "New +" → "Web Service"
   - Conecta tu repositorio de GitHub
   - Selecciona el repositorio `ai-money-app`

3. **Configurar el servicio**
   - **Name**: `ai-money-backend` (o el nombre que prefieras)
   - **Region**: Elige la región más cercana a tus usuarios
   - **Branch**: `main` (o la rama que uses)
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free (o el plan que prefieras)

4. **Configurar Variables de Entorno**
   
   En la sección "Environment Variables", agrega las siguientes variables:

   ```
   NODE_ENV=production
   PORT=10000
   
   # Database Configuration (usa tus credenciales reales)
   DB_HOST=tu-host-mysql.railway.app
   DB_PORT=3306
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=ai_money_db
   
   # JWT Configuration
   JWT_SECRET=genera_una_clave_secreta_muy_segura_aqui
   JWT_EXPIRATION=24h
   
   # Email Configuration (Gmail)
   EMAIL_USER=tu-email@gmail.com
   EMAIL_PASSWORD=tu_app_password_de_gmail
   
   # Frontend URL (actualiza cuando despliegues el frontend)
   FRONTEND_URL=http://localhost:3000
   ```

   **Importante**: 
   - Para `JWT_SECRET`, genera una clave segura. Puedes usar: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
   - Para `EMAIL_PASSWORD`, usa una contraseña de aplicación de Gmail (no tu contraseña normal)

5. **Desplegar**
   - Click en "Create Web Service"
   - Render comenzará a construir y desplegar tu aplicación
   - Espera a que el despliegue termine (puede tomar 5-10 minutos)

### Método 2: Usando render.yaml (Infraestructura como Código)

Si prefieres usar el archivo `render.yaml` incluido:

1. Ve a Render Dashboard
2. Click en "New +" → "Blueprint"
3. Conecta tu repositorio
4. Render detectará automáticamente el archivo `render.yaml`
5. Configura las variables de entorno manualmente en el dashboard

## Paso 3: Verificar el Despliegue

1. **Verificar el Health Check**
   - Una vez desplegado, visita: `https://tu-app.onrender.com/api/health`
   - Deberías ver una respuesta JSON como:
   ```json
   {
     "status": "ok",
     "timestamp": "2025-11-06T...",
     "environment": "production"
   }
   ```

2. **Verificar los Logs**
   - En el dashboard de Render, ve a la pestaña "Logs"
   - Deberías ver mensajes como:
     - "Trying with the database"
     - "Synchronizing with the database"
     - "Server running on the port: 10000"

3. **Probar un Endpoint**
   - Prueba un endpoint público, por ejemplo:
   ```bash
   curl https://tu-app.onrender.com/api/currencies
   ```

## Paso 4: Configurar el Frontend

Una vez que el backend esté desplegado:

1. Copia la URL de tu backend (ej: `https://ai-money-backend.onrender.com`)
2. Actualiza la variable de entorno `FRONTEND_URL` en Render con la URL de tu frontend cuando lo despliegues
3. En tu frontend, actualiza `NEXT_PUBLIC_API_URL` para apuntar a tu backend en producción

## Solución de Problemas

### El servicio no inicia
- Verifica los logs en Render
- Asegúrate de que todas las variables de entorno estén configuradas correctamente
- Verifica que las credenciales de la base de datos sean correctas

### Error de conexión a la base de datos
- Verifica que el host de la BD sea accesible desde Render
- Asegúrate de que el puerto sea el correcto (usualmente 3306 para MySQL)
- Verifica que el usuario tenga permisos suficientes
- Algunas bases de datos requieren conexiones SSL - verifica la configuración

### Error de CORS
- Asegúrate de que `FRONTEND_URL` esté configurado correctamente
- Verifica que el frontend esté usando la URL correcta del backend

### El servicio se duerme (Free Plan)
- En el plan gratuito de Render, el servicio se duerme después de 15 minutos de inactividad
- La primera petición después de dormir puede tardar 30-60 segundos
- Considera usar un servicio de "ping" o actualizar a un plan de pago

## Actualizaciones Automáticas

Render automáticamente desplegará tu aplicación cuando:
- Hagas push a la rama configurada (ej: `main`)
- Los cambios se detecten en el directorio `backend/`

## Monitoreo

Render proporciona:
- **Logs en tiempo real**: Ve a la pestaña "Logs"
- **Métricas**: CPU, memoria, ancho de banda
- **Alertas**: Configura notificaciones por email

## Costos

- **Plan Free**: 
  - 750 horas/mes gratis
  - El servicio se duerme después de 15 min de inactividad
  - 512 MB RAM
  - Compartido CPU

- **Plan Starter ($7/mes)**:
  - Siempre activo
  - 512 MB RAM
  - Compartido CPU

## Recursos Adicionales

- [Documentación de Render](https://render.com/docs)
- [Render Node.js Guide](https://render.com/docs/deploy-node-express-app)
- [Render Environment Variables](https://render.com/docs/environment-variables)

## Notas de Seguridad

1. **Nunca** commits archivos `.env` al repositorio
2. Usa variables de entorno en Render para información sensible
3. Genera un `JWT_SECRET` fuerte y único para producción
4. Usa contraseñas de aplicación para Gmail, no tu contraseña personal
5. Considera usar un servicio de email transaccional (SendGrid, Mailgun) en lugar de Gmail para producción

