# Arquitectura del AI Agent

## 📐 Diagrama de Flujo

```
┌─────────────────────────────────────────────────────────────────┐
│                         USUARIO                                  │
│                    (Texto o Voz)                                 │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ChatInput Component                           │
│  - Captura texto escrito                                         │
│  - Captura voz (Speech Recognition API)                          │
│  - Convierte voz a texto                                         │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   useAIAssistant Hook                            │
│  - Recibe mensaje del usuario                                    │
│  - Agrega mensaje al chat                                        │
│  - Llama a NLPService                                            │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      NLPService                                  │
│  ┌──────────────────────────────────────────────────┐           │
│  │ extractIntent(message)                           │           │
│  │                                                  │           │
│  │ 1. Segmenta el texto en palabras                │           │
│  │ 2. Busca palabras clave de ACCIÓN               │           │
│  │    - create, add, get, show, etc.               │           │
│  │                                                  │           │
│  │ 3. Busca palabras clave de RECURSO              │           │
│  │    - transaction, payment, expense, etc.        │           │
│  │                                                  │           │
│  │ 4. Extrae VALORES del mensaje                   │           │
│  │    - Monto: regex /\$?(\d+(?:\.\d{1,2})?)/     │           │
│  │    - Tipo: income/expense keywords              │           │
│  │    - Categoría: food, transport, etc.           │           │
│  │    - Descripción: texto después de "for"        │           │
│  │    - Fecha: today, yesterday, etc.              │           │
│  │                                                  │           │
│  │ 5. Determina CAMPOS FALTANTES                   │           │
│  │    - Si no hay "default", verifica campos       │           │
│  │                                                  │           │
│  │ 6. Calcula NIVEL DE CONFIANZA (0-1)             │           │
│  │    - Acción: +0.3                               │           │
│  │    - Recurso: +0.3                              │           │
│  │    - Valores: +0.1 c/u (max 0.4)                │           │
│  └──────────────────────────────────────────────────┘           │
│                                                                  │
│  Retorna: IExtractedIntent {                                    │
│    action: "create" | "get" | ...                               │
│    resource: "transaction" | ...                                │
│    useDefaults: boolean                                         │
│    extractedValues: { amount, description, ... }                │
│    missingFields: string[]                                      │
│    confidence: number                                           │
│  }                                                               │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   TransactionAgent                               │
│  ┌──────────────────────────────────────────────────┐           │
│  │ executeIntent(intent)                            │           │
│  │                                                  │           │
│  │ 1. VALIDACIÓN                                    │           │
│  │    - Verifica action y resource                 │           │
│  │    - Verifica confidence >= 0.5                 │           │
│  │                                                  │           │
│  │ 2. ROUTING                                       │           │
│  │    - create/add → handleCreateTransaction()     │           │
│  │    - get/show → handleGetTransactions()         │           │
│  │    - update/edit → No soportado (mensaje)       │           │
│  │    - delete/remove → No soportado (mensaje)     │           │
│  │                                                  │           │
│  │ 3. CREAR TRANSACCIÓN                            │           │
│  │    a) Verifica campos faltantes                 │           │
│  │       - Si faltan y no es "default" → pide info │           │
│  │                                                  │           │
│  │    b) Construye request                         │           │
│  │       - Si useDefaults = true:                  │           │
│  │         * amount: 100                           │           │
│  │         * description: "Default transaction"    │           │
│  │         * IDs: primeros disponibles             │           │
│  │                                                  │           │
│  │       - Si useDefaults = false:                 │           │
│  │         * Mapea categoría nombre → ID           │           │
│  │         * Mapea tipo nombre → ID                │           │
│  │         * Usa valores extraídos                 │           │
│  │                                                  │           │
│  │    c) Llama a transactionService.create()       │           │
│  │                                                  │           │
│  │ 4. VER TRANSACCIONES                            │           │
│  │    a) Llama a transactionService.getByUserId()  │           │
│  │    b) Formatea lista de transacciones           │           │
│  │    c) Retorna primeras 5                        │           │
│  └──────────────────────────────────────────────────┘           │
│                                                                  │
│  Retorna: IAgentResponse {                                      │
│    success: boolean                                             │
│    message: string                                              │
│    data?: any                                                   │
│    needsMoreInfo?: boolean                                      │
│    missingFields?: string[]                                     │
│  }                                                               │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Backend Services                               │
│  ┌──────────────────────────────────────────────────┐           │
│  │ transactionService                               │           │
│  │  - createTransaction(data, userId)              │           │
│  │  - getTransactionsByUserId(userId)              │           │
│  │                                                  │           │
│  │ categoryService                                  │           │
│  │  - getAllCategories()                           │           │
│  │                                                  │           │
│  │ transactionTypeService                           │           │
│  │  - getAllTransactionTypes()                     │           │
│  │                                                  │           │
│  │ transactionStateService                          │           │
│  │  - getAllTransactionStates()                    │           │
│  │                                                  │           │
│  │ accountService                                   │           │
│  │  - getAccountsByUserId(userId)                  │           │
│  └──────────────────────────────────────────────────┘           │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Backend API                                 │
│  POST /api/transactions/user/:userId                             │
│  GET  /api/transactions/user/:userId                             │
│  GET  /api/categories                                            │
│  GET  /api/transaction-types                                     │
│  GET  /api/transaction-states                                    │
│  GET  /api/accounts/user/:userId                                 │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Database                                   │
│  - transactions                                                  │
│  - categories                                                    │
│  - transaction_types                                             │
│  - transaction_states                                            │
│  - accounts                                                      │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   useAIAssistant Hook                            │
│  - Recibe respuesta del agente                                   │
│  - Agrega mensaje de respuesta al chat                           │
│  - Actualiza estado de typing                                    │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ChatArea Component                            │
│  - Muestra mensaje del usuario                                   │
│  - Muestra respuesta del AI                                      │
│  - Auto-scroll al último mensaje                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 🔑 Componentes Clave

### 1. NLPService
**Responsabilidad:** Procesamiento de lenguaje natural

**Métodos principales:**
- `extractIntent(message)`: Extrae la intención del mensaje
- `extractAction(words)`: Identifica la acción (create, get, etc.)
- `extractResource(words)`: Identifica el recurso (transaction)
- `extractValues(message, words)`: Extrae valores (monto, descripción, etc.)
- `determineMissingFields()`: Identifica campos faltantes
- `calculateConfidence()`: Calcula nivel de confianza
- `summarizeIntent()`: Genera resumen legible de la intención

**Keywords:**
```typescript
ACTION_KEYWORDS = {
  create: ["create", "add", "new", "make", "register"],
  get: ["get", "show", "display", "view", "see", "list"],
  update: ["update", "edit", "modify", "change"],
  delete: ["delete", "remove", "erase", "cancel"]
}

RESOURCE_KEYWORDS = {
  transaction: ["transaction", "payment", "expense", "income"]
}

TYPE_KEYWORDS = {
  income: ["income", "earning", "salary", "revenue"],
  expense: ["expense", "spending", "cost", "payment"]
}

CATEGORY_KEYWORDS = {
  food: ["food", "groceries", "restaurant", "dining"],
  transport: ["transport", "gas", "fuel", "uber", "taxi"],
  // ... más categorías
}
```

### 2. TransactionAgent
**Responsabilidad:** Ejecutar acciones de transacciones

**Métodos principales:**
- `initialize()`: Carga IDs por defecto de categorías, tipos, estados, cuentas
- `executeIntent(intent)`: Ejecuta la acción basada en la intención
- `handleCreateTransaction(intent)`: Maneja creación de transacciones
- `handleGetTransactions(intent)`: Maneja consulta de transacciones
- `buildTransactionRequest(intent)`: Construye el request para el backend
- `getCategoryIdByName(name)`: Mapea nombre de categoría a ID
- `getTypeIdByName(name)`: Mapea nombre de tipo a ID
- `formatSuccessMessage()`: Formatea mensaje de éxito

**Valores por defecto:**
```typescript
defaults = {
  categoryId: [primera categoría disponible],
  typeId: [primer tipo disponible],
  stateId: [primer estado disponible],
  accountId: [primera cuenta del usuario]
}
```

### 3. useAIAssistant Hook
**Responsabilidad:** Orquestar el flujo completo

**Estado:**
- `messages`: Array de mensajes del chat
- `isTyping`: Indicador de que el AI está "escribiendo"
- `inputValue`: Valor del input actual
- `agentRef`: Referencia al TransactionAgent

**Flujo:**
1. Usuario envía mensaje
2. Agrega mensaje del usuario al chat
3. Extrae intent con NLPService
4. Si es transacción → usa TransactionAgent
5. Si no es transacción → usa respuesta genérica
6. Agrega respuesta del AI al chat

## 📊 Estructura de Datos

### IExtractedIntent
```typescript
{
  action: "create" | "add" | "get" | "show" | "list" | "update" | "edit" | "delete" | "remove" | null,
  resource: "transaction" | "transactions" | null,
  useDefaults: boolean,
  extractedValues: {
    amount?: number,
    description?: string,
    category?: string,
    type?: "income" | "expense",
    date?: string
  },
  missingFields: string[],
  confidence: number
}
```

### IAgentResponse
```typescript
{
  success: boolean,
  message: string,
  data?: any,
  needsMoreInfo?: boolean,
  missingFields?: string[]
}
```

### ICreateTransactionRequest
```typescript
{
  description: string,
  amount: number,
  date: Date,
  transaction_type_id: number,
  state_id: number,
  account_id: number,
  category_id: number
}
```

## 🔄 Casos de Uso

### Caso 1: Transacción por defecto
```
Input: "create a default transaction"
↓
NLP: { action: "create", resource: "transaction", useDefaults: true }
↓
Agent: Usa valores por defecto
↓
Backend: POST /api/transactions/user/1
↓
Output: "✅ Default transaction created successfully! Amount: $100"
```

### Caso 2: Transacción con valores
```
Input: "create an expense of $50 for groceries"
↓
NLP: {
  action: "create",
  resource: "transaction",
  useDefaults: false,
  extractedValues: {
    amount: 50,
    type: "expense",
    category: "food",
    description: "groceries"
  }
}
↓
Agent: Mapea categoría "food" → ID, tipo "expense" → ID
↓
Backend: POST /api/transactions/user/1
↓
Output: "✅ Transaction created successfully!\nAmount: $50\nDescription: groceries"
```

### Caso 3: Información incompleta
```
Input: "create a transaction"
↓
NLP: {
  action: "create",
  resource: "transaction",
  useDefaults: false,
  missingFields: ["amount", "type", "category", "description"]
}
↓
Agent: Detecta campos faltantes
↓
Output: "I need more information... Missing: amount, type, category, description"
```

## 🎯 Extensibilidad

Para agregar nuevas funcionalidades:

1. **Nuevas acciones**: Agregar en `ACTION_KEYWORDS` y crear handler en `TransactionAgent`
2. **Nuevos recursos**: Agregar en `RESOURCE_KEYWORDS` y crear nuevo Agent
3. **Nuevas categorías**: Agregar en `CATEGORY_KEYWORDS`
4. **Nuevos tipos**: Agregar en `TYPE_KEYWORDS`

## 🔐 Seguridad

- Requiere autenticación (userId)
- Valida campos antes de enviar al backend
- Maneja errores de API
- No expone información sensible en mensajes

