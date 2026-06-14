# Product Requirements Document (PRD) - DevLens SaaS Platform

## 1. Overview & Objective
DevLens is a production-ready, high-fidelity AI-powered GitHub repository intelligence platform. It helps engineering managers and senior architects understand complex codebase structures, dependencies, security vulnerabilities, and code quality in real-time.

## 2. Core Target Personas
- **Senior Software Architects:** Who need to keep codebase dependencies mapped, prevent circular references, and enforce clean domain routing boundaries.
- **Engineering Managers / Tech Leads:** Who need metrics tracking technical debt lost days, active CVE vulnerabilities feed, and onboarding walkthrough guides for new hires.

## 3. Product Features & Spec Checklist
- **Landing Page Sandbox Simulator:** Allows users to paste any public repo path and instantly view mock diagnostic scores and lines analyzed without authentication.
- **Bento Overview Dashboard:** Lists health score radial gauges, tech debt index sparklines, vulnerability indicators table (Critical/High), and target documentation coverage metrics.
- **Connected Repositories list:** Connects GitHub projects, validates repo urls, caches metadata (Stars, Forks, Size), and sets active context.
- **Architecture Visualizer Node Graph:** Renders Next.js, Go API, PostgreSQL, and Stripe webhook node connections supporting panning, zoom options, legends, and side property drawer.
- **Package Manifest Dependency Explorer:** Renders dependency topologies, version listings, and vulnerability advisory alerts.
- **Technical Debt metrics:** Highlights high cyclomatic complexity files, Lost Productivity Days monthly metrics, and quick-win refactoring target boards.
- **Security insights feed:** Details CVE lists, rate limiter rules checklists, and key checker statuses.
- **AI Assistant chat drawer:** Supports conversational queries ("Explain auth flow", "Find technical debt") linked to local store files context.

## 4. Technical Stack Constraints
- **Frontend:** React, TypeScript, Vite, Tailwind CSS v4, Zustand, React Flow, Recharts, and React Router.
- **Backend/Storage:** Supabase Authentication, Postgres tables database, Row Level Security (RLS) policies, and background scan jobs.

## 5. Security & Verification
- Enable RLS policies on all tables so users only read own data.
- Standard JWT token bearer checks on API calls.
- Automated code build checks using `tsc && vite build`.
