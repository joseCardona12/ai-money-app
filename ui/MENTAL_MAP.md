# AI-Money Mental Map & Architecture Overview

## 🧠 Complete System Mental Map

```
                          🏦 AI-MONEY SYSTEM
                                 │
                ┌────────────────┼────────────────┐
                │                │                │
           👥 USERS          💰 FINANCE       📊 ANALYTICS
                │                │                │
        ┌───────┼───────┐   ┌────┼────┐      ┌───┼───┐
        │       │       │   │    │    │      │   │   │
      👤 ID  🔐 AUTH  ⚙️ SETTINGS │    │      │   │   │
        │       │       │   │    │    │      │   │   │
        │   ┌───┴───┐   │   │    │    │      │   │   │
        │   │       │   │   │    │    │      │   │   │
      ROLE PLAN PROVIDER ACCOUNTS TRANS GOALS INCOME EXPENSE SAVINGS
        │   │       │   │   │    │      │   │   │
        │   │       │   │   │    │      │   │   │
      ADMIN FREE EMAIL CHECKING INCOME EMERGENCY TOTAL TOTAL RATE
      USER PREMIUM GOOGLE SAVINGS EXPENSE VACATION INCOME EXPENSE CHANGE
           ENTERPRISE GITHUB CREDIT TRANSFER INVESTMENT CASH FLOW
                            INVESTMENT DEBT PAYOFF
```

## 🔄 User Journey Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    USER LIFECYCLE                           │
└─────────────────────────────────────────────────────────────┘

1️⃣ SIGNUP/LOGIN
   ├─ Email/Password
   ├─ Google OAuth
   └─ GitHub OAuth
        │
        ▼
2️⃣ ONBOARDING
   ├─ Select Currency
   ├─ Set Monthly Income
   ├─ Choose Financial Goal
   ├─ Select Budget Preference
   └─ Set Initial Balance
        │
        ▼
3️⃣ ACCOUNT SETUP
   ├─ Create Accounts
   ├─ Link Bank Accounts
   ├─ Set Account Types
   └─ Configure Currencies
        │
        ▼
4️⃣ ACTIVE USAGE
   ├─ Record Transactions
   ├─ Track Spending
   ├─ Monitor Goals
   ├─ View Analytics
   └─ Manage Budgets
        │
        ▼
5️⃣ SETTINGS & PREFERENCES
   ├─ Update Profile
   ├─ Change Security Level
   ├─ Select Language
   ├─ Set Timezone
   └─ Manage Notifications
```

## 💾 Data Model Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                    TIER 1: CORE ENTITIES                    │
├─────────────────────────────────────────────────────────────┤
│  USERS ◄──────────────────────────────────────────────────┐ │
│  ├─ id, fullName, email, password                         │ │
│  ├─ phone_number, address, bio                            │ │
│  ├─ profile_picture, join_date                            │ │
│  └─ role_id, provider_id, plan_id (Foreign Keys)          │ │
└─────────────────────────────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
┌───────▼────────┐ ┌────▼─────────┐ ┌───▼──────────┐
│   ACCOUNTS     │ │   SETTINGS   │ │  ANALYTICS   │
├────────────────┤ ├──────────────┤ ├──────────────┤
│ id, name       │ │ id, region   │ │ id, user_id  │
│ balance        │ │ timezone     │ │ total_income │
│ created_at     │ │ notif_enabled│ │ total_exp... │
│ user_id (FK)   │ │ user_id (FK) │ │ savings_rate │
│ account_type_id│ │ plan_id (FK) │ │ net_cash_... │
│ currency_id    │ │ sec_level_id │ │ period       │
└────────────────┘ └──────────────┘ └──────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────┐
│                TIER 2: TRANSACTION ENTITIES                 │
├─────────────────────────────────────────────────────────────┤
│  TRANSACTIONS                                               │
│  ├─ id, amount, description, date                          │
│  ├─ account_id (FK), category_id (FK)                      │
│  └─ transaction_type_id (FK)                               │
└─────────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────┐
│                TIER 3: FEATURE ENTITIES                     │
├─────────────────────────────────────────────────────────────┤
│  GOALS          │  BUDGETS         │  ONBOARDINGS          │
│  ├─ id          │  ├─ id           │  ├─ id                │
│  ├─ user_id     │  ├─ user_id      │  ├─ user_id           │
│  ├─ goal_type   │  ├─ amount       │  ├─ currency_id       │
│  ├─ target_amt  │  ├─ period       │  ├─ monthly_income    │
│  └─ deadline    │  └─ category     │  └─ completed         │
└─────────────────────────────────────────────────────────────┘
```

## 🔗 Reference Data Structure

```
┌─────────────────────────────────────────────────────────────┐
│              TIER 4: REFERENCE/LOOKUP TABLES                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ROLES (2)          PLANS (3)         PROVIDERS (3)        │
│  ├─ Admin           ├─ Free           ├─ Email             │
│  └─ User            ├─ Premium        ├─ Google            │
│                     └─ Enterprise     └─ GitHub            │
│                                                             │
│  CURRENCIES (4)     ACCOUNT_TYPES (5) LANGUAGES (3)        │
│  ├─ USD             ├─ Checking       ├─ English           │
│  ├─ EUR             ├─ Savings        ├─ Spanish           │
│  ├─ GBP             ├─ Money Market   └─ French            │
│  └─ COP             ├─ Credit Card                         │
│                     └─ Investment                          │
│                                                             │
│  TRANSACTION_TYPES  CATEGORIES (7+)   SECURITY_LEVELS (3)  │
│  ├─ Income          ├─ Food & Dining  ├─ Low               │
│  └─ Expense         ├─ Transport      ├─ Medium            │
│                     ├─ Entertainment  └─ High              │
│                     ├─ Health                              │
│                     ├─ Bills & Utils                       │
│                     ├─ Shopping                            │
│                     └─ Other                               │
│                                                             │
│  GOAL_TYPES (3)     BUDGET_PREFS (3)  STATES (3)           │
│  ├─ Build Savings   ├─ Detailed       ├─ Pending           │
│  ├─ Pay Off Debt    ├─ Simple         ├─ Completed        │
│  └─ Start Investing └─ AI-Powered     └─ Cancelled         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 Feature Modules & Dependencies

```
┌──────────────────────────────────────────────────────────────┐
│                    FEATURE MODULES                           │
└──────────────────────────────────────────────────────────────┘

📱 AUTHENTICATION MODULE
├─ Sign Up Service
├─ Login Service
├─ OAuth Integration (Google, GitHub)
└─ Token Management

👥 USER MANAGEMENT MODULE
├─ User CRUD Operations
├─ Profile Management
├─ Role Assignment
└─ Settings Configuration

💳 ACCOUNT MANAGEMENT MODULE
├─ Account CRUD
├─ Account Type Selection
├─ Currency Management
└─ Balance Tracking

💸 TRANSACTION MODULE
├─ Transaction Recording
├─ Category Assignment
├─ Transaction Type (Income/Expense)
└─ Transaction History

📊 ANALYTICS MODULE
├─ Income Tracking
├─ Expense Tracking
├─ Savings Rate Calculation
├─ Cash Flow Analysis
└─ Report Generation

🎯 GOALS MODULE
├─ Goal Creation
├─ Goal Type Selection
├─ Progress Tracking
└─ Deadline Management

💰 BUDGET MODULE
├─ Budget Creation
├─ Budget Preferences
├─ Spending Limits
└─ Budget Alerts

⚙️ SETTINGS MODULE
├─ User Preferences
├─ Security Configuration
├─ Language Selection
├─ Timezone Setup
└─ Notification Settings
```

## 📈 API Endpoints Structure

```
/api/auth
├─ POST /signup
├─ POST /login
└─ POST /logout

/api/users
├─ GET /users (paginated)
├─ GET /users/:id
├─ POST /users
├─ PUT /users/:id
└─ DELETE /users/:id

/api/accounts
├─ GET /accounts
├─ GET /accounts/:id
├─ POST /accounts
├─ PUT /accounts/:id
└─ DELETE /accounts/:id

/api/transactions
├─ GET /transactions
├─ GET /transactions/:id
├─ POST /transactions
├─ PUT /transactions/:id
└─ DELETE /transactions/:id

/api/analytics
├─ GET /analytics
├─ GET /analytics/summary
└─ GET /analytics/reports

/api/goals
├─ GET /goals
├─ POST /goals
├─ PUT /goals/:id
└─ DELETE /goals/:id

/api/budgets
├─ GET /budgets
├─ POST /budgets
├─ PUT /budgets/:id
└─ DELETE /budgets/:id
```

---

**Nota:** Este mapa mental puede ser importado a Notion, MindMeister, Lucidchart o cualquier herramienta de diagramación.

