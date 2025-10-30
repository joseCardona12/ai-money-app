# AI-Money Mermaid Diagrams

## 1. Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    USERS ||--o{ ACCOUNTS : has
    USERS ||--o{ SETTINGS : has
    USERS ||--o{ ANALYTICS : has
    USERS ||--o{ GOALS : has
    USERS ||--o{ BUDGETS : has
    USERS ||--o{ ONBOARDINGS : has
    USERS }o--|| ROLES : has
    USERS }o--|| PLANS : has
    USERS }o--|| PROVIDERS : has
    
    ACCOUNTS ||--o{ TRANSACTIONS : contains
    ACCOUNTS }o--|| ACCOUNT_TYPES : has
    ACCOUNTS }o--|| CURRENCIES : uses
    
    TRANSACTIONS }o--|| CATEGORIES : categorized_by
    TRANSACTIONS }o--|| TRANSACTION_TYPES : has
    
    SETTINGS }o--|| PLANS : references
    SETTINGS }o--|| CURRENCIES : uses
    SETTINGS }o--|| LANGUAGES : uses
    SETTINGS }o--|| SECURITY_LEVELS : has
    
    GOALS }o--|| GOAL_TYPES : has
    BUDGETS }o--|| BUDGET_PREFERENCES : has
    ONBOARDINGS }o--|| CURRENCIES : uses
    ONBOARDINGS }o--|| GOAL_TYPES : references
    ONBOARDINGS }o--|| BUDGET_PREFERENCES : references
```

## 2. User Authentication Flow

```mermaid
graph TD
    A[User Visits App] --> B{Authenticated?}
    B -->|No| C[Sign Up / Login Page]
    C --> D{Auth Method}
    D -->|Email| E[Email/Password Auth]
    D -->|Google| F[Google OAuth]
    D -->|GitHub| G[GitHub OAuth]
    E --> H[Create User Record]
    F --> H
    G --> H
    H --> I[Create Settings]
    I --> J[Create Analytics]
    J --> K[Redirect to Onboarding]
    K --> L[Select Currency]
    L --> M[Set Monthly Income]
    M --> N[Choose Financial Goal]
    N --> O[Select Budget Preference]
    O --> P[Set Initial Balance]
    P --> Q[Create First Account]
    Q --> R[Redirect to Dashboard]
    B -->|Yes| R
```

## 3. Transaction Flow

```mermaid
graph LR
    A[User Records Transaction] --> B[Select Account]
    B --> C[Enter Amount]
    C --> D[Select Category]
    D --> E[Choose Type: Income/Expense]
    E --> F[Add Description]
    F --> G[Submit]
    G --> H[Save to Database]
    H --> I[Update Account Balance]
    I --> J[Update Analytics]
    J --> K[Refresh Dashboard]
```

## 4. Data Hierarchy

```mermaid
graph TD
    A[AI-MONEY SYSTEM] --> B[CORE ENTITIES]
    A --> C[TRANSACTION ENTITIES]
    A --> D[FEATURE ENTITIES]
    A --> E[REFERENCE TABLES]
    
    B --> B1[USERS]
    B --> B2[ACCOUNTS]
    B --> B3[SETTINGS]
    B --> B4[ANALYTICS]
    
    C --> C1[TRANSACTIONS]
    
    D --> D1[GOALS]
    D --> D2[BUDGETS]
    D --> D3[ONBOARDINGS]
    
    E --> E1[ROLES]
    E --> E2[PLANS]
    E --> E3[PROVIDERS]
    E --> E4[CURRENCIES]
    E --> E5[ACCOUNT_TYPES]
    E --> E6[CATEGORIES]
    E --> E7[LANGUAGES]
    E --> E8[SECURITY_LEVELS]
```

## 5. Module Dependencies

```mermaid
graph TB
    AUTH[Authentication Module]
    USER[User Management]
    ACCOUNT[Account Management]
    TRANS[Transaction Module]
    ANALYTICS[Analytics Module]
    GOALS[Goals Module]
    BUDGET[Budget Module]
    SETTINGS[Settings Module]
    
    AUTH --> USER
    USER --> ACCOUNT
    ACCOUNT --> TRANS
    TRANS --> ANALYTICS
    USER --> GOALS
    USER --> BUDGET
    USER --> SETTINGS
    ANALYTICS --> GOALS
    ANALYTICS --> BUDGET
```

## 6. API Request Flow

```mermaid
sequenceDiagram
    participant Client as Frontend
    participant API as Backend API
    participant DB as Database
    
    Client->>API: GET /users?page=1&limit=20
    API->>DB: Query users with pagination
    DB-->>API: Return users data
    API-->>Client: Return JSON response
    
    Client->>API: POST /transactions
    API->>DB: Insert transaction
    DB-->>API: Return created transaction
    API->>DB: Update account balance
    DB-->>API: Confirm update
    API->>DB: Update analytics
    DB-->>API: Confirm update
    API-->>Client: Return success response
```

## 7. User Roles & Permissions

```mermaid
graph TD
    ADMIN[Admin Role]
    USER[User Role]
    
    ADMIN --> A1[View All Users]
    ADMIN --> A2[Manage Users]
    ADMIN --> A3[View All Accounts]
    ADMIN --> A4[View Analytics]
    ADMIN --> A5[System Settings]
    
    USER --> U1[View Own Profile]
    USER --> U2[Manage Own Accounts]
    USER --> U3[Record Transactions]
    USER --> U4[View Own Analytics]
    USER --> U5[Manage Goals]
    USER --> U6[Manage Budgets]
```

## 8. Financial Data Flow

```mermaid
graph LR
    A[Income] --> B[Account Balance]
    C[Expenses] --> B
    B --> D[Analytics]
    D --> E[Savings Rate]
    D --> F[Cash Flow]
    D --> G[Reports]
    B --> H[Goals Progress]
    B --> I[Budget Status]
```

## 9. System Architecture

```mermaid
graph TB
    subgraph Frontend["Frontend Layer"]
        F1[Next.js App]
        F2[React Components]
        F3[State Management]
    end
    
    subgraph API["API Layer"]
        A1[Express Server]
        A2[Route Handlers]
        A3[Middleware]
    end
    
    subgraph Services["Service Layer"]
        S1[User Service]
        S2[Account Service]
        S3[Transaction Service]
        S4[Analytics Service]
    end
    
    subgraph Database["Data Layer"]
        D1[MySQL Database]
        D2[Tables]
    end
    
    F1 --> F2
    F2 --> F3
    F3 -->|HTTP| A1
    A1 --> A2
    A2 --> A3
    A3 --> S1
    A3 --> S2
    A3 --> S3
    A3 --> S4
    S1 --> D1
    S2 --> D1
    S3 --> D1
    S4 --> D1
    D1 --> D2
```

## 10. Plan Features Matrix

```mermaid
graph TD
    FREE["Free Plan"]
    PREMIUM["Premium Plan"]
    ENTERPRISE["Enterprise Plan"]
    
    FREE --> F1["✓ Basic Accounts"]
    FREE --> F2["✓ Transaction Tracking"]
    FREE --> F3["✓ Basic Analytics"]
    FREE --> F4["✗ Advanced Reports"]
    FREE --> F5["✗ AI Insights"]
    
    PREMIUM --> P1["✓ Unlimited Accounts"]
    PREMIUM --> P2["✓ Advanced Analytics"]
    PREMIUM --> P3["✓ Goal Tracking"]
    PREMIUM --> P4["✓ Budget Management"]
    PREMIUM --> P5["✗ Priority Support"]
    
    ENTERPRISE --> E1["✓ Everything in Premium"]
    ENTERPRISE --> E2["✓ Priority Support"]
    ENTERPRISE --> E3["✓ Custom Reports"]
    ENTERPRISE --> E4["✓ API Access"]
    ENTERPRISE --> E5["✓ Dedicated Account Manager"]
```

---

**Cómo usar estos diagramas en Notion:**

1. Copia el código Mermaid
2. En Notion, crea un bloque de código
3. Selecciona "Mermaid" como lenguaje
4. Pega el código
5. El diagrama se renderizará automáticamente

**Alternativas:**
- Lucidchart: Importa como diagrama
- Miro: Copia y pega
- Draw.io: Importa XML
- MindMeister: Crea manualmente basado en la estructura

