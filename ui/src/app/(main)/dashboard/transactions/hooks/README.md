# Transaction Hooks Architecture

Este directorio contiene los hooks organizados por funcionalidad para la vista de transacciones.

## Estructura de Hooks

### 1. **useTransactions.tsx** (Hook Principal)

El hook principal que orquesta todos los demás hooks y proporciona la interfaz unificada.

```typescript
const transactionData = useTransactions();
```

**Retorna:**

- Datos de transacciones
- Estados de filtros, modales
- Todas las acciones disponibles

---

### 2. **useTransactionFilters.tsx**

Maneja toda la lógica de filtros y búsqueda.

**Responsabilidades:**

- Gestionar filtros (categoría, tipo, período)
- Manejar búsqueda con debounce
- Limpiar filtros

**Retorna:**

```typescript
{
  filters: ITransactionFilters,
  searchInputValue: string,
  handleSearch: (term: string) => void,
  handleCategoryFilter: (category: string) => void,
  handleTypeFilter: (type: string) => void,
  handleTimePeriodFilter: (period: string) => void,
  clearFilters: () => void,
}
```

---

### 3. **useTransactionModal.tsx**

Maneja el modal de agregar/editar transacciones.

**Responsabilidades:**

- Abrir/cerrar modal
- Cambiar entre modo "add" y "edit"
- Guardar transacción seleccionada

**Retorna:**

```typescript
{
  modal: IModalState,
  openAddModal: () => void,
  openEditModal: (transaction: ITransaction) => void,
  closeModal: () => void,
  handleEditTransaction: (transaction: ITransaction) => void,
}
```

---

### 4. **useTransactionDetails.tsx**

Maneja el modal de detalles de transacciones.

**Responsabilidades:**

- Mostrar detalles de una transacción
- Descargar recibos
- Eliminar transacciones

**Retorna:**

```typescript
{
  detailsModal: IDetailsModalState,
  handleViewDetails: (transaction: ITransaction) => void,
  closeDetailsModal: () => void,
  handleDownloadReceipt: (transactionId: number) => void,
  handleDeleteTransaction: (transactionId: number) => void,
}
```

---

### 5. **useTransactionFormData.tsx**

Carga los datos necesarios para los formularios.

**Responsabilidades:**

- Cargar categorías del backend
- Cargar tipos de transacciones
- Cargar estados
- Cargar cuentas del usuario
- Convertir datos a formato SelectOption

**Retorna:**

```typescript
{
  categories: SelectOption[],
  types: SelectOption[],
  states: SelectOption[],
  accounts: SelectOption[],
  isLoading: boolean,
}
```

---

### 6. **useTransactionList.tsx**

Maneja la carga y paginación de la lista de transacciones.

**Responsabilidades:**

- Cargar transacciones del backend
- Aplicar filtros
- Manejar paginación
- Mapear datos del backend al formato UI

**Retorna:**

```typescript
{
  transactions: ITransaction[],
  currentPage: number,
  totalItems: number,
  itemsPerPage: number,
  isLoading: boolean,
  handlePageChange: (page: number) => void,
}
```

---

### 7. **useTransactionSubmit.tsx**

Maneja la creación y edición de transacciones.

**Responsabilidades:**

- Convertir datos del formulario al formato del backend
- Crear nuevas transacciones
- Actualizar transacciones existentes
- Manejar errores

**Retorna:**

```typescript
{
  handleModalSubmit: (data: ITransactionRequest) => Promise<void>,
}
```

---

## Archivos Utilitarios

### **transactionMapper.ts**

Contiene la función `mapBackendTransactionToUI` que convierte transacciones del backend al formato de UI.

---

## Flujo de Datos

```
useTransactions (Hook Principal)
├── useTransactionFilters (Filtros)
├── useTransactionModal (Modal Add/Edit)
├── useTransactionDetails (Modal Detalles)
├── useTransactionFormData (Datos del Formulario)
├── useTransactionList (Lista de Transacciones)
└── useTransactionSubmit (Envío de Datos)
```

---

## Ventajas de esta Arquitectura

✅ **Separación de Responsabilidades**: Cada hook tiene una responsabilidad clara
✅ **Reutilizable**: Los hooks pueden usarse independientemente
✅ **Testeable**: Cada hook puede testearse por separado
✅ **Mantenible**: Código más organizado y fácil de entender
✅ **Escalable**: Fácil agregar nuevas funcionalidades
✅ **Limpio**: Sin console.log ni comentarios innecesarios

---

## Ejemplo de Uso

```typescript
import useTransactions from "@/app/(main)/dashboard/transactions/hooks/useTransactions";

export default function TransactionsView() {
  const {
    transactions,
    filters,
    modal,
    handleSearch,
    handleCategoryFilter,
    openAddModal,
    closeModal,
    handleModalSubmit,
  } = useTransactions();

  return (
    <div>
      {/* Filtros */}
      <TransactionsFilters
        onSearch={handleSearch}
        onCategoryChange={handleCategoryFilter}
      />

      {/* Lista */}
      <TransactionsList transactions={transactions} />

      {/* Modal */}
      {modal.isOpen && (
        <TransactionModal
          isOpen={modal.isOpen}
          onClose={closeModal}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
}
```
