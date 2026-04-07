# Fullstack E-commerce Monorepo

Production-ready baseline monorepo for an e-commerce system:

- `front_end`: Angular + Tailwind CSS
- `back_end`: Spring Boot + PostgreSQL + JWT
- Root-level Docker Compose to run the full stack

## Project Structure

```text
.
├── back_end
├── front_end
├── docker-compose.yml
├── .env.example
└── README.md
```

## Prerequisites

- Docker
- Docker Compose (v2+)

## Quick Start With Docker

1. Copy environment file:

```bash
cp .env.example .env
```

2. Build and start all services:

```bash
docker compose up --build
```

3. Open applications:

- Frontend: `http://localhost:4200`
- Backend API: `http://localhost:8080`
- PostgreSQL: `localhost:5432`

## Run Services Individually

### PostgreSQL only

```bash
docker compose up -d postgres
```

### Backend only

```bash
cd back_end
docker build -t shop-backend .
docker run --rm -p 8080:8080 \
  -e DB_HOST=host.docker.internal \
  -e DB_PORT=5432 \
  -e DB_NAME=shopdb \
  -e DB_USER=shop_user \
  -e DB_PASSWORD=shop_pass \
  -e JWT_SECRET=change_this_secret_key_for_production_change_this_secret_key \
  -e CORS_ALLOWED_ORIGINS=http://localhost:4200 \
  shop-backend
```

### Frontend only

```bash
cd front_end
docker build -t shop-frontend .
docker run --rm -p 4200:80 shop-frontend
```

## Seeded Admin Account

- Email: `admin@shop.com`
- Password: `Admin@123`

## Core Backend Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

### Public catalog

- `GET /api/categories`
- `GET /api/products?page=0&size=10&search=&categoryId=&sortBy=name&sortDir=asc`
- `GET /api/products/{id}`

### User

- `GET /api/cart`
- `POST /api/cart/items`
- `PUT /api/cart/items/{itemId}`
- `DELETE /api/cart/items/{itemId}`
- `POST /api/orders`
- `GET /api/orders/me`

### Admin

- `POST /api/admin/products`
- `PUT /api/admin/products/{id}`
- `DELETE /api/admin/products/{id}`
- `POST /api/admin/categories`
- `PUT /api/admin/categories/{id}`
- `DELETE /api/admin/categories/{id}`
- `GET /api/admin/orders`
- `PATCH /api/admin/orders/{id}/status`

## Notes

- All API responses use a unified wrapper: `{ success, message, data, timestamp }`.
- Product listing supports pagination, searching, filtering by category, and sorting.
- JWT token is attached from frontend via HTTP interceptor.
