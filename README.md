# 4seasons

A full-stack product prototype for presenting a VPN subscription service. The repository contains a public React marketing site and a Django API foundation.

> **Status:** prototype. The public interface is implemented; the backend is ready to be extended with authentication, subscriptions and payment-provider integrations.

## Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Django, Django REST Framework
- **Data:** PostgreSQL

## Repository structure

```text
frontend/     React and Vite client
backend/      Django project and API configuration
.env.example  local backend configuration template
```

## Run locally

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The Vite development server normally starts at `http://127.0.0.1:5173`.

### Backend

Use Python 3.11 or newer.

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp ../.env.example .env
python manage.py migrate
python manage.py runserver
```

The Django server runs at `http://127.0.0.1:8000` by default.

## Configuration

Copy `.env.example` before starting the backend. Configure a local PostgreSQL database through:

```env
DJANGO_SECRET=change-me
DJANGO_DEBUG=True
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB_NAME=db_name
```

Do not commit real secrets or production credentials.

## Quality checks

```bash
cd frontend
npm run lint
npm run build
```

## Roadmap

- Account authentication and subscription management
- Payment-provider integration
- VPN-service provisioning integration
- Backend tests and deployment configuration
