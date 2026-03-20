.PHONY: install dev dev-frontend dev-backend lint format typecheck

install:
	cd frontend && npm install
	cd backend && uv sync

dev:
	make -j2 dev-frontend dev-backend

dev-frontend:
	cd frontend && npm run dev

dev-backend:
	cd backend && uv run uvicorn app.main:app --reload --port 8000

lint:
	cd frontend && npm run lint
	cd backend && uv run ruff check .

format:
	cd backend && uv run ruff format .

typecheck:
	cd frontend && npm run typecheck
	cd backend && uv run mypy .
