# AI Agent - Guía de Uso

## 🤖 Descripción General

El AI Agent es un asistente inteligente que procesa lenguaje natural para ejecutar acciones relacionadas con transacciones financieras. Utiliza NLP (Natural Language Processing) para entender las intenciones del usuario y ejecutar las acciones correspondientes.

## 🏗️ Arquitectura

### Componentes Principales

1. **NLPService** (`services/nlpService.ts`)
   - Procesa el texto del usuario
   - Extrae palabras clave y valores
   - Identifica la intención (intent)
   - Calcula nivel de confianza

2. **TransactionAgent** (`services/transactionAgent.ts`)
   - Ejecuta acciones basadas en la intención
   - Maneja la creación de transacciones
   - Gestiona valores por defecto
   - Valida campos requeridos

3. **useAIAssistant Hook** (`hooks/useAIAssistant.tsx`)
   - Integra NLP y Agent
   - Maneja el flujo de mensajes
   - Gestiona el estado del chat

## 📝 Comandos Soportados

### Crear Transacciones

#### Con valores por defecto:
```
"create a default transaction"
"add a default transaction"
"make a test transaction"
```

#### Con valores específicos:
```
"create a transaction of $100 for groceries"
"add an expense of $50 for food"
"create an income of $1000 for salary"
"add a transaction of $25 for transportation"
```

#### Ejemplos completos:
```
"create an expense of $45.50 for groceries"
"add an income transaction of $2000 for salary"
"make a payment of $100 for utilities"
```

### Ver Transacciones

```
"show my transactions"
"list my recent transactions"
"get my transactions"
"display my transactions"
```

## 🔍 Palabras Clave Reconocidas

### Acciones
- **Crear**: create, add, new, make, register
- **Ver**: get, show, display, view, see, list, find
- **Actualizar**: update, edit, modify, change (próximamente)
- **Eliminar**: delete, remove, erase, cancel (próximamente)

### Recursos
- **Transacciones**: transaction, transactions, payment, expense, income, charge

### Tipos
- **Ingreso**: income, earning, salary, revenue, profit, gain
- **Gasto**: expense, spending, cost, payment, charge, bill

### Categorías
- **Comida**: food, groceries, grocery, restaurant, dining, lunch, dinner, breakfast
- **Transporte**: transport, transportation, gas, fuel, uber, taxi, bus, metro
- **Entretenimiento**: entertainment, movie, cinema, game, fun, hobby
- **Compras**: shopping, clothes, clothing, shoes, fashion
- **Servicios**: utilities, utility, electricity, water, internet, phone
- **Salud**: health, medical, doctor, pharmacy, medicine, hospital
- **Educación**: education, school, course, book, tuition
- **Otros**: other, miscellaneous, misc, various

## 🎯 Extracción de Valores

El NLP Service extrae automáticamente:

1. **Monto**: Números con o sin símbolo de dólar
   - `$100` → 100
   - `45.50` → 45.50

2. **Descripción**: Texto después de "for" o entre comillas
   - `for groceries` → "groceries"
   - `"Monthly rent"` → "Monthly rent"

3. **Tipo**: Detecta si es ingreso o gasto
   - `income` → income
   - `expense` → expense

4. **Categoría**: Identifica la categoría por palabras clave
   - `groceries` → food
   - `gas` → transport

5. **Fecha**: Detecta referencias temporales
   - `today` → fecha actual
   - `yesterday` → fecha de ayer

## ⚙️ Valores por Defecto

Cuando se usa la palabra "default" o "test", el agente crea una transacción con:

```typescript
{
  description: "Default transaction created by AI",
  amount: 100.00,
  date: new Date(),
  transaction_type_id: [primer tipo disponible],
  state_id: [primer estado disponible],
  account_id: [primera cuenta del usuario],
  category_id: [primera categoría disponible]
}
```

## 🔄 Flujo de Procesamiento

```
Usuario ingresa texto
    ↓
NLPService.extractIntent()
    ↓
Extrae: action, resource, values, missingFields
    ↓
TransactionAgent.executeIntent()
    ↓
Valida campos requeridos
    ↓
Si faltan campos → Solicita información
Si tiene todo → Ejecuta acción
    ↓
Retorna respuesta al usuario
```

## 📊 Nivel de Confianza

El sistema calcula un nivel de confianza (0-1) basado en:

- **Acción identificada**: +0.3
- **Recurso identificado**: +0.3
- **Valores extraídos**: +0.1 por cada valor (máx 0.4)

Si la confianza es < 0.5, el agente pide aclaración.

## 🚀 Ejemplos de Uso

### Ejemplo 1: Transacción por defecto
```
Usuario: "create a default transaction"
Agente: "✅ Default transaction created successfully! Amount: $100"
```

### Ejemplo 2: Transacción con valores
```
Usuario: "add an expense of $50 for groceries"
Agente: "✅ Transaction created successfully!
         Amount: $50
         Description: groceries"
```

### Ejemplo 3: Información incompleta
```
Usuario: "create a transaction"
Agente: "I need more information to create the transaction. 
         Missing: amount, type (income/expense), category, description. 
         Please provide these details or say 'create a default transaction' 
         to use default values."
```

### Ejemplo 4: Ver transacciones
```
Usuario: "show my transactions"
Agente: "Here are your recent transactions:

         1. Groceries - $50 (Food)
         2. Gas - $30 (Transport)
         3. Salary - $2000 (Income)
         
         Would you like to see more details?"
```

## 🔮 Próximas Funcionalidades

- [ ] Actualizar transacciones existentes
- [ ] Eliminar transacciones
- [ ] Filtrar transacciones por fecha/categoría
- [ ] Crear presupuestos
- [ ] Gestionar metas financieras
- [ ] Análisis de gastos con IA
- [ ] Recomendaciones personalizadas

## 🛠️ Desarrollo

### Agregar nuevas palabras clave

Edita `nlpService.ts`:

```typescript
private static CATEGORY_KEYWORDS = {
  nueva_categoria: ["palabra1", "palabra2", "palabra3"],
  // ...
};
```

### Agregar nuevas acciones

1. Agrega la acción en `IExtractedIntent`
2. Agrega palabras clave en `ACTION_KEYWORDS`
3. Implementa el handler en `TransactionAgent`

### Testing

Prueba diferentes variaciones de comandos:
- Con/sin valores
- Con/sin palabras clave
- Con errores de ortografía
- Con diferentes órdenes de palabras

## 📚 Referencias

- NLP Service: `src/app/(main)/dashboard/ai-assistant/services/nlpService.ts`
- Transaction Agent: `src/app/(main)/dashboard/ai-assistant/services/transactionAgent.ts`
- Hook: `src/app/(main)/dashboard/ai-assistant/hooks/useAIAssistant.tsx`

