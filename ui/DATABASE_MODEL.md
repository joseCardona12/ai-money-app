# AI-Money Database Model & Architecture

## 📊 Entity Relationship Diagram (ERD)

```
┌─────────────────────────────────────────────────────────────────┐
│                         CORE ENTITIES                           │
└─────────────────────────────────────────────────────────────────┘

                              USERS
                    ┌──────────────────────┐
                    │ id (PK)              │
                    │ fullName             │
                    │ email                │
                    │ password             │
                    │ phone_number         │
                    │ address              │
                    │ bio                  │
                    │ profile_picture      │
                    │ join_date            │
                    │ role_id (FK)         │◄──────┐
                    │ provider_id (FK)     │◄──┐   │
                    │ plan_id (FK)         │◄──┼───┼──┐
                    └──────────────────────┘   │   │  │
                           │                   │   │  │
                ┌──────────┴──────────┐        │   │  │
                │                     │        │   │  │
                ▼                     ▼        │   │  │
            ACCOUNTS              SETTINGS    │   │  │
        ┌──────────────────┐  ┌──────────┐   │   │  │
        │ id (PK)          │  │ id (PK)  │   │   │  │
        │ name             │  │ region   │   │   │  │
        │ balance          │  │ timezone │   │   │  │
        │ created_at       │  │ notif... │   │   │  │
        │ user_id (FK)     │◄─┤ user_id  │   │   │  │
        │ account_type_id  │  │ plan_id  │───┼───┘  │
        │ currency_id      │  │ sec_lv.. │   │      │
        └──────────────────┘  │ curr_id  │   │      │
                │              │ lang_id  │   │      │
                │              └──────────┘   │      │
                │                             │      │
                ▼                             │      │
          TRANSACTIONS                        │      │
        ┌──────────────────┐                  │      │
        │ id (PK)          │                  │      │
        │ amount           │                  │      │
        │ description      │                  │      │
        │ date             │                  │      │
        │ account_id (FK)  │                  │      │
        │ category_id (FK) │                  │      │
        │ trans_type_id    │                  │      │
        └──────────────────┘                  │      │
                                              │      │
                                    ┌─────────┴──────┴──┐
                                    │                  │
                                    ▼                  ▼
                                  ROLES            PLANS
                            ┌──────────────┐  ┌──────────┐
                            │ id (PK)      │  │ id (PK)  │
                            │ name         │  │ name     │
                            └──────────────┘  └──────────┘
                                    ▲              ▲
                                    │              │
                                    └──────┬───────┘
                                           │
                                    PROVIDERS
                                ┌──────────────┐
                                │ id (PK)      │
                                │ name         │
                                └──────────────┘
```

## 🗂️ Complete Entity List

### Core Entities
1. **USERS** - Sistema de usuarios
   - Roles: Admin (2), User (1)
   - Providers: Email (1), Google (2), GitHub (3)
   - Plans: Free (1), Premium (2), Enterprise (3)

2. **ACCOUNTS** - Cuentas bancarias/financieras
   - Types: Checking, Savings, Money Market, Credit Card, Investment
   - Currencies: USD, EUR, GBP, COP

3. **TRANSACTIONS** - Movimientos de dinero
   - Types: Income, Expense
   - Categories: Food, Transportation, Entertainment, Health, Bills, Shopping

4. **SETTINGS** - Configuración de usuario
   - Security Levels: Low, Medium, High
   - Languages: English, Spanish, French

5. **ANALYTICS** - Análisis financiero
   - Metrics: Total Income, Total Expenses, Savings Rate, Net Cash Flow

### Reference Tables
- **ROLES** - Roles de usuario
- **PLANS** - Planes de suscripción
- **PROVIDERS** - Proveedores de autenticación
- **CURRENCIES** - Monedas soportadas
- **ACCOUNT_TYPES** - Tipos de cuentas
- **TRANSACTION_TYPES** - Tipos de transacciones
- **CATEGORIES** - Categorías de transacciones
- **LANGUAGES** - Idiomas soportados
- **SECURITY_LEVELS** - Niveles de seguridad
- **STATES** - Estados (pending, completed, cancelled)

### Feature Tables
- **GOALS** - Metas financieras
- **GOAL_TYPES** - Tipos de metas
- **BUDGETS** - Presupuestos
- **BUDGET_PREFERENCES** - Preferencias de presupuesto
- **ONBOARDINGS** - Datos de onboarding

## 🔗 Key Relationships

```
USER (1) ──────────────────────────── (N) ACCOUNTS
  │                                        │
  │                                        └─── (N) TRANSACTIONS
  │
  ├─── (1) ROLE
  ├─── (1) PROVIDER
  ├─── (1) PLAN
  └─── (1) SETTINGS
        ├─── (1) PLAN
        ├─── (1) CURRENCY
        ├─── (1) LANGUAGE
        └─── (1) SECURITY_LEVEL

ACCOUNT (1) ──────────────────────── (N) TRANSACTIONS
  ├─── (1) ACCOUNT_TYPE
  ├─── (1) CURRENCY
  └─── (1) USER

TRANSACTION (N) ──────────────────── (1) CATEGORY
  ├─── (1) ACCOUNT
  └─── (1) TRANSACTION_TYPE
```

## 📈 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Users Page   │  │ Accounts     │  │ Transactions │      │
│  │ Dashboard    │  │ Wallet       │  │ Analytics    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────────┬────────────────────────────────────┘
                         │
                    HTTP/REST API
                         │
┌────────────────────────▼────────────────────────────────────┐
│                  BACKEND (Node.js/Express)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ User Service │  │ Account Svc  │  │ Transaction  │      │
│  │ Auth Service │  │ Wallet Svc   │  │ Analytics    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────────┬────────────────────────────────────┘
                         │
                    Database Layer
                         │
┌────────────────────────▼────────────────────────────────────┐
│                   MySQL Database                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Users        │  │ Accounts     │  │ Transactions │      │
│  │ Settings     │  │ Analytics    │  │ Goals        │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 Feature Modules Map

```
AI-MONEY APPLICATION
│
├── 👤 USER MANAGEMENT
│   ├── Authentication (Sign Up, Login, OAuth)
│   ├── User Profiles
│   ├── Role Management (Admin, User)
│   └── Settings & Preferences
│
├── 💰 FINANCIAL MANAGEMENT
│   ├── Accounts (Checking, Savings, Credit)
│   ├── Transactions (Income, Expenses)
│   ├── Wallet Management
│   └── Currency Support
│
├── 📊 ANALYTICS & INSIGHTS
│   ├── Dashboard Analytics
│   ├── Financial Reports
│   ├── Spending Patterns
│   └── Savings Rate Tracking
│
├── 🎯 GOALS & BUDGETS
│   ├── Financial Goals
│   ├── Budget Planning
│   ├── Goal Tracking
│   └── Progress Monitoring
│
├── ⚙️ SYSTEM CONFIGURATION
│   ├── Plans (Free, Premium, Enterprise)
│   ├── Security Levels
│   ├── Languages & Localization
│   └── Timezone & Region Settings
│
└── 🔐 SECURITY & COMPLIANCE
    ├── Authentication Providers
    ├── Data Encryption
    ├── Access Control
    └── Audit Logging
```

## 📋 Database Tables Summary

| Table | Records | Purpose |
|-------|---------|---------|
| users | ~20+ | User accounts |
| accounts | ~50+ | Financial accounts |
| transactions | ~1000+ | Transaction history |
| settings | ~20+ | User preferences |
| analytics | ~20+ | Financial metrics |
| roles | 2 | Admin, User |
| plans | 3 | Free, Premium, Enterprise |
| providers | 3 | Email, Google, GitHub |
| currencies | 4 | USD, EUR, GBP, COP |
| account_types | 5 | Checking, Savings, etc |
| categories | 7+ | Expense categories |
| goals | ~50+ | User financial goals |
| budgets | ~30+ | Budget records |

---

**Last Updated:** 2025-10-29
**Database:** MySQL (ai_money_db)
**Frontend:** Next.js 15.5.4
**Backend:** Node.js/Express

