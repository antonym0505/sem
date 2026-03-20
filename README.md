# Monorepo Template

A minimal polyglot monorepo: React/TypeScript frontend + FastAPI/Python backend.

## Stack

**Frontend**: React 18, TypeScript, Vite, Tailwind CSS v4, Sass, MUI v6, React Router v7, React Hook Form
**Backend**: Python 3.13, FastAPI, Pydantic v2, uv, ruff, mypy

## Prerequisites

- Node 20+
- Python 3.13+
- [uv](https://github.com/astral-sh/uv) — `curl -LsSf https://astral.sh/uv/install.sh | sh`

## Getting Started

```sh
make install
make dev
```

Starts frontend on http://localhost:5173 and backend on http://localhost:8000.

## Commands

```sh
make install       # Install all dependencies
make dev           # Run both servers in parallel
make dev-frontend  # Frontend only
make dev-backend   # Backend only
make lint          # Lint both
make format        # Format backend
make typecheck     # Type-check both
```

## Deployment (Railway)

Both services deploy independently.

- **Frontend service**: root directory → `/frontend`
- **Backend service**: root directory → `/backend`

Set env vars in Railway dashboard:
- Frontend: `VITE_API_URL=<backend public domain>`
- Backend: `ALLOWED_ORIGINS=["https://<frontend domain>"]`
