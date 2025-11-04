# AI Money App - Frontend (UI)

Modern and responsive web application for financial management, built with Next.js 15.5.4 and React 19.

## Overview

The AI Money App frontend is a comprehensive financial management interface that provides users with powerful tools to track expenses, manage budgets, set financial goals, and get AI-powered insights. Built with the latest web technologies, it offers a smooth and intuitive user experience.

## Architecture

### Project Structure

```
ui/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (main)/            # Main application routes
│   │   │   ├── login/         # Login page
│   │   │   ├── sign-up/       # Registration page
│   │   │   ├── onboarding/    # User onboarding flow
│   │   │   └── dashboard/     # Main dashboard (protected)
│   │   │       ├── home/      # Dashboard home
│   │   │       ├── accounts/  # Account management
│   │   │       ├── transactions/ # Transaction history
│   │   │       ├── budget/    # Budget planning
│   │   │       ├── goals/     # Financial goals
│   │   │       ├── analytics/ # Analytics & insights
│   │   │       ├── wallet/    # Wallet overview
│   │   │       ├── ai-assistant/ # AI Assistant
│   │   │       ├── settings/  # User settings
│   │   │       ├── myaccount/ # User profile
│   │   │       ├── users/     # User management (Admin)
│   │   │       └── providers/ # Auth providers
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Root page (redirects to login)
│   │   └── globals.css        # Global styles
│   ├── components/            # Shared components
│   │   ├── ProtectedRoute.tsx # Route protection HOC
│   │   └── PublicRoute.tsx    # Public route HOC
│   ├── hooks/                 # Global hooks
│   │   └── useAuth.tsx        # Authentication hook
│   ├── interfaces/            # TypeScript interfaces
│   │   ├── dto/               # Data Transfer Objects
│   │   ├── accountRequest.ts
│   │   ├── budgetRequest.ts
│   │   ├── goalRequest.ts
│   │   ├── transaction.ts
│   │   ├── user.ts
│   │   └── ...
│   ├── services/              # API services
│   │   ├── auth.ts            # Authentication service
│   │   ├── account.ts         # Account service
│   │   ├── transaction.ts     # Transaction service
│   │   ├── budget.ts          # Budget service
│   │   ├── goals.ts           # Goals service
│   │   ├── analytics.ts       # Analytics service
│   │   ├── cloudinary.ts      # Image upload service
│   │   └── ...
│   ├── ui/                    # UI components library
│   │   └── components/        # Reusable UI components
│   └── utils/                 # Utilities
│       ├── constants/         # Constants and configs
│       ├── httpClient.ts      # HTTP client wrapper
│       └── transactions/      # Transaction utilities
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── README.md
```

### Architecture Pattern

Each dashboard module follows a consistent structure:

```
Module/
├── ModuleView.tsx          # Main view component
├── page.tsx                # Next.js page entry
├── components/             # Module-specific components
├── hooks/                  # Module-specific hooks
├── types/                  # TypeScript types
└── utils/                  # Module utilities
    ├── constants/          # Module constants
    └── functions/          # Helper functions
```

## Main Technologies

- **Framework**: Next.js 15.5.4 with Turbopack
- **UI Library**: React 19.1.0
- **Styling**: TailwindCSS 4
- **Authentication**: Clerk 6.33.2
- **Forms**: React Hook Form 7.64.0 + Zod 4.1.11
- **Charts**: Recharts 3.3.0
- **Icons**: Tabler Icons 3.35.0, React Icons 5.5.0
- **Notifications**: Sonner 2.0.7, React Hot Toast 2.6.0
- **PDF Export**: jsPDF 3.0.3, html2canvas 1.4.1
- **Language**: TypeScript 5
- **Linting**: ESLint 9

## Key Features

### Authentication & Authorization

- **Multi-provider authentication** via Clerk:
  - Email/Password
  - Google OAuth
  - GitHub OAuth
- **JWT token management**
- **Protected routes** with middleware
- **Role-based access control** (Admin/User)
- **Onboarding flow** for new users

### Account Management

- **Multiple account types**: Checking, Savings, Investment, Credit Card
- **Multi-currency support**: USD, EUR, GBP, COP
- **Account balance tracking**
- **Account creation, editing, and deletion**
- **Image upload** for account icons (Cloudinary integration)
- **Account details modal** with full information

### Transaction Management

- **Transaction history** with pagination
- **Advanced filtering**:
  - By category
  - By transaction type (Income/Expense)
  - By date range
  - By search term
- **Transaction creation** with form validation
- **Transaction editing and deletion**
- **Transaction state management** (Pending, Completed, Cancelled)
- **Real-time balance updates**

### Budget Planning

- **Budget creation** with categories
- **Budget tracking** and monitoring
- **Visual progress indicators**
- **Budget vs actual spending comparison**
- **Budget alerts** and notifications
- **Monthly/yearly budget views**

### Financial Goals

- **Goal creation** with target amounts
- **Goal categories**: Savings, Investment, Debt Payment, Emergency Fund
- **Progress tracking** with visual indicators
- **Contribution management**
- **Goal completion tracking**
- **Overall progress dashboard**

### Analytics & Insights

- **Spending analytics** by category
- **Income vs expense charts**
- **Monthly trends** visualization
- **Category breakdown** with pie charts
- **Financial health score**
- **Custom date range analysis**

### AI Assistant

- **Natural language processing** for financial queries
- **Intelligent financial advice**
- **Transaction analysis**
- **Budget recommendations**
- **Goal suggestions**

### Dashboard Features

- **Responsive design** for all devices
- **Dark mode support**
- **Real-time data updates**
- **Interactive charts** with Recharts
- **Export to PDF** functionality
- **User profile management**
- **Settings customization**

### User Management (Admin)

- **User list** with pagination
- **User creation and editing**
- **Role assignment**
- **User activity monitoring**
- **User deletion**

## UI Components

### Reusable Components

The application includes a comprehensive library of reusable UI components:

- **Forms**: Input fields, select dropdowns, checkboxes, radio buttons
- **Buttons**: Primary, secondary, danger, icon buttons
- **Modals**: Confirmation, form, details, image viewer
- **Cards**: Account cards, transaction cards, goal cards, budget cards
- **Charts**: Line charts, bar charts, pie charts, area charts
- **Tables**: Data tables with sorting, filtering, and pagination
- **Navigation**: Sidebar, header, breadcrumbs
- **Feedback**: Toasts, alerts, loading spinners, progress bars
- **Layout**: Grid, flex containers, responsive wrappers

### Design System

- **Color Palette**: Consistent color scheme with CSS variables
- **Typography**: Poppins and Inter fonts with defined hierarchy
- **Spacing**: Consistent spacing scale using Tailwind utilities
- **Shadows**: Elevation system for depth
- **Borders**: Consistent border radius and colors
- **Animations**: Smooth transitions and micro-interactions

## API Integration

### HTTP Client

Custom HTTP client wrapper (`httpClient.ts`) that handles:

- **Base URL configuration**
- **JWT token injection** in headers
- **Request/response interceptors**
- **Error handling** and formatting
- **Type-safe requests** with TypeScript generics

### Service Layer

All API calls are organized in service classes:

```typescript
// Example: Account Service
class AccountService {
  async getAllAccounts(): Promise<IResponseDto>;
  async getAccountById(id: number): Promise<IResponseDto>;
  async createAccount(data: IAccountRequest): Promise<IResponseDto>;
  async updateAccount(id: number, data: IAccountRequest): Promise<IResponseDto>;
  async deleteAccount(id: number): Promise<IResponseDto>;
}
```

### Available Services

- **authService**: Authentication operations
- **accountService**: Account management
- **transactionService**: Transaction operations
- **budgetService**: Budget management
- **goalService**: Goal tracking
- **analyticsService**: Analytics data
- **categoryService**: Category management
- **currencyService**: Currency operations
- **settingsService**: User settings
- **userService**: User management
- **onboardingService**: Onboarding flow
- **cloudinaryService**: Image uploads

## Authentication Flow

### Login Process

1. User enters credentials on login page
2. Frontend sends request to `/api/auth/login`
3. Backend validates credentials and returns JWT token
4. Token is stored in localStorage and cookies
5. User is redirected to onboarding or dashboard
6. Token is included in all subsequent API requests

### Protected Routes

```typescript
// ProtectedRoute component wraps dashboard pages
<ProtectedRoute>
  <DashboardContent />
</ProtectedRoute>
```

### Token Management

- **Storage**: localStorage and HTTP-only cookies
- **Refresh**: Automatic token refresh on expiration
- **Logout**: Token removal and redirect to login

## Installation and Setup

### Prerequisites

- Node.js 20+
- npm or yarn
- Backend API running (see [Backend README](../backend/README.md))

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/joseCardona12/ai-money-app.git
cd ai-money-app/ui
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env.local` file in the ui root:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard/home
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Cloudinary (for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

4. **Start the development server**

```bash
# Development (with Turbopack)
npm run dev

# Production build
npm run build
npm start
```

The application will be available at `http://localhost:3000`

## Available Scripts

```json
{
  "dev": "next dev --turbopack", // Start development server with Turbopack
  "build": "next build --turbopack", // Build for production with Turbopack
  "start": "next start", // Start production server
  "lint": "eslint" // Run ESLint
}
```

## Routing Structure

### Public Routes

- `/` - Root (redirects to `/login`)
- `/login` - Login page
- `/sign-up` - Registration page

### Protected Routes (Dashboard)

- `/dashboard/home` - Dashboard home
- `/dashboard/accounts` - Account management
- `/dashboard/transactions` - Transaction history
- `/dashboard/budget` - Budget planning
- `/dashboard/goals` - Financial goals
- `/dashboard/analytics` - Analytics & insights
- `/dashboard/wallet` - Wallet overview
- `/dashboard/ai-assistant` - AI Assistant
- `/dashboard/settings` - User settings
- `/dashboard/myaccount` - User profile
- `/dashboard/users` - User management (Admin only)
- `/dashboard/providers` - Auth providers

### Onboarding

- `/onboarding` - User onboarding flow (first-time users)

## Styling & Theming

### TailwindCSS Configuration

The application uses TailwindCSS 4 with custom configuration:

- **Custom colors** defined in CSS variables
- **Responsive breakpoints** for mobile, tablet, and desktop
- **Custom utilities** for common patterns
- **Dark mode support** with class-based strategy

### CSS Variables

```css
:root {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  --color-success: #10b981;
  --color-danger: #ef4444;
  --color-warning: #f59e0b;
  --color-gray: #f8fafc;
  --color-white: #ffffff;
  --color-black: #000000;
}
```

### Responsive Design

- **Mobile-first approach**
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- **Flexible layouts** with CSS Grid and Flexbox
- **Responsive typography** with fluid font sizes

## State Management

### Local State

- **React useState** for component-level state
- **React useEffect** for side effects
- **Custom hooks** for reusable logic

### Form State

- **React Hook Form** for form management
- **Zod** for schema validation
- **Type-safe forms** with TypeScript

### Global State

- **Context API** for authentication state
- **localStorage** for persistent data
- **Cookies** for token storage

## Data Visualization

### Recharts Integration

The application uses Recharts for all data visualization:

- **Line Charts**: Transaction trends over time
- **Bar Charts**: Category-wise spending comparison
- **Pie Charts**: Budget distribution
- **Area Charts**: Income vs expense trends
- **Composed Charts**: Multi-metric visualizations

### Chart Features

- **Interactive tooltips** with detailed information
- **Responsive sizing** for all screen sizes
- **Custom colors** matching the design system
- **Animations** for smooth transitions
- **Export to image** functionality

## Testing

```bash
# Run tests (when configured)
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## Performance Optimization

### Next.js Features

- **Server-Side Rendering (SSR)** for initial page load
- **Static Site Generation (SSG)** for static pages
- **Incremental Static Regeneration (ISR)** for dynamic content
- **Image optimization** with next/image
- **Code splitting** with dynamic imports
- **Route prefetching** for faster navigation

### Turbopack

- **Faster builds** with Turbopack bundler
- **Hot Module Replacement (HMR)** for instant updates
- **Optimized production builds**

### Best Practices

- **Lazy loading** for heavy components
- **Memoization** with React.memo and useMemo
- **Debouncing** for search and filter inputs
- **Pagination** for large data sets
- **Virtual scrolling** for long lists (when needed)

## Security

### Security Measures

- **JWT authentication** with secure token storage
- **HTTP-only cookies** for sensitive data
- **CSRF protection** with token validation
- **XSS prevention** with React's built-in escaping
- **Input validation** with Zod schemas
- **Secure API calls** with HTTPS
- **Environment variables** for sensitive configuration

### Data Protection

- **Client-side validation** before API calls
- **Server-side validation** on the backend
- **Error messages** without sensitive information
- **Secure password handling** (never stored on frontend)

## Debugging

### Development Tools

- **React DevTools** for component inspection
- **Next.js DevTools** for performance monitoring
- **Browser DevTools** for network and console debugging
- **TypeScript** for compile-time error detection

### Logging

- **Console logs** for development debugging
- **Error boundaries** for graceful error handling
- **Toast notifications** for user feedback
- **Sentry integration** (optional) for error tracking

## Roadmap

### Upcoming Features

- [ ] Unit and integration tests with Jest and React Testing Library
- [ ] E2E tests with Playwright or Cypress
- [ ] Storybook for component documentation
- [ ] Progressive Web App (PWA) support
- [ ] Offline mode with service workers
- [ ] Real-time updates with WebSockets
- [ ] Advanced analytics dashboard
- [ ] Mobile app with React Native
- [ ] Multi-language support (i18n)
- [ ] Accessibility improvements (WCAG 2.1 AA)

## Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Conventions

- Use **TypeScript** for all new code
- Follow **React best practices** and hooks guidelines
- Use **functional components** over class components
- Write **meaningful component and variable names**
- Add **TypeScript types** for all props and state
- Use **TailwindCSS** for styling (avoid inline styles)
- Keep **components small and focused** (Single Responsibility)
- Write **reusable hooks** for common logic
- Add **comments** for complex logic
- Follow the **existing folder structure**

### Component Guidelines

```typescript
// Good component structure
interface ComponentProps {
  title: string;
  onAction: () => void;
}

export default function Component({ title, onAction }: ComponentProps) {
  // Hooks at the top
  const [state, setState] = useState<string>("");

  // Event handlers
  const handleClick = () => {
    onAction();
  };

  // Render
  return <div>{title}</div>;
}
```

## License

This project is private and under active development.

## Author

**Team ai money**
-Isabel Henao(QA)
-Keyny M (Backend structure)
-Alejandro Barrios (Backend - Database)
-Jose Simón Barreto Cardona (Tech Lead - Frontend)

- Email: josesimonbarreto.design@gmail.com
- GitHub: [@joseCardona12](https://github.com/joseCardona12)

## Support

For technical support and questions about the frontend:

- Create an issue on GitHub
- Contact the development team

## Related Links

- [Backend Documentation](../backend/README.md)
- [General Project Documentation](../README.md)
- [Database Model Documentation](./DATABASE_MODEL.md)

---

**Last updated**: 2025-10-30
**Version**: 0.1.0
**Status**: Under active development
**Default port**: 3000
