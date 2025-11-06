# Scripts de Utilidad

## pre-deploy-check.js

Script de verificación pre-despliegue que valida que tu backend esté listo para desplegarse en Render.

### Uso

```bash
npm run pre-deploy
```

O directamente:

```bash
node scripts/pre-deploy-check.js
```

### Qué Verifica

El script realiza las siguientes verificaciones:

1. **package.json**
   - ✅ Existe el archivo
   - ✅ Contiene los scripts `build` y `start`

2. **tsconfig.json**
   - ✅ Existe el archivo
   - ✅ Tiene configurado el `outDir`

3. **.env.example**
   - ✅ Existe el archivo
   - ✅ Contiene todas las variables requeridas

4. **.gitignore**
   - ✅ Existe el archivo
   - ✅ Incluye `.env`, `node_modules`, y `dist`

5. **Archivos fuente**
   - ✅ Existe el directorio `src/`
   - ✅ Existe el archivo `src/index.ts`

6. **Dependencias**
   - ✅ Existe `node_modules/` (dependencias instaladas)

7. **Archivos sensibles**
   - ⚠️ Verifica que `.env` no esté en el directorio (para evitar commits accidentales)

8. **Configuración de Render**
   - ✅ Existe `render.yaml` (opcional)

9. **Compilación TypeScript**
   - ✅ El código TypeScript compila sin errores

### Salida

El script mostrará:
- ✅ Checks exitosos en verde
- ⚠️ Advertencias en amarillo
- ❌ Errores críticos en rojo

### Códigos de Salida

- `0` - Todo OK o solo advertencias
- `1` - Errores críticos encontrados

### Ejemplo de Salida Exitosa

```
🔍 Running pre-deployment checks...

📦 Checking package.json...
   ✅ All required scripts present
      - build: tsc
      - start: node dist/index.js

📝 Checking tsconfig.json...
   ✅ Output directory: dist

📄 Checking .env.example...
   ✅ .env.example exists
   ✅ All required variables documented

🔒 Checking .gitignore...
   ✅ Sensitive files are ignored

📂 Checking source files...
   ✅ Source files present

📚 Checking dependencies...
   ✅ Dependencies installed

🚫 Checking for committed .env file...
   ✅ No .env file in directory (good for deployment)

☁️  Checking Render configuration...
   ✅ render.yaml found

🔨 Testing TypeScript compilation...
   ✅ TypeScript compiles without errors

==================================================
📊 Pre-deployment Check Summary
==================================================

✅ All checks passed! Ready to deploy to Render.

Next steps:
1. Commit and push your changes to GitHub
2. Follow the RENDER_CHECKLIST.md
3. Configure environment variables in Render
4. Deploy! 🚀
```

### Cuándo Ejecutarlo

Ejecuta este script:
- ✅ Antes de hacer commit de cambios importantes
- ✅ Antes de desplegar a Render
- ✅ Después de cambios en la configuración
- ✅ Como parte de tu CI/CD pipeline

### Integración con Git Hooks (Opcional)

Puedes configurar este script para que se ejecute automáticamente antes de cada commit:

1. Instala husky:
```bash
npm install --save-dev husky
```

2. Configura el pre-commit hook:
```bash
npx husky init
echo "npm run pre-deploy" > .husky/pre-commit
```

Ahora el script se ejecutará automáticamente antes de cada commit.

