# 🚀 Guía Rápida de Despliegue en Render

## ⏱️ Tiempo estimado: 15-20 minutos

Esta es la guía más rápida para desplegar tu backend en Render. Si necesitas más detalles, consulta `DEPLOYMENT.md`.

---

## Paso 1: Preparar Base de Datos (5 min)

### Opción Recomendada: Railway

1. Ve a [railway.app](https://railway.app)
2. Crea una cuenta / Inicia sesión
3. Click en "New Project" → "Provision MySQL"
4. Click en el servicio MySQL → "Connect" → Copia las credenciales:
   - `MYSQL_HOST`
   - `MYSQL_PORT`
   - `MYSQL_USER`
   - `MYSQL_PASSWORD`
   - `MYSQL_DATABASE`

**Guarda estas credenciales** - las necesitarás en el Paso 3.

---

## Paso 2: Verificar que Todo Esté Listo (2 min)

Ejecuta el script de verificación:

```bash
cd backend
npm run pre-deploy
```

Si ves ✅ en todos los checks, continúa. Si hay errores ❌, corrígelos primero.

---

## Paso 3: Crear Servicio en Render (8 min)

### 3.1 Crear el Web Service

1. Ve a [dashboard.render.com](https://dashboard.render.com)
2. Click en **"New +"** → **"Web Service"**
3. Conecta tu cuenta de GitHub
4. Selecciona el repositorio `ai-money-app`
5. Click en **"Connect"**

### 3.2 Configurar el Servicio

Completa el formulario:

| Campo | Valor |
|-------|-------|
| **Name** | `ai-money-backend` |
| **Region** | Oregon (o la más cercana) |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Instance Type** | Free |

### 3.3 Configurar Variables de Entorno

En la sección **"Environment Variables"**, agrega:

#### Variables Requeridas

```
NODE_ENV=production
PORT=10000
DB_HOST=[tu-mysql-host-de-railway]
DB_PORT=3306
DB_USER=[tu-mysql-user-de-railway]
DB_PASSWORD=[tu-mysql-password-de-railway]
DB_NAME=[tu-mysql-database-de-railway]
JWT_SECRET=[genera-uno-nuevo]
JWT_EXPIRATION=24h
```

#### Generar JWT_SECRET

Abre una terminal y ejecuta:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copia el resultado y úsalo como `JWT_SECRET`.

#### Variables Opcionales (puedes agregarlas después)

```
EMAIL_USER=tu-email@gmail.com
EMAIL_PASSWORD=tu-app-password
FRONTEND_URL=http://localhost:3000
```

### 3.4 Desplegar

1. Click en **"Create Web Service"**
2. Espera 5-10 minutos mientras Render construye y despliega
3. Observa los logs en tiempo real

---

## Paso 4: Verificar el Despliegue (2 min)

### 4.1 Health Check

Una vez que el despliegue termine, verás una URL como:
```
https://ai-money-backend.onrender.com
```

Visita:
```
https://ai-money-backend.onrender.com/api/health
```

Deberías ver:
```json
{
  "status": "ok",
  "timestamp": "2025-11-06T...",
  "environment": "production"
}
```

### 4.2 Verificar Logs

En Render, ve a la pestaña **"Logs"** y busca:

```
✅ Environment variables validated successfully
✅ Database connection established successfully
✅ Database models synchronized
🚀 Server running on port: 10000
```

### 4.3 Probar un Endpoint

```bash
curl https://ai-money-backend.onrender.com/api/currencies
```

---

## Paso 5: Configurar Frontend (3 min)

1. Copia la URL de tu backend: `https://ai-money-backend.onrender.com`

2. En tu frontend, actualiza la variable de entorno:
   ```
   NEXT_PUBLIC_API_URL=https://ai-money-backend.onrender.com/api
   ```

3. Cuando despliegues el frontend, actualiza en Render:
   ```
   FRONTEND_URL=https://tu-frontend.vercel.app
   ```

---

## ✅ ¡Listo!

Tu backend está desplegado y funcionando. 🎉

### URLs Importantes

- **Backend**: https://ai-money-backend.onrender.com
- **Health Check**: https://ai-money-backend.onrender.com/api/health
- **Dashboard**: https://dashboard.render.com

---

## 🔧 Solución Rápida de Problemas

### ❌ "Missing required environment variables"
→ Verifica que todas las variables estén configuradas en Render
→ Re-despliega después de agregar variables

### ❌ "Database connection failed"
→ Verifica las credenciales de Railway
→ Asegúrate de que el host sea accesible desde internet

### ❌ Error de CORS
→ Configura `FRONTEND_URL` con la URL de tu frontend
→ Asegúrate de usar `https://` (no `http://`)

### ⏰ El servicio tarda mucho en responder
→ Normal en el plan Free - se duerme después de 15 min
→ Primera petición tarda ~30-60 segundos en despertar

---

## 📚 Recursos Adicionales

- **Checklist Completo**: `RENDER_CHECKLIST.md`
- **Guía Detallada**: `DEPLOYMENT.md`
- **Resumen de Cambios**: `DEPLOYMENT_SUMMARY.md`
- **Script de Verificación**: `scripts/README.md`

---

## 🔄 Actualizaciones Futuras

Cada vez que hagas push a `main`, Render automáticamente:
1. Detecta los cambios
2. Construye el proyecto
3. Despliega la nueva versión

Verifica los logs después de cada despliegue.

---

## 💡 Consejos

1. **Plan Free**: El servicio se duerme después de 15 min de inactividad
2. **Logs**: Revísalos regularmente para detectar problemas
3. **Variables**: Nunca las commits en Git - usa solo el dashboard de Render
4. **Testing**: Prueba localmente antes de desplegar
5. **Monitoreo**: Configura alertas en Render para estar informado

---

**¿Necesitas ayuda?** Consulta la sección de solución de problemas en `DEPLOYMENT.md`

