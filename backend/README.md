# 💰 AI Money App - Backend API

Robust and scalable RESTful API for the AI Money App financial management application, built with Node.js, Express, and TypeScript.

## 📋 Overview

The AI Money App backend provides a complete API to manage all user financial operations, including authentication, transactions, budgets, financial goals, analytics, and more. It uses a modular layer-based architecture (Controller-Service-Repository) to keep the code organized and scalable.

## 🏗️ Architecture

### Project Structure

```
backend/
├── src/
│   ├── accounts/           # Financial accounts management
│   ├── account_types/      # Account types (Checking, Savings, etc.)
│   ├── ai_assistants/      # AI Assistant
│   ├── analytics/          # Financial analysis and metrics
│   ├── auth/               # Authentication and authorization
│   ├── budgets/            # Budget management
│   ├── budget_preferences/ # Budget preferences
│   ├── categories/         # Transaction categories
│   ├── currencies/         # Supported currencies
│   ├── debts/              # Debt management
│   ├── goals/              # Financial goals
│   ├── goal_types/         # Goal types
│   ├── languages/          # System languages
│   ├── onboardings/        # Onboarding process
│   ├── plans/              # Subscription plans
│   ├── providers/          # Authentication providers
│   ├── reports/            # Financial reports
│   ├── report_types/       # Report types
│   ├── roles/              # User roles
│   ├── security_levels/    # Security levels
│   ├── settings/           # User settings
│   ├── states/             # Transaction states
│   ├── transactions/       # Financial transactions
│   ├── transaction_types/  # Transaction types
│   ├── users/              # User management
│   ├── config/             # Application configuration
│   │   └── db.ts          # Sequelize configuration
│   ├── middleware/         # Express middlewares
│   │   ├── authMiddleware.ts
│   │   └── errorHandler.ts
│   ├── services/           # Shared services
│   │   └── emailService.ts
│   ├── util/               # Utilities
│   │   ├── constants/     # Constants and environment variables
│   │   ├── crypto/        # Encryption functions
│   │   ├── errors/        # Custom errors
│   │   ├── validators/    # Validators
│   │   └── utilApplication.ts
│   ├── index.ts           # Application entry point
│   └── router.ts          # Main router
├── package.json
├── tsconfig.json
├── nodemon.json
└── README.md
```

### Architecture Pattern

Each module follows a 3-layer architecture:

```
Module/
├── controller.ts    # Handles HTTP requests and responses
├── service.ts       # Business logic
├── repository.ts    # Data access (ORM)
├── model.ts         # Sequelize model
├── router.ts        # Route definitions
└── types.ts         # TypeScript types and interfaces
```

## 🚀 Main Technologies

- **Runtime**: Node.js
- **Framework**: Express 5.1.0
- **Language**: TypeScript 5.9.3
- **ORM**: Sequelize 6.37.7 + Sequelize-TypeScript 2.1.6
- **Database**: MySQL 8.0+
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Encryption**: bcrypt 6.0.0
- **Email**: Nodemailer 7.0.9
- **CORS**: cors 2.8.5
- **Environment Variables**: dotenv 17.2.3
- **Dev Tools**: nodemon 3.1.10, ts-node 10.9.2

## 📡 API Endpoints

### 🔐 Authentication (`/api/auth`)

| Method | Endpoint                | Description            | Auth |
| ------ | ----------------------- | ---------------------- | ---- |
| POST   | `/auth/login`           | Login                  | No   |
| POST   | `/auth/register`        | Register new user      | No   |
| POST   | `/auth/forgot-password` | Request password reset | No   |
| POST   | `/auth/reset-password`  | Reset password         | No   |

### 👥 Users (`/api/users`)

| Method | Endpoint     | Description               | Auth |
| ------ | ------------ | ------------------------- | ---- |
| GET    | `/users`     | Get all users (paginated) | Yes  |
| GET    | `/users/:id` | Get user by ID            | Yes  |
| POST   | `/users`     | Create new user           | Yes  |
| PUT    | `/users/:id` | Update user               | Yes  |
| DELETE | `/users/:id` | Delete user               | Yes  |

### 💳 Accounts (`/api/accounts`)

| Method | Endpoint        | Description        | Auth |
| ------ | --------------- | ------------------ | ---- |
| GET    | `/accounts`     | Get all accounts   | Yes  |
| GET    | `/accounts/:id` | Get account by ID  | Yes  |
| POST   | `/accounts`     | Create new account | Yes  |
| PUT    | `/accounts/:id` | Update account     | Yes  |
| DELETE | `/accounts/:id` | Delete account     | Yes  |

### 💸 Transactions (`/api/transactions`)

| Method | Endpoint            | Description            | Auth |
| ------ | ------------------- | ---------------------- | ---- |
| GET    | `/transactions`     | Get all transactions   | Yes  |
| GET    | `/transactions/:id` | Get transaction by ID  | Yes  |
| POST   | `/transactions`     | Create new transaction | Yes  |
| PUT    | `/transactions/:id` | Update transaction     | Yes  |
| DELETE | `/transactions/:id` | Delete transaction     | Yes  |

### 🎯 Goals (`/api/goals`)

| Method | Endpoint     | Description     | Auth |
| ------ | ------------ | --------------- | ---- |
| GET    | `/goals`     | Get all goals   | Yes  |
| GET    | `/goals/:id` | Get goal by ID  | Yes  |
| POST   | `/goals`     | Create new goal | Yes  |
| PUT    | `/goals/:id` | Update goal     | Yes  |
| DELETE | `/goals/:id` | Delete goal     | Yes  |

### 💰 Budgets (`/api/budgets`)

| Method | Endpoint       | Description       | Auth |
| ------ | -------------- | ----------------- | ---- |
| GET    | `/budgets`     | Get all budgets   | Yes  |
| GET    | `/budgets/:id` | Get budget by ID  | Yes  |
| POST   | `/budgets`     | Create new budget | Yes  |
| PUT    | `/budgets/:id` | Update budget     | Yes  |
| DELETE | `/budgets/:id` | Delete budget     | Yes  |

### 📊 Analytics (`/api/analytics`)

| Method | Endpoint         | Description             | Auth |
| ------ | ---------------- | ----------------------- | ---- |
| GET    | `/analytics`     | Get financial analytics | Yes  |
| GET    | `/analytics/:id` | Get analytics by ID     | Yes  |
| POST   | `/analytics`     | Create new analytics    | Yes  |
| PUT    | `/analytics/:id` | Update analytics        | Yes  |
| DELETE | `/analytics/:id` | Delete analytics        | Yes  |

### 📂 Categories (`/api/categories`)

| Method | Endpoint          | Description         | Auth |
| ------ | ----------------- | ------------------- | ---- |
| GET    | `/categories`     | Get all categories  | Yes  |
| GET    | `/categories/:id` | Get category by ID  | Yes  |
| POST   | `/categories`     | Create new category | Yes  |
| PUT    | `/categories/:id` | Update category     | Yes  |
| DELETE | `/categories/:id` | Delete category     | Yes  |

### ⚙️ Settings (`/api/settings`)

| Method | Endpoint        | Description        | Auth |
| ------ | --------------- | ------------------ | ---- |
| GET    | `/settings`     | Get user settings  | Yes  |
| GET    | `/settings/:id` | Get settings by ID | Yes  |
| POST   | `/settings`     | Create settings    | Yes  |
| PUT    | `/settings/:id` | Update settings    | Yes  |
| DELETE | `/settings/:id` | Delete settings    | Yes  |

### 🎓 Onboarding (`/api/onboardings`)

| Method | Endpoint           | Description          | Auth |
| ------ | ------------------ | -------------------- | ---- |
| GET    | `/onboardings`     | Get onboardings      | Yes  |
| GET    | `/onboardings/:id` | Get onboarding by ID | Yes  |
| POST   | `/onboardings`     | Create onboarding    | Yes  |
| PUT    | `/onboardings/:id` | Update onboarding    | Yes  |
| DELETE | `/onboardings/:id` | Delete onboarding    | Yes  |

### 💱 Reference Endpoints

- **Currencies**: `/api/currencies`
- **Account Types**: `/api/account-types`
- **Transaction Types**: `/api/transaction-types`
- **Goal Types**: `/api/goal-types`
- **States**: `/api/states`

## 🗄️ Database Models

### Main Models

1. **UserModel** - System users
2. **AccountModel** - Financial accounts
3. **TransactionModel** - Transactions
4. **BudgetModel** - Budgets
5. **GoalModel** - Financial goals
6. **AnalyticsModel** - Analytics and metrics
7. **SettingModel** - User settings
8. **CategoryModel** - Categories
9. **OnboardingModel** - Onboarding process
10. **ReportModel** - Financial reports
11. **DebtModel** - Debts

### Reference Models

1. **RoleModel** - Roles (Admin, User)
2. **ProviderModel** - Auth providers (Email, Google, GitHub)
3. **PlanModel** - Plans (Free, Premium, Enterprise)
4. **CurrencyModel** - Currencies (USD, EUR, GBP, COP)
5. **AccountTypeModel** - Account types
6. **TransactionTypeModel** - Transaction types
7. **GoalTypeModel** - Goal types
8. **StateModel** - States
9. **LanguageModel** - Languages
10. **SecurityLevelModel** - Security levels
11. **ReportTypeModel** - Report types
12. **BudgetPreferenceModel** - Budget preferences
13. **AiAssistantModel** - AI Assistant

## 🔐 Authentication and Security

### Authentication System

The backend uses **JWT (JSON Web Tokens)** for authentication:

1. **Login**: User sends credentials (email + password)
2. **Validation**: Email is verified and password hash is compared
3. **Token**: A JWT is generated with user information
4. **Authorization**: Token is sent in the `Authorization: Bearer <token>` header

### Authentication Middleware

```typescript
// authMiddleware.ts
- Verifies JWT token on each protected request
- Extracts user information from token
- Adds user data to request object
- Handles authentication errors
```

### Password Encryption

- **bcrypt** for password hashing
- Configurable salt rounds
- Secure password comparison

### Password Reset

1. User requests reset (`/auth/forgot-password`)
2. A temporary reset token is generated
3. Email is sent with reset link
4. User resets password with token (`/auth/reset-password`)

## 📧 Email Service

### EmailService

Uses **Nodemailer** with Gmail to send emails:

- **Password Reset Emails**: Professional HTML templates
- **Connection Verification**: SMTP configuration test
- **Customizable Templates**: HTML and plain text

### Configuration

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

## 🛡️ Error Handling

### Error Handler Middleware

Centralized middleware for error handling:

```typescript
- CustomError: Custom errors with code and status
- NotFoundError: 404 - Resource not found
- UnauthorizedError: 401 - Unauthorized
- ValidationError: 400 - Validation error
- ConflictError: 409 - Conflict (e.g., duplicate email)
- InternalServerError: 500 - Internal error
```

### Error Response Format

```json
{
  "message": "Error message",
  "status": 400,
  "code": "ERROR_CODE",
  "timestamp": "2025-10-30T12:00:00.000Z",
  "path": "/api/endpoint"
}
```

## 🚀 Installation and Setup

### Prerequisites

- Node.js 20+
- MySQL 8.0+
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/joseCardona12/ai-money-app.git
cd ai-money-app/backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the backend root:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ai_money_db

# Server Configuration
PORT=3001

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=24h

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Frontend URL (for email links)
FRONTEND_URL=http://localhost:3000

# Environment
NODE_ENV=development
```

4. **Setup the database**

Create the database in MySQL:

```sql
CREATE DATABASE ai_money_db;
```

5. **Start the server**

```bash
# Development (with hot reload)
npm run dev

# Production
npm run build
npm start
```

## 📦 Available Scripts

```json
{
  "dev": "nodemon", // Start development server
  "build": "tsc", // Compile TypeScript to JavaScript
  "start": "node dist/index.js" // Start production server
}
```

## 🔧 Sequelize Configuration

### Database Connection

```typescript
// config/db.ts
- Sequelize configuration with TypeScript
- Registration of all models
- Automatic database synchronization
- MySQL support
```

### Synchronization

```typescript
// utilApplication.ts
- Database authentication
- Model synchronization
- Express server initialization
```

## 🌐 CORS Configuration

```typescript
// index.ts
cors({
  origin: ["http://localhost:3001", "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
});
```

## 📊 Validations

### Custom Validators

- **AuthValidators**: Login and registration validation
- **UserValidators**: User data validation
- **TransactionValidators**: Transaction validation
- **BudgetValidators**: Budget validation

### Layer Validation

1. **Controller**: Basic parameter validation
2. **Service**: Business logic validation
3. **Repository**: Data integrity validation

## 🧪 Testing

```bash
# Run tests (when configured)
npm test

# Run tests with coverage
npm run test:coverage
```

## 📈 Best Practices Implemented

### Architecture

- ✅ Separation of concerns (Controller-Service-Repository)
- ✅ Dependency injection
- ✅ SOLID principles
- ✅ Modular and reusable code

### Security

- ✅ JWT authentication
- ✅ Password encryption with bcrypt
- ✅ Input data validation
- ✅ Secure error handling
- ✅ CORS configured
- ✅ Environment variables for secrets

### Code

- ✅ TypeScript for static typing
- ✅ Well-defined interfaces and types
- ✅ Centralized error handling
- ✅ Error logging
- ✅ Clean and documented code

## 🔄 Request Flow

```
1. Client → HTTP Request
2. Express → CORS Middleware
3. Express → JSON Parser
4. Router → Identifies the route
5. Auth Middleware → Verifies JWT (if protected route)
6. Controller → Receives and validates parameters
7. Service → Executes business logic
8. Repository → Accesses the database
9. Service → Processes and returns data
10. Controller → Formats response
11. Error Handler → Catches errors (if any)
12. Express → Sends response to client
```

## 🐛 Debugging

### Logs

The server logs:

- Database connection
- Model synchronization
- Server port
- Errors with full stack trace
- Timestamp of each error
- Request URL and method

### Recommended Tools

- **Postman**: API testing
- **MySQL Workbench**: Database management
- **VS Code**: Debugging with breakpoints
- **Nodemon**: Hot reload in development

## 🚧 Roadmap

### Upcoming Features

- [ ] Unit and integration tests
- [ ] Swagger/OpenAPI documentation
- [ ] Rate limiting
- [ ] Caching with Redis
- [ ] Structured logging with Winston
- [ ] Metrics and monitoring
- [ ] CI/CD pipeline
- [ ] Docker containerization
- [ ] Webhooks for notifications
- [ ] GraphQL API (optional)

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Conventions

- Use strict TypeScript
- Follow the Controller-Service-Repository pattern
- Document complex functions
- Handle errors appropriately
- Write tests for new features

## 📝 License

This project is private and under active development.

## 👨‍💻 Author

**Team ai money**

- Email: josesimonbarreto.design@gmail.com
- GitHub: [@joseCardona12](https://github.com/joseCardona12)

## 📞 Support

For technical support and questions about the backend:

- Create an issue on GitHub
- Contact the development team

## 🔗 Related Links

- [📖 Frontend Documentation](../ui/README.md)
- [📖 General Project Documentation](../README.md)

---

**Last updated**: 2025-10-30
**Version**: 1.0.0
**Status**: Under active development 🚧
**Default port**: 3001
