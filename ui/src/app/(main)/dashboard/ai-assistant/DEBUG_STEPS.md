# Pasos de Debug - AI Agent

## 🔧 Cómo Debuggear el Error "Account not found"

### Paso 1: Verificar Autenticación

Abre la consola del navegador (F12) y ejecuta:

```javascript
// Verificar que el token existe
const token = localStorage.getItem("token");
console.log("Token exists:", !!token);
console.log("Token:", token);

// Decodificar el token (sin verificar firma)
if (token) {
  const payload = JSON.parse(atob(token.split('.')[1]));
  console.log("Token payload:", payload);
  console.log("User ID:", payload.id);
  console.log("Token expires:", new Date(payload.exp * 1000));
}
```

**Resultado esperado:**
```
Token exists: true
Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Token payload: { id: 1, email: "user@example.com", ... }
User ID: 1
Token expires: Wed Oct 30 2025 ...
```

---

### Paso 2: Verificar Endpoint de Accounts

En la consola del navegador:

```javascript
// Hacer petición manual al endpoint de accounts
fetch("http://localhost:3001/api/accounts", {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json"
  }
})
.then(response => {
  console.log("Status:", response.status);
  return response.json();
})
.then(data => {
  console.log("Response:", data);
  console.log("Accounts:", data.data);
})
.catch(error => {
  console.error("Error:", error);
});
```

**Resultado esperado:**
```json
{
  "status": 200,
  "message": "Accounts retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Main Account",
      "balance": 1000,
      "user_id": 1,
      ...
    }
  ]
}
```

**Si obtienes error 404 o "Account not found":**
- El usuario no tiene cuentas creadas
- Necesitas crear una cuenta primero

---

### Paso 3: Crear una Cuenta (si no existe)

En la consola del navegador:

```javascript
// Crear una cuenta de prueba
fetch("http://localhost:3001/api/accounts", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "Test Account",
    account_type_id: 1,
    balance: 1000,
    currency_id: 1
  })
})
.then(response => response.json())
.then(data => {
  console.log("Account created:", data);
})
.catch(error => {
  console.error("Error:", error);
});
```

---

### Paso 4: Verificar el TransactionAgent

Agrega logs temporales en `transactionAgent.ts`:

```typescript
public async initialize(): Promise<void> {
  try {
    console.log("🔧 Initializing TransactionAgent for user:", this.userId);
    
    const [categoriesRes, typesRes, statesRes, accountsRes] = await Promise.all([
      categoryService.getAllCategories(),
      transactionTypeService.getAllTransactionTypes(),
      transactionStateService.getAllTransactionStates(),
      accountService.getAllAccounts(),
    ]);

    console.log("📊 Categories:", categoriesRes.data);
    console.log("📊 Types:", typesRes.data);
    console.log("📊 States:", statesRes.data);
    console.log("📊 Accounts:", accountsRes.data);

    const categories = categoriesRes.data || [];
    const types = typesRes.data || [];
    const states = statesRes.data || [];
    const accounts = accountsRes.data || [];

    this.defaults = {
      categoryId: categories[0]?.id || 1,
      typeId: types[0]?.id || 1,
      stateId: states[0]?.id || 1,
      accountId: accounts[0]?.id || 1,
    };

    console.log("✅ Defaults set:", this.defaults);
  } catch (error) {
    console.error("❌ Error initializing transaction agent:", error);
    // ...
  }
}
```

---

### Paso 5: Verificar Network Tab

1. Abre DevTools (F12)
2. Ve a la pestaña **Network**
3. Filtra por **Fetch/XHR**
4. Intenta crear una transacción: `"create a default transaction"`
5. Busca la petición a `/api/accounts`

**Verifica:**
- ✅ Request URL: `http://localhost:3001/api/accounts`
- ✅ Request Method: `GET`
- ✅ Status Code: `200 OK`
- ✅ Request Headers incluyen: `Authorization: Bearer ...`
- ✅ Response tiene `data` con array de cuentas

**Si ves error:**
- ❌ Status 401: Token inválido o expirado → Re-login
- ❌ Status 404: Endpoint incorrecto → Verificar URL
- ❌ Status 500: Error del servidor → Verificar backend logs

---

### Paso 6: Verificar Backend Logs

En la terminal donde corre el backend, deberías ver:

```
GET /api/accounts 200 - - 15.234 ms
```

**Si ves error:**
```
GET /api/accounts 404 - - 2.123 ms
```

Verifica que:
1. El backend esté corriendo en `http://localhost:3001`
2. Las rutas estén registradas correctamente en `router.ts`
3. El authMiddleware esté funcionando

---

### Paso 7: Test Completo del Flujo

En el AI Assistant, prueba estos comandos en orden:

```
1. "create a default transaction"
   → Debería crear una transacción con valores por defecto

2. "show my transactions"
   → Debería mostrar la transacción creada

3. "create an expense of $50 for groceries"
   → Debería crear una transacción con los valores especificados

4. "show my recent transactions"
   → Debería mostrar ambas transacciones
```

---

### Paso 8: Verificar Base de Datos

Si tienes acceso a la base de datos:

```sql
-- Verificar que el usuario tiene cuentas
SELECT * FROM accounts WHERE user_id = 1;

-- Verificar transacciones
SELECT * FROM transactions WHERE user_id = 1;

-- Verificar categorías
SELECT * FROM categories;

-- Verificar tipos de transacción
SELECT * FROM transaction_types;
```

---

## 🐛 Errores Comunes y Soluciones

### Error: "Account not found"

**Causa 1:** Usuario no tiene cuentas
```javascript
// Solución: Crear una cuenta
// Ver Paso 3
```

**Causa 2:** Endpoint incorrecto
```typescript
// ❌ Incorrecto
accountService.getAccountsByUserId(userId)

// ✅ Correcto
accountService.getAllAccounts()
```

**Causa 3:** Token inválido
```javascript
// Solución: Re-login
localStorage.removeItem("token");
// Luego hacer login nuevamente
```

---

### Error: "Unauthorized" (401)

**Causa:** Token no existe o expiró

**Solución:**
```javascript
// Verificar token
const token = localStorage.getItem("token");
if (!token) {
  console.log("No token found - please login");
}

// Verificar expiración
const payload = JSON.parse(atob(token.split('.')[1]));
const isExpired = Date.now() >= payload.exp * 1000;
console.log("Token expired:", isExpired);
```

---

### Error: "Cannot read property 'id' of undefined"

**Causa:** `user` no está disponible en `useAuthListener`

**Solución:**
```typescript
// En useAIAssistant.tsx
const { user } = useAuthListener();

useEffect(() => {
  console.log("User from auth listener:", user);
  if (user) {
    console.log("Initializing agent for user:", user.id);
    // ...
  }
}, [user]);
```

---

### Error: Network request failed

**Causa:** Backend no está corriendo

**Solución:**
```bash
# En la terminal del backend
cd C:\Users\EGBER INSIGNARES\Desktop\personal_projects\ai-money-backend
npm run dev
```

---

## ✅ Checklist Final

Antes de reportar un bug, verifica:

- [ ] Backend está corriendo (`http://localhost:3001`)
- [ ] Frontend está corriendo (`http://localhost:3000`)
- [ ] Usuario está logueado (token en localStorage)
- [ ] Token no ha expirado
- [ ] Usuario tiene al menos una cuenta creada
- [ ] Network tab muestra peticiones exitosas (200)
- [ ] Console no muestra errores de JavaScript
- [ ] Backend logs no muestran errores

---

## 📞 Siguiente Paso

Si después de seguir todos estos pasos el error persiste:

1. **Captura de pantalla** del error en la consola
2. **Captura de pantalla** del Network tab
3. **Copia** los logs del backend
4. **Describe** exactamente qué comando usaste

Con esta información podremos identificar el problema exacto.

