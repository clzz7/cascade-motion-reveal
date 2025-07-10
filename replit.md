# replit.md

## Overview

This is a full-stack TypeScript application built with React frontend and Express.js backend, featuring AI-focused landing page content and modern web development practices. The project uses a monorepo structure with shared components and utilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **State Management**: React Query (@tanstack/react-query) for server state
- **Routing**: React Router for client-side navigation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Development**: Hot reload with Vite integration in development mode

### Database Layer
- **Primary Database**: PostgreSQL (configured via Neon serverless)
- **ORM**: Drizzle ORM with schema-first approach
- **Migrations**: Drizzle Kit for database migrations
- **Schema Location**: `shared/schema.ts` for type safety across frontend/backend

## Key Components

### Frontend Components
- **Landing Page Sections**: Hero, Services, Work, Testimonials, CTA, Footer
- **Interactive Elements**: Loading screen with animated cards, scroll reveal animations
- **UI System**: Complete shadcn/ui component library implementation
- **Custom Hooks**: `useScrollReveal` for intersection observer animations, `useIsMobile` for responsive behavior

### Backend Components
- **Storage Interface**: Abstracted storage layer with in-memory implementation
- **Route System**: Modular route registration in `server/routes.ts`
- **Development Server**: Vite integration for SSR-like development experience
- **Error Handling**: Centralized error middleware

### Shared Components
- **Database Schema**: User model with username/password fields
- **Type Safety**: Shared TypeScript types between frontend and backend
- **Validation**: Zod schema validation with Drizzle integration

## Data Flow

1. **Client Requests**: React frontend makes API calls to Express backend
2. **API Layer**: Express routes handle requests with proper error handling
3. **Storage Layer**: Abstract storage interface allows switching between implementations
4. **Database Operations**: Drizzle ORM handles PostgreSQL interactions
5. **Response Flow**: JSON responses with consistent error handling

## External Dependencies

### Core Dependencies
- **Database**: Neon PostgreSQL serverless
- **UI Framework**: Radix UI primitives for accessibility
- **Icons**: Lucide React for consistent iconography
- **Forms**: React Hook Form with Hookform resolvers
- **Styling**: Tailwind CSS with class-variance-authority for component variants

### Development Dependencies
- **Build Tools**: Vite, esbuild for production builds
- **TypeScript**: Full type safety across the stack
- **Development**: tsx for TypeScript execution, Replit integration plugins

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds to `dist/public` directory
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations managed via `drizzle-kit push`

### Environment Configuration
- **Development**: `NODE_ENV=development` with Vite dev server
- **Production**: `NODE_ENV=production` with static file serving
- **Database**: `DATABASE_URL` environment variable required

### Hosting Considerations
- **Static Assets**: Frontend built to `dist/public` for static serving
- **Server**: Express server serves both API and static files in production
- **Database**: PostgreSQL connection via Neon serverless platform
- **Replit Integration**: Custom Vite plugins for Replit development environment

### Scripts
- `npm run dev`: Development with hot reload
- `npm run build`: Production build for both frontend and backend
- `npm start`: Production server startup
- `npm run db:push`: Apply database schema changes