# DevLens

An engineering intelligence platform built to parse, map, and analyze repository architecture, dependencies, security vulnerabilities, and technical debt indicators.

## Architecture & Tech Stack

The application is structured as a modular React client built on a TypeScript + Vite runtime:

*   **State Management:** Global actions and repository contexts handled via Zustand stores.
*   **Visualizations:** Systems mapping rendered using React Flow canvases; telemetry metrics and progress charts plotted via Recharts.
*   **Styling:** Interface tokens and layouts configured natively in Tailwind CSS.
*   **Persistence:** Supabase Auth and database tables schema designed for user profiles, repository registers, and diagnostic analysis jobs logs.

## Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   npm (v9 or higher)

### Setup & Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Romeo-Bess/DevLens.git
   cd DevLens
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173/](http://localhost:5173/) to view the platform locally.

4. Build production assets:
   ```bash
   npm run build
   ```

## Testing

Execute unit test suites verifying store triggers and active analysis changes:
```bash
npx vitest run
```

## Database Schema

Database migrations and schema definitions are located in `supabase/migrations/`. You can find tables schemas and RLS setup defined in `init_schema.sql`.
