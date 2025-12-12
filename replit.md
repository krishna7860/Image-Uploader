# replit.md

## Overview

This is a full-stack TypeScript web application for a multi-image upload component with drag-and-drop functionality. The project uses a React frontend with a modern component library and an Express backend with PostgreSQL database support. The primary feature is a media upload wizard that allows users to upload, reorder, and manage images with cover photo selection.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state management
- **Styling**: Tailwind CSS with CSS variables for theming (light/dark mode support)
- **Component Library**: shadcn/ui (Radix UI primitives with custom styling)
- **Build Tool**: Vite with hot module replacement

The frontend follows a component-based architecture with:
- Page components in `client/src/pages/`
- Reusable UI components in `client/src/components/ui/`
- Feature components in `client/src/components/`
- Custom hooks in `client/src/hooks/`
- Utility functions in `client/src/lib/`

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **API Pattern**: RESTful API with `/api` prefix convention
- **Session Management**: Express sessions with connect-pg-simple for PostgreSQL session storage

The backend uses a modular structure:
- `server/index.ts` - Application entry point and middleware setup
- `server/routes.ts` - API route definitions
- `server/storage.ts` - Data access layer with storage interface pattern
- `server/vite.ts` - Development server with Vite integration
- `server/static.ts` - Production static file serving

### Data Storage
- **Primary Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **ORM**: Drizzle ORM with schema defined in `shared/schema.ts`
- **Migrations**: Drizzle Kit for database migrations (output to `./migrations`)
- **Development Fallback**: In-memory storage implementation (MemStorage class)

### Shared Code
The `shared/` directory contains code shared between frontend and backend:
- `shared/schema.ts` - Drizzle database schema and Zod validation schemas
- Uses `drizzle-zod` for automatic schema-to-validator generation

### Build System
- **Development**: `tsx` for TypeScript execution with Vite dev server
- **Production Build**: Custom build script using esbuild for server bundling and Vite for client
- **Bundling Strategy**: Server dependencies are selectively bundled to reduce cold start times

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Database query builder and schema management
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI Component Libraries
- **Radix UI**: Complete set of accessible, unstyled UI primitives
- **shadcn/ui**: Pre-styled component library built on Radix
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel/slider functionality
- **Vaul**: Drawer component
- **cmdk**: Command palette component

### Form & Validation
- **React Hook Form**: Form state management
- **Zod**: Runtime type validation
- **@hookform/resolvers**: Zod integration for React Hook Form

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **clsx/tailwind-merge**: Class name utilities

### Development Tools
- **Vite**: Frontend build tool and dev server
- **TypeScript**: Type checking across the entire codebase
- **Drizzle Kit**: Database migration tooling