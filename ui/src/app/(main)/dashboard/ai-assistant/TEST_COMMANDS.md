# Comandos de Prueba para el AI Agent

## ✅ Comandos que FUNCIONAN

### 1. Crear Transacción por Defecto
```
create a default transaction
add a default transaction
make a test transaction
create default transaction
new default transaction
```

**Resultado esperado:**
```
✅ Default transaction created successfully! Amount: $100
```

---

### 2. Crear Transacción con Monto
```
create a transaction of $100
add a transaction of 50
make a payment of $75.50
create transaction of 200
```

**Resultado esperado:**
```
I need more information to create the transaction. Missing: type (income/expense), category, description.
```

---

### 3. Crear Transacción con Monto y Descripción
```
create a transaction of $100 for groceries
add an expense of $50 for food
make a payment of $25 for lunch
create transaction of $30 for dinner
```

**Resultado esperado:**
```
✅ Transaction created successfully!
Amount: $100
Description: groceries
```

---

### 4. Crear Transacción Completa (Gasto)
```
create an expense of $100 for groceries
add an expense of $50 for food shopping
make an expense payment of $75 for restaurant
create expense transaction of $30 for lunch
```

**Resultado esperado:**
```
✅ Transaction created successfully!
Amount: $100
Description: groceries
```

---

### 5. Crear Transacción Completa (Ingreso)
```
create an income of $2000 for salary
add income of $500 for freelance
make an income of $1000 for bonus
create income transaction of $300 for tips
```

**Resultado esperado:**
```
✅ Transaction created successfully!
Amount: $2000
Description: salary
```

---

### 6. Ver Transacciones
```
show my transactions
list my transactions
get my transactions
display my transactions
view my recent transactions
show transactions
```

**Resultado esperado:**
```
Here are your recent transactions:

1. Groceries - $50 (Food)
2. Gas - $30 (Transport)
3. Salary - $2000 (Income)

Would you like to see more details?
```

---

## 🎯 Ejemplos por Categoría

### Comida (Food)
```
create an expense of $50 for groceries
add expense of $30 for restaurant
make payment of $15 for lunch
create expense of $20 for dinner
add expense of $10 for breakfast
```

### Transporte (Transport)
```
create an expense of $40 for gas
add expense of $15 for uber
make payment of $50 for taxi
create expense of $30 for bus pass
add expense of $100 for metro card
```

### Entretenimiento (Entertainment)
```
create an expense of $25 for movie
add expense of $60 for game
make payment of $40 for cinema
create expense of $100 for hobby supplies
```

### Compras (Shopping)
```
create an expense of $80 for clothes
add expense of $120 for shoes
make payment of $200 for fashion items
create expense of $50 for clothing
```

### Servicios (Utilities)
```
create an expense of $100 for electricity
add expense of $60 for water
make payment of $80 for internet
create expense of $50 for phone bill
```

### Salud (Health)
```
create an expense of $150 for doctor
add expense of $30 for pharmacy
make payment of $200 for medical checkup
create expense of $50 for medicine
```

### Educación (Education)
```
create an expense of $500 for tuition
add expense of $50 for books
make payment of $200 for course
create expense of $30 for school supplies
```

---

## 🔄 Variaciones de Lenguaje Natural

### Diferentes formas de decir lo mismo:

**Crear transacción:**
```
create a transaction of $100 for groceries
add a transaction of $100 for groceries
make a transaction of $100 for groceries
new transaction of $100 for groceries
register a transaction of $100 for groceries
```

**Con/sin símbolo de dólar:**
```
create transaction of $100 for groceries
create transaction of 100 for groceries
```

**Con/sin artículos:**
```
create a transaction of $100 for groceries
create transaction of $100 for groceries
```

**Orden diferente:**
```
create an expense of $100 for groceries
create a $100 expense for groceries
add $100 expense for groceries
```

---

## ❌ Comandos que NO funcionan (aún)

### Actualizar transacciones
```
update transaction 123 to $200
edit my last transaction
change transaction amount to $150
```

**Resultado esperado:**
```
Transaction updates are not yet supported through the AI assistant. Please use the transactions page.
```

---

### Eliminar transacciones
```
delete transaction 123
remove my last transaction
cancel transaction
```

**Resultado esperado:**
```
Transaction deletion is not yet supported through the AI assistant. Please use the transactions page.
```

---

## 🧪 Casos de Prueba Específicos

### Caso 1: Sin información suficiente
**Input:** `create a transaction`

**Output esperado:**
```
I need more information to create the transaction. Missing: amount, type (income/expense), category, description. Please provide these details or say "create a default transaction" to use default values.
```

---

### Caso 2: Solo con monto
**Input:** `create a transaction of $100`

**Output esperado:**
```
I need more information to create the transaction. Missing: type (income/expense), category, description. Please provide these details or say "create a default transaction" to use default values.
```

---

### Caso 3: Monto y tipo, sin categoría
**Input:** `create an expense of $100`

**Output esperado:**
```
I need more information to create the transaction. Missing: category, description. Please provide these details or say "create a default transaction" to use default values.
```

---

### Caso 4: Comando no relacionado con transacciones
**Input:** `what's the weather today?`

**Output esperado:**
```
I understand you're asking about your finances. I can help you with budgeting, expense tracking, goal setting, and financial analysis. Could you be more specific about what you'd like assistance with?
```

---

## 📝 Notas para Testing

1. **Autenticación requerida**: Asegúrate de estar logueado antes de probar comandos de transacciones
2. **Valores por defecto**: Los IDs por defecto se obtienen de la primera categoría, tipo, estado y cuenta disponibles
3. **Categorías**: El sistema intenta mapear palabras clave a categorías existentes
4. **Montos**: Acepta números con o sin símbolo de dólar
5. **Descripciones**: Extrae texto después de "for" o entre comillas

---

## 🎤 Pruebas con Voz

También puedes probar estos comandos usando el micrófono:

1. Click en el ícono del micrófono
2. Di el comando en voz alta
3. El sistema transcribirá y procesará el comando

**Comandos recomendados para voz:**
- "Create a default transaction"
- "Show my transactions"
- "Add an expense of fifty dollars for groceries"
- "Create an income of two thousand dollars for salary"

