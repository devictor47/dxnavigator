# DxNavigator

DxNavigator is a clinical reasoning workspace designed to support physicians during diagnostic evaluation through structured, complaint-driven workflows.

The platform aims to externalize and organize clinical reasoning by guiding users through key history questions, red flags, differential diagnoses, physical examination findings, and recommended workups for common chief complaints.

## Vision

Clinical expertise is often acquired through years of training, repetition, and exposure to experienced mentors. DxNavigator seeks to make parts of that reasoning process explicit, structured, and reproducible.

Rather than acting as a diagnostic black box, DxNavigator focuses on helping clinicians think systematically and avoid overlooking critical information.

## Goals

- Structured evaluation of common chief complaints
- Diagnostic reasoning support
- Red flag identification
- Differential diagnosis organization
- Workup guidance
- Clinical knowledge representation

## Non-Goals

DxNavigator is not intended to be:

- An Electronic Medical Record (EMR)
- A prescription platform
- A billing system
- A replacement for clinical judgment
- A standalone AI diagnosis generator

## Initial Scope

The first iteration focuses on a small number of high-value chief complaints, starting with:

- Chest Pain

Future complaint modules may include:

- Dyspnea
- Syncope
- Abdominal Pain
- Headache
- Fever

## High-Level Architecture

```text
Vue 3 + TypeScript
        │
        ▼
ASP.NET Core
        │
        ▼
PostgreSQL
```

## Example Workflow

```text
Chief Complaint
    ↓
Structured History
    ↓
Red Flags
    ↓
Differential Diagnoses
    ↓
Suggested Workup
```

## Technology Stack

### Frontend

- Vue 3
- TypeScript
- Vite

### Backend

- ASP.NET Core
- Entity Framework Core

### Database

- PostgreSQL

### Infrastructure

- Docker
- Docker Compose

## Project Status

🚧 Early development

Current milestone:

- Establish development environment
- Define domain model
- Implement Chest Pain MVP

## License

TBD