# DxNavigator

DxNavigator is a clinical reasoning workspace for structured diagnostic evaluation.

The goal is not to generate diagnoses with AI. The goal is to help clinicians externalize reasoning through complaint-driven workflows: structured history, red flags, differentials, workup, real-time HPI generation, presets, calculators, and management guides.

## Current Capabilities

- Email/password authentication and Google login
- Cookie-based authenticated private workspace
- User-specific workflow library
- Example workflows copied into new accounts
- Workflow builder with import/export, preview, save, publish, and validation
- Marketplace install/publish flow for workflows
- Workflow presets for quickly loading common form states
- Real-time HPI/narrative generation with Liquid templates
- Clinical guidance cards and source-figure links inside workflows
- Clinical calculators, including ED-oriented scores and infusion conversion
- Management guide section, currently seeded with DKA
- Light/dark theme and English/Portuguese app chrome
- Docker-based local development with PostgreSQL
- Playwright E2E smoke test for the workflow builder path

## Tech Stack

- Frontend: Vue 3, TypeScript, Vite
- Backend: ASP.NET Core 9, Entity Framework Core, ASP.NET Identity
- Database: PostgreSQL
- Infrastructure: Docker Compose
- Template engine: LiquidJS for workflow narrative generation
- E2E: Playwright

## Application Flow

1. A user registers or logs in.
2. The backend ensures example workflows are copied to the user's library if the account has no workflows.
3. The private workspace loads saved user workflows from the backend.
4. Opening a workflow creates a workflow session in the frontend.
5. User answers are stored in the session.
6. The workflow's Liquid HPI template renders a live clinical note preview.
7. Presets can replace the current answer state for rapid consultation.
8. Workflows can be edited in the builder and saved back to the backend.
9. Saved workflows can be published as marketplace snapshots.
10. Marketplace workflows can be installed as editable user copies.

## Run Locally

Create a local environment file:

```sh
cp .env.example .env
```

Start the full stack:

```sh
docker compose up -d --build
```

Open:

```text
http://localhost:5173
```

The frontend dev server proxies `/api` requests to the backend container.

## Common Docker Commands

Rebuild after pulling code changes:

```sh
docker compose up -d --build
```

Restart without rebuilding:

```sh
docker compose up -d
```

Reset the local database completely:

```sh
docker compose down --volumes
docker compose up -d --build
```

Warning: `down --volumes` deletes the local PostgreSQL data volume.

## Tests

Run frontend build/type-check:

```sh
docker compose exec frontend npm run build
```

Run E2E tests:

```sh
docker compose exec frontend npm run test:e2e
```

The current E2E test covers registration, builder workflow creation, preview rendering, and save-to-backend.

## Important Paths

- `frontend/src/views/private/WorkflowBuilderView.vue`  
  Coordinates the workflow builder UI.

- `frontend/src/workflow-builder/`  
  Builder draft models, import mapping, preview conversion, selectors, and validation helpers.

- `frontend/src/data/workflow.ts`  
  Runtime workflow/session model and Liquid HPI rendering.

- `frontend/src/views/private/ComplaintView.vue`  
  Main clinical workflow screen.

- `frontend/src/calculators/`  
  Hardcoded clinical calculators and calculator components.

- `frontend/src/management/`  
  Hardcoded management guide registry.

- `backend/Endpoints/`  
  Auth, user workflow, marketplace, and preset endpoints.

- `backend/SeedData/example-workflows.json`  
  Example workflows copied into new user accounts.

- `docs/architecture_decisions.md`  
  Architecture decisions and reasoning.

## Workflow Architecture

Workflows are treated as clinical content artifacts. A workflow has title, slug, language, sections, fields, guidance content, presets, and an HPI template.

In the current implementation:

- Example workflows are seeded into `ExampleWorkflows`.
- New users receive copies in `UserWorkflows`.
- Published marketplace workflows are snapshots.
- Installed marketplace workflows become editable user copies.
- Workflow definitions are stored as JSONB so the clinical schema can evolve before being over-normalized.

## Development Philosophy

DxNavigator intentionally avoids premature platform complexity. No Kubernetes, microservices, message brokers, CQRS, or AI agents are part of the core architecture right now.

The project is optimized for a strong vertical slice: clinical workflow authoring, structured data collection, narrative generation, and practical decision-support surfaces.

