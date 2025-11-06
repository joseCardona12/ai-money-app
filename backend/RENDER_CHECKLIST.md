# ✅ Checklist de Despliegue en Render

## Antes de Desplegar

- [ ] Tienes una cuenta en [Render](https://render.com)
- [ ] Tu código está en un repositorio de GitHub
- [ ] Tienes una base de datos MySQL lista (Railway, PlanetScale, Aiven, etc.)
- [ ] Has probado el backend localmente y funciona correctamente

## Configuración de la Base de Datos

- [ ] Base de datos MySQL creada
- [ ] Tienes las credenciales de conexión:
  - [ ] Host (DB_HOST)
  - [ ] Puerto (DB_PORT) - usualmente 3306
  - [ ] Usuario (DB_USER)
  - [ ] Contraseña (DB_PASSWORD)
  - [ ] Nombre de la base de datos (DB_NAME)

## Crear el Web Service en Render

1. **Configuración Básica**
   - [ ] Ir a [dashboard.render.com](https://dashboard.render.com)
   - [ ] Click en "New +" → "Web Service"
   - [ ] Conectar repositorio de GitHub
   - [ ] Seleccionar el repositorio `ai-money-app`

2. **Configuración del Servicio**
   - [ ] **Name**: `ai-money-backend` (o tu nombre preferido)
   - [ ] **Region**: Seleccionar región cercana
   - [ ] **Branch**: `main`
   - [ ] **Root Directory**: `backend`
   - [ ] **Runtime**: `Node`
   - [ ] **Build Command**: `npm install && npm run build`
   - [ ] **Start Command**: `npm start`
   - [ ] **Plan**: Free (o el que prefieras)

## Variables de Entorno en Render

Agregar las siguientes variables en la sección "Environment Variables":

### Requeridas ✅

- [ ] `NODE_ENV` = `production`
- [ ] `PORT` = `10000`
- [ ] `DB_HOST` = `[tu-host-mysql]`
- [ ] `DB_PORT` = `3306`
- [ ] `DB_USER` = `[tu-usuario]`
- [ ] `DB_PASSWORD` = `[tu-contraseña]`
- [ ] `DB_NAME` = `ai_money_db`
- [ ] `JWT_SECRET` = `[genera-una-clave-segura]`
- [ ] `JWT_EXPIRATION` = `24h`

### Recomendadas ⚠️

- [ ] `EMAIL_USER` = `[tu-email@gmail.com]`
- [ ] `EMAIL_PASSWORD` = `[contraseña-de-aplicación]`
- [ ] `FRONTEND_URL` = `http://localhost:3000` (actualizar después)

## Generar Valores Seguros

### JWT_SECRET
Ejecuta en tu terminal local:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
- [ ] Copia el resultado y úsalo como `JWT_SECRET`

### EMAIL_PASSWORD (Gmail)
1. [ ] Ve a tu cuenta de Google
2. [ ] Seguridad → Verificación en dos pasos (activar si no está)
3. [ ] Contraseñas de aplicaciones → Generar nueva
4. [ ] Selecciona "Correo" y "Otro dispositivo"
5. [ ] Copia la contraseña de 16 caracteres

## Desplegar

- [ ] Click en "Create Web Service"
- [ ] Esperar a que el build termine (5-10 minutos)
- [ ] Verificar que no haya errores en los logs

## Verificación Post-Despliegue

### 1. Health Check
- [ ] Visitar: `https://[tu-app].onrender.com/api/health`
- [ ] Verificar respuesta JSON:
  ```json
  {
    "status": "ok",
    "timestamp": "...",
    "environment": "production"
  }
  ```

### 2. Logs
- [ ] Ir a la pestaña "Logs" en Render
- [ ] Verificar mensajes:
  - [ ] "✅ Environment variables validated successfully"
  - [ ] "✅ Database connection established successfully"
  - [ ] "✅ Database models synchronized"
  - [ ] "🚀 Server running on port: 10000"

### 3. Probar Endpoints
- [ ] Probar un endpoint público:
  ```bash
  curl https://[tu-app].onrender.com/api/currencies
  ```

## Configuración del Frontend

- [ ] Copiar la URL del backend: `https://[tu-app].onrender.com`
- [ ] Actualizar `FRONTEND_URL` en Render cuando despliegues el frontend
- [ ] En el frontend, configurar `NEXT_PUBLIC_API_URL` con la URL del backend

## Solución de Problemas Comunes

### ❌ Error: "Missing required environment variables"
- [ ] Verificar que todas las variables requeridas estén configuradas
- [ ] Verificar que no haya espacios extra en los valores
- [ ] Re-desplegar después de agregar variables

### ❌ Error: "Database connection failed"
- [ ] Verificar credenciales de la base de datos
- [ ] Verificar que el host sea accesible desde internet
- [ ] Verificar que el puerto sea correcto
- [ ] Verificar que el usuario tenga permisos

### ❌ Error de CORS
- [ ] Verificar que `FRONTEND_URL` esté configurado
- [ ] Verificar que el frontend use la URL correcta del backend
- [ ] Verificar que no haya `http://` vs `https://` mixtos

### ⏰ El servicio se duerme (Plan Free)
- [ ] Esto es normal en el plan gratuito
- [ ] Primera petición después de dormir tarda ~30-60 segundos
- [ ] Considerar upgrade a plan Starter ($7/mes) para servicio siempre activo

## Monitoreo Continuo

- [ ] Configurar alertas de email en Render
- [ ] Revisar logs regularmente
- [ ] Monitorear métricas de CPU y memoria
- [ ] Configurar un servicio de uptime monitoring (opcional)

## Actualizaciones Futuras

- [ ] Los cambios en la rama `main` se despliegan automáticamente
- [ ] Verificar logs después de cada despliegue
- [ ] Probar endpoints críticos después de actualizar

## URLs Importantes

- **Dashboard de Render**: https://dashboard.render.com
- **Tu Backend**: https://[tu-app].onrender.com
- **Health Check**: https://[tu-app].onrender.com/api/health
- **Logs**: https://dashboard.render.com/web/[tu-servicio]/logs

## Recursos

- [Documentación de Render](https://render.com/docs)
- [Guía completa de despliegue](./DEPLOYMENT.md)
- [Variables de entorno de ejemplo](./.env.example)

---

**Nota**: Reemplaza `[tu-app]`, `[tu-usuario]`, `[tu-contraseña]`, etc. con tus valores reales.

