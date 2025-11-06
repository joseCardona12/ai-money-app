# 🚀 Backend - Configuración Completa para Render

## 📁 Archivos de Configuración

Tu backend ahora está completamente configurado para desplegarse en Render. Aquí está todo lo que se ha preparado:

### ✅ Archivos Creados

| Archivo | Propósito |
|---------|-----------|
| `render.yaml` | Configuración de infraestructura como código |
| `.dockerignore` | Archivos a excluir del build |
| `QUICK_START.md` | Guía rápida de 15 minutos |
| `DEPLOYMENT.md` | Guía completa y detallada |
| `RENDER_CHECKLIST.md` | Checklist paso a paso |
| `DEPLOYMENT_SUMMARY.md` | Resumen de cambios |
| `scripts/pre-deploy-check.js` | Script de verificación |
| `scripts/README.md` | Documentación de scripts |
| `src/util/validateEnv.ts` | Validador de variables de entorno |

### ✅ Archivos Actualizados

| Archivo | Cambios |
|---------|---------|
| `src/index.ts` | CORS mejorado + Health check endpoint |
| `src/util/utilApplication.ts` | Validación de env + Mejor logging |
| `.env.example` | Variables actualizadas y documentadas |
| `.gitignore` | Protección mejorada de archivos sensibles |
| `package.json` | Script `pre-deploy` agregado |

---

## 🎯 ¿Por Dónde Empezar?

### Para Despliegue Rápido (15-20 min)
👉 **Lee: `QUICK_START.md`**

### Para Entender Todo en Detalle
👉 **Lee: `DEPLOYMENT.md`**

### Para Seguir un Checklist
👉 **Lee: `RENDER_CHECKLIST.md`**

---

## 🔍 Verificación Pre-Despliegue

Antes de desplegar, ejecuta:

```bash
npm run pre-deploy
```

Este script verifica:
- ✅ Configuración de package.json
- ✅ Archivos TypeScript
- ✅ Variables de entorno documentadas
- ✅ Archivos sensibles protegidos
- ✅ Compilación exitosa

---

## 🌟 Características Nuevas

### 1. Health Check Endpoint

```bash
GET /api/health
```

Respuesta:
```json
{
  "status": "ok",
  "timestamp": "2025-11-06T12:00:00.000Z",
  "environment": "production"
}
```

### 2. CORS Dinámico

Ahora acepta peticiones de:
- Localhost (desarrollo)
- URL configurada en `FRONTEND_URL` (producción)

### 3. Validación de Variables de Entorno

El servidor valida automáticamente que todas las variables requeridas estén configuradas antes de iniciar.

### 4. Mejor Logging

```
✅ Environment variables validated successfully
✅ Database connection established successfully
✅ Database models synchronized
🚀 Server running on port: 3001
📍 Environment: development
🔗 Health check: http://localhost:3001/api/health
```

---

## 📋 Variables de Entorno Requeridas

Para Render, necesitas configurar:

```env
# Servidor
NODE_ENV=production
PORT=10000

# Base de Datos
DB_HOST=tu-mysql-host
DB_PORT=3306
DB_USER=tu-usuario
DB_PASSWORD=tu-contraseña
DB_NAME=ai_money_db

# JWT
JWT_SECRET=genera-una-clave-segura
JWT_EXPIRATION=24h

# Email (Opcional)
EMAIL_USER=tu-email@gmail.com
EMAIL_PASSWORD=tu-app-password

# Frontend (Opcional por ahora)
FRONTEND_URL=http://localhost:3000
```

---

## 🗂️ Estructura del Proyecto

```
backend/
├── 📄 Documentación de Despliegue
│   ├── QUICK_START.md           ⭐ Empieza aquí
│   ├── DEPLOYMENT.md            📚 Guía completa
│   ├── RENDER_CHECKLIST.md      ✅ Checklist
│   ├── DEPLOYMENT_SUMMARY.md    📊 Resumen
│   └── README_DEPLOYMENT.md     📖 Este archivo
│
├── ⚙️ Configuración
│   ├── render.yaml              ☁️ Config de Render
│   ├── .dockerignore            🐳 Exclusiones de build
│   ├── .gitignore               🔒 Archivos ignorados
│   ├── .env.example             📝 Plantilla de variables
│   ├── package.json             📦 Dependencias
│   └── tsconfig.json            🔧 Config de TypeScript
│
├── 🛠️ Scripts
│   └── scripts/
│       ├── pre-deploy-check.js  ✅ Verificación
│       └── README.md            📖 Docs de scripts
│
└── 💻 Código Fuente
    └── src/
        ├── index.ts             🚀 Punto de entrada
        └── util/
            ├── utilApplication.ts
            └── validateEnv.ts   ✅ Validación
```

---

## 🚀 Comandos Disponibles

```bash
# Desarrollo
npm run dev              # Servidor con hot-reload

# Producción
npm run build            # Compilar TypeScript
npm start                # Iniciar servidor

# Verificación
npm run pre-deploy       # Verificar antes de desplegar
```

---

## 🎯 Flujo de Despliegue

```
1. Verificar localmente
   └─> npm run pre-deploy

2. Preparar Base de Datos
   └─> Railway / PlanetScale / Aiven

3. Configurar Render
   ├─> Crear Web Service
   ├─> Configurar variables de entorno
   └─> Desplegar

4. Verificar Despliegue
   ├─> Health check: /api/health
   ├─> Revisar logs
   └─> Probar endpoints

5. Configurar Frontend
   └─> Actualizar NEXT_PUBLIC_API_URL
```

---

## 🔧 Configuración de Render

### Configuración Básica

| Campo | Valor |
|-------|-------|
| Name | `ai-money-backend` |
| Region | Oregon (o cercana) |
| Branch | `main` |
| Root Directory | `backend` |
| Runtime | `Node` |
| Build Command | `npm install && npm run build` |
| Start Command | `npm start` |
| Instance Type | Free |

### Health Check

Render usará automáticamente: `/api/health`

---

## 📊 Plan Free de Render

**Características:**
- ✅ 750 horas/mes gratis
- ✅ 512 MB RAM
- ✅ Despliegues automáticos desde Git
- ⚠️ Se duerme después de 15 min de inactividad
- ⚠️ Primera petición tarda ~30-60 seg en despertar

**Upgrade a Starter ($7/mes):**
- ✅ Siempre activo (no se duerme)
- ✅ Mejor rendimiento
- ✅ Más recursos

---

## 🔒 Seguridad

### ✅ Implementado

- Variables de entorno para datos sensibles
- `.gitignore` protege archivos sensibles
- Validación de variables requeridas
- CORS configurado correctamente
- JWT para autenticación

### 📝 Recomendaciones

1. **JWT_SECRET**: Genera uno único para producción
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

2. **Contraseñas**: Usa contraseñas fuertes y únicas

3. **Email**: Usa contraseñas de aplicación de Gmail

4. **SSL/TLS**: Habilita en la conexión a la BD si está disponible

5. **Monitoreo**: Configura alertas en Render

---

## 🐛 Solución de Problemas

### Error: "Missing required environment variables"
✅ Verifica que todas las variables estén en Render
✅ Re-despliega después de agregar variables

### Error: "Database connection failed"
✅ Verifica credenciales de la BD
✅ Asegúrate de que el host sea accesible
✅ Verifica el puerto (usualmente 3306)

### Error de CORS
✅ Configura `FRONTEND_URL` correctamente
✅ Usa `https://` en producción

### Servicio lento
✅ Normal en plan Free (se duerme)
✅ Considera upgrade a Starter

---

## 📞 Recursos y Ayuda

### Documentación
- [Render Docs](https://render.com/docs)
- [Node.js en Render](https://render.com/docs/deploy-node-express-app)

### Archivos de Ayuda
- `QUICK_START.md` - Guía rápida
- `DEPLOYMENT.md` - Guía completa
- `RENDER_CHECKLIST.md` - Checklist
- `scripts/README.md` - Scripts

### Logs y Monitoreo
- Dashboard: https://dashboard.render.com
- Logs en tiempo real en la pestaña "Logs"
- Métricas de CPU y memoria disponibles

---

## ✅ Checklist Final

Antes de desplegar, asegúrate de:

- [ ] Ejecutar `npm run pre-deploy` sin errores
- [ ] Tener una base de datos MySQL lista
- [ ] Tener las credenciales de la BD
- [ ] Haber generado un `JWT_SECRET` seguro
- [ ] Haber leído `QUICK_START.md` o `DEPLOYMENT.md`
- [ ] Tener tu código en GitHub
- [ ] Tener una cuenta en Render

---

## 🎉 ¡Todo Listo!

Tu backend está completamente configurado y listo para desplegarse en Render.

**Siguiente paso:** Abre `QUICK_START.md` y comienza el despliegue.

**Tiempo estimado:** 15-20 minutos

¡Buena suerte! 🚀

---

**Última actualización:** 2025-11-06

