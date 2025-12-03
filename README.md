# Driver PWA App

A comprehensive Progressive Web App (PWA) for delivery drivers, similar to Zomato's driver app. Built with React, TypeScript, TanStack Query, Zustand, and Leaflet maps.

## Features

- 🔐 **Authentication**: Login/Register with JWT token management
- 📦 **Order Management**: View, accept, reject, and track orders
- 🗺️ **Navigation**: Interactive maps with Leaflet, real-time location tracking, and route display
- 💰 **Earnings**: Track daily/weekly/monthly earnings with charts and analytics
- 👤 **Profile Management**: Update profile, vehicle information, and online/offline status
- 📊 **Dashboard**: Overview statistics, active orders, and quick actions
- 📱 **PWA Support**: Installable app with offline support and service worker
- 🎨 **Modern UI**: Responsive design with Tailwind CSS

## Tech Stack

- **Frontend**: React 18+ with TypeScript
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router v6
- **Maps**: Leaflet with OpenStreetMap
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **PWA**: Vite PWA Plugin
- **Form Handling**: React Hook Form + Zod validation
- **Mock API**: JSON Server

## Project Structure

```
src/
├── app/                    # App-level configuration
│   ├── router.tsx         # Route definitions
│   └── providers.tsx      # Context providers
├── features/              # Feature-based modules
│   ├── auth/             # Authentication
│   ├── orders/           # Order management
│   ├── navigation/       # Maps and navigation
│   ├── earnings/         # Earnings tracking
│   ├── profile/          # Profile management
│   └── dashboard/        # Dashboard
├── shared/               # Shared utilities and components
│   ├── components/       # Reusable UI components
│   ├── hooks/           # Custom hooks
│   ├── utils/           # Helper functions
│   └── constants/       # App constants
└── services/            # API client setup
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the mock API server (in a separate terminal):
```bash
npm run mock-api
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Mock API Credentials

- Email: `driver@example.com`
- Password: `password123`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run mock-api` - Start JSON Server mock API

## Features in Detail

### Authentication
- JWT-based authentication
- Protected routes
- Persistent login state with Zustand

### Orders
- Real-time order updates (30s polling)
- Accept/Reject orders
- Order status tracking (Pending → Accepted → Picked → Delivered)
- Order details view
- Order history

### Navigation
- Interactive map with OpenStreetMap
- Current location tracking
- Route visualization between pickup and delivery
- Turn-by-turn directions
- Location permissions handling

### Earnings
- Daily/Weekly/Monthly earnings tracking
- Earnings charts (Bar and Line charts)
- Payment history
- Earnings summary statistics

### Profile
- Update personal information
- Vehicle information management
- Online/Offline toggle
- Account settings

### PWA Features
- Installable app
- Offline support with service worker
- Install prompt
- Responsive design for mobile and desktop

## Architecture

The app follows a feature-based architecture with clear separation of concerns:

- **Features**: Self-contained modules with components, hooks, services, and stores
- **Shared**: Reusable components, utilities, and constants
- **Services**: API client and authentication utilities
- **State Management**: Zustand for global state, TanStack Query for server state

## Best Practices

- TypeScript for type safety
- Feature-based folder structure
- Custom hooks for reusable logic
- Error boundaries for error handling
- Loading states and skeleton loaders
- Responsive design (mobile-first)
- Accessibility considerations
- Code splitting and lazy loading

## License

MIT
