# Apex Studio Portfolio Website

## Overview

This is a modern, interactive portfolio website for a creative design studio called "Apex Studio" that specializes in UI/UX and graphic design. The application is built as a full-stack web application with a React frontend and Express.js backend, featuring a sleek dark theme with animations and interactive elements.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state
- **Build Tool**: Vite for development and bundling
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ESM modules
- **Development**: tsx for TypeScript execution
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)

### Design System
- **Component Library**: shadcn/ui with "new-york" style
- **Theme**: Dark theme with blue accent colors
- **Typography**: Inter and Space Grotesk fonts
- **Icons**: Lucide React icon library

## Key Components

### Frontend Components
1. **Layout Components**
   - `FloatingNavigation`: Sticky navigation with smooth scrolling
   - `CustomCursor`: Interactive cursor effects
   - `ParticleBackground`: Animated background particles

2. **Section Components**
   - `HeroSection`: Main landing area with call-to-action
   - `WorkShowcase`: Portfolio gallery with project cards
   - `ProcessSection`: Step-by-step process explanation
   - `TestimonialsSection`: Client reviews and feedback
   - `AboutSection`: Company information
   - `ContactSection`: Contact form with validation
   - `Footer`: Site footer with navigation links

3. **Interactive Features**
   - Magnetic hover effects on buttons
   - Scroll-based reveal animations
   - Smooth scrolling navigation
   - Custom cursor animations
   - Breathing animations on UI elements

### Backend Structure
- **Routes**: Modular route registration system
- **Storage**: Pluggable storage interface with in-memory implementation
- **Database**: Drizzle ORM with PostgreSQL schema
- **Development**: Vite integration for hot module replacement

## Data Flow

### Client-Side Data Flow
1. User interactions trigger React component state changes
2. Form submissions use React Hook Form with Zod validation
3. API requests are managed through TanStack React Query
4. UI state is managed locally within components
5. Navigation state is tracked for active section highlighting

### Server-Side Data Flow
1. Express.js handles HTTP requests
2. Route handlers interact with storage interface
3. Database operations use Drizzle ORM
4. Responses are formatted as JSON
5. Error handling middleware processes exceptions

### Animation System
1. Intersection Observer API detects element visibility
2. CSS classes are dynamically applied for animations
3. Magnetic effects use mouse position calculations
4. Particle system runs on requestAnimationFrame

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React, React DOM
- **Styling**: Tailwind CSS, class-variance-authority, clsx
- **Forms**: React Hook Form, @hookform/resolvers
- **Validation**: Zod, drizzle-zod
- **Icons**: Lucide React
- **Animations**: Embla Carousel for carousels
- **Utilities**: date-fns for date handling

### Backend Dependencies
- **Server**: Express.js
- **Database**: Drizzle ORM, @neondatabase/serverless
- **Development**: tsx, esbuild for building
- **Session**: connect-pg-simple for PostgreSQL sessions

### Development Tools
- **Build**: Vite with React plugin
- **TypeScript**: Full TypeScript support
- **Linting**: Built-in type checking
- **Development**: Hot module replacement via Vite

## Deployment Strategy

### Build Process
1. Frontend builds using Vite to `dist/public`
2. Backend builds using esbuild to `dist/index.js`
3. Static assets are served from the build output
4. Production uses Node.js to serve the bundled application

### Environment Configuration
- **Development**: Uses tsx for TypeScript execution
- **Production**: Uses compiled JavaScript bundle
- **Database**: Requires `DATABASE_URL` environment variable
- **Static Files**: Served by Express in production, Vite in development

### Database Setup
- PostgreSQL database via Neon (serverless)
- Schema migrations managed by Drizzle Kit
- Push schema changes with `npm run db:push`
- Connection pooling handled by Neon driver

### Hosting Considerations
- **Frontend**: Static files can be served by any web server
- **Backend**: Requires Node.js runtime environment
- **Database**: External PostgreSQL service (Neon)
- **Assets**: Bundled with the application

## Changelog
- July 01, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.