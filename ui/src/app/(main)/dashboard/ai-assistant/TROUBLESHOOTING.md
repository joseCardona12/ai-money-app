# Troubleshooting - AI Agent

## 🔍 Problema: "Account not found"

### Causa Raíz
El backend usa **JWT authentication middleware** que extrae el `userId` automáticamente del token. Los endpoints NO requieren `userId` en la URL para las operaciones del usuario autenticado.

### Endpoints Correctos

#### ❌ INCORRECTO (Frontend antiguo)
```typescript
// NO usar estos endpoints con userId en la URL para operaciones del usuario actual
accountService.getAccountsByUserId(userId)  // GET /api/accounts/user/:userId
```

#### ✅ CORRECTO (Actualizado)
```typescript
// Usar estos endpoints que usan el JWT token
accountService.getAllAccounts()  // GET /api/accounts (usa JWT)
```

### Arquitectura del Backend

```
Request → authMiddleware → Controller
            ↓
    Extrae userId del JWT token
            ↓
    req.user.id = userId
            ↓
    Controller usa req.user.id
```

### Rutas del Backend

#### Accounts (`/api/accounts`)
```typescript
// Todas requieren authMiddleware
accountRouter.use(authMiddleware);

// GET /api/accounts - Obtiene cuentas del usuario autenticado
accountRouter.get("/", AccountController.getUserAccounts);
// Controller: const userId = req.user!.id;

// GET /api/accounts/user/:userId - Solo para admin (obtener cuentas de otro usuario)
accountRouter.get("/user/:userId", AccountController.getAccountsByUserId);
```

#### Transactions (`/api/transactions`)
```typescript
// Todas requieren authMiddleware
transactionRouter.use(authMiddleware);

// POST /api/transactions/user/:userId - Crear transacción
transactionRouter.post("/user/:userId", TransactionController.createTransactionForUser);

// GET /api/transactions/user/:userId - Obtener transacciones
transactionRouter.get("/user/:userId", TransactionController.getTransactionsByUserId);
```

### Solución Implementada

#### 1. TransactionAgent - Inicialización
**Antes:**
```typescript
accountService.getAccountsByUserId(this.userId)  // ❌ Error
```

**Después:**
```typescript
accountService.getAllAccounts()  // ✅ Usa JWT token
```

#### 2. Servicios del Frontend

**accountService.ts:**
```typescript
// ✅ Correcto - Usa JWT del localStorage
public async getAllAccounts(): Promise<IResponseDto> {
  return await this.httpClient.get<IResponseDto>("accounts");
}

// ⚠️ Solo para admin - obtener cuentas de otro usuario
public async getAccountsByUserId(userId: number): Promise<IResponseDto> {
  return await this.httpClient.get<IResponseDto>(`accounts/user/${userId}`);
}
```

**transactionService.ts:**
```typescript
// ✅ Correcto - Requiere userId en URL
public async createTransaction(
  transaction: ICreateTransactionRequest,
  userId: number
): Promise<IResponseDto> {
  return await this.httpClient.post<ICreateTransactionRequest, IResponseDto>(
    `transactions/user/${userId}`,
    transaction
  );
}
```

### HTTPClient - Autenticación

El `HTTPClient` automáticamente agrega el token JWT a todas las peticiones:

```typescript
private getHeaders(token?: string | null) {
  const headers: Record<string, string> = {
    "Content-type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

async get<T>(url: string): Promise<T> {
  await this.ensureValidToken();
  const token = localStorage.getItem("token");
  const headers = this.getHeaders(token);
  // ...
}
```

### Verificación

#### 1. Verificar que el token existe
```typescript
const token = localStorage.getItem("token");
console.log("Token:", token ? "Exists" : "Missing");
```

#### 2. Verificar que el usuario está autenticado
```typescript
const { user } = useAuthListener();
console.log("User:", user);
```

#### 3. Verificar la petición en Network Tab
```
Request URL: http://localhost:3001/api/accounts
Request Headers:
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### 4. Verificar la respuesta del backend
```json
{
  "status": 200,
  "message": "Accounts retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Main Account",
      "balance": 1000,
      ...
    }
  ]
}
```

### Errores Comunes

#### Error 1: "Account not found"
**Causa:** Usando endpoint incorrecto con userId en URL
**Solución:** Usar `getAllAccounts()` en lugar de `getAccountsByUserId(userId)`

#### Error 2: "Unauthorized"
**Causa:** Token no existe o expiró
**Solución:** 
- Verificar que el usuario esté logueado
- Verificar que el token esté en localStorage
- Verificar que el token no haya expirado

#### Error 3: "No accounts found"
**Causa:** El usuario no tiene cuentas creadas
**Solución:** 
- Crear una cuenta primero
- Usar valores por defecto hardcodeados si no hay cuentas

### Testing

#### Test 1: Verificar autenticación
```typescript
// En la consola del navegador
localStorage.getItem("token")
```

#### Test 2: Verificar endpoint de accounts
```typescript
// En la consola del navegador
fetch("http://localhost:3001/api/accounts", {
  headers: {
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json"
  }
})
.then(r => r.json())
.then(console.log)
```

#### Test 3: Verificar creación de transacción
```typescript
// En AI Assistant
"create a default transaction"
```

### Logs Útiles

#### Backend
```typescript
// En controller.ts
console.log("User ID from JWT:", req.user!.id);
console.log("Accounts found:", accounts);
```

#### Frontend
```typescript
// En transactionAgent.ts
console.log("Initializing agent for user:", this.userId);
console.log("Accounts response:", accountsRes);
console.log("Defaults:", this.defaults);
```

### Checklist de Debugging

- [ ] Usuario está autenticado (`user` existe)
- [ ] Token existe en localStorage
- [ ] Token no ha expirado
- [ ] Request incluye header `Authorization`
- [ ] Backend recibe el token correctamente
- [ ] Backend extrae userId del token
- [ ] Usuario tiene al menos una cuenta creada
- [ ] Endpoint correcto (`/api/accounts` no `/api/accounts/user/:userId`)

### Próximos Pasos

Si el error persiste:

1. **Verificar en Network Tab:**
   - URL de la petición
   - Headers (especialmente Authorization)
   - Response del servidor

2. **Verificar en Backend:**
   - Logs del authMiddleware
   - Logs del controller
   - Verificar que el usuario tenga cuentas en la DB

3. **Verificar en Frontend:**
   - Console logs del TransactionAgent
   - Estado del usuario en useAuthListener
   - Token en localStorage

### Contacto

Si necesitas ayuda adicional, revisa:
- `ARCHITECTURE.md` - Arquitectura completa del sistema
- `AI_AGENT_GUIDE.md` - Guía de uso del agente
- Backend logs en la terminal del servidor

