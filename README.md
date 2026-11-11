# School Admission System

A full-stack school admission application with a **backend API** and a **Frontend**, both run with Docker.

| Service  | URL                     |
| -------- | ----------------------- |
| Backend  | http://localhost:8080   |
| Frontend | http://localhost:3002   |

---

## Prerequisites

Make sure these are installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/) (included with Docker Desktop)

Verify the installation:

```bash
docker --version
docker compose version
```

---

## Backend Setup

### 1. Go to the backend folder

```bash
cd backend
```

### 2. Create a `.env` file

Create a file named `.env` in the backend root directory (next to `docker-compose.yml`) with the following content:

```dotenv
DATABASE_URL="Host=postgres;Port=5432;Database=schoolAdmission;Username=postgres;Password=123456"
HOLD_DURATION_SECONDS=60
DB_NAME=schoolAdmission
DB_USER=postgres
DB_PASSWORD=123456
```

> **Note:** Fill in `DB_NAME`, `DB_USER` and `DB_PASSWORD` before running. Keep them consistent with the values used in `DATABASE_URL`.

### 3. Build and run

```bash
docker compose up --build -d
```

Check running containers and logs:

```bash
docker compose ps
docker compose logs -f
```

---

## Frontend Setup

### 1. Go to the frontend folder

```bash
cd frontend
```

### 2. Create a `.env` file

Create a file named `.env` in the frontend root directory with the following content:

```dotenv
NEXT_PUBLIC_BASE_API=http://localhost:8080
```

### 3. Build and run

```bash
docker compose up --build -d
```

### 4. Open the app

After a successful run, open:

```
http://localhost:3002
```