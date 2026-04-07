# MANUAL - Huong Dan Su Dung Du An

## 1. Tong Quan

Day la du an web ban hang fullstack theo mo hinh monorepo:

- `front_end`: Angular + Tailwind CSS
- `back_end`: Spring Boot + PostgreSQL + JWT
- Root: Docker Compose quan ly toan bo he thong

Muc tieu: chay nhanh local, de mo rong, co san auth, cart, order, admin.

## 2. Cau Truc Thu Muc Chinh

```text
.
├── front_end/
├── back_end/
├── docker-compose.yml
├── .env.example
├── README.md
├── MANUAL.md
└── AGENTS.md
```

## 3. Yeu Cau Moi Truong

Can cai dat:

- Docker
- Docker Compose v2+

Khong bat buoc cai Node/Maven neu chi chay bang Docker.

## 4. Cau Hinh Bien Moi Truong

Tu root project:

```bash
cp .env.example .env
```

Mo file `.env` va sua gia tri neu can:

- `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`
- `BACKEND_PORT`, `FRONTEND_PORT`, `POSTGRES_PORT`
- `JWT_SECRET`, `JWT_EXPIRATION_MS`
- `CORS_ALLOWED_ORIGINS`

## 5. Chay Toan Bo He Thong Bang Docker

Tu root:

```bash
docker compose up --build
```

Sau khi chay:

- Frontend: `http://localhost:4200`
- Backend: `http://localhost:8080`
- PostgreSQL: `localhost:5432`

Dung:

```bash
docker compose down
```

Xoa volume DB:

```bash
docker compose down -v
```

## 6. Chay Tung Service Rieng

### 6.1 Chi chay PostgreSQL

```bash
docker compose up -d postgres
```

### 6.2 Chay Backend rieng

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

### 6.3 Chay Frontend rieng

```bash
cd front_end
docker build -t shop-frontend .
docker run --rm -p 4200:80 shop-frontend
```

## 7. Tai Khoan Seed Mac Dinh

He thong seed san admin:

- Email: `admin@shop.com`
- Password: `Admin@123`

Category va Product mau cung duoc seed luc backend khoi dong.

## 8. Luong Nghiep Vu Co Ban

### User

1. Dang ky tai khoan
2. Dang nhap nhan JWT
3. Xem danh sach/chi tiet san pham
4. Them vao gio hang
5. Dat hang

### Admin

1. CRUD Category
2. CRUD Product
3. Xem danh sach don hang
4. Cap nhat trang thai don hang

## 9. API Chinh

Tat ca response theo format:

```json
{
  "success": true,
  "message": "text",
  "data": {},
  "timestamp": "2026-04-07T00:00:00Z"
}
```

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

### Public

- `GET /api/categories`
- `GET /api/products?page=0&size=10&search=&categoryId=&sortBy=name&sortDir=asc`
- `GET /api/products/{id}`

### User (can JWT)

- `GET /api/cart`
- `POST /api/cart/items`
- `PUT /api/cart/items/{itemId}`
- `DELETE /api/cart/items/{itemId}`
- `POST /api/orders`
- `GET /api/orders/me`

### Admin (ROLE_ADMIN)

- `POST /api/admin/categories`
- `PUT /api/admin/categories/{id}`
- `DELETE /api/admin/categories/{id}`
- `POST /api/admin/products`
- `PUT /api/admin/products/{id}`
- `DELETE /api/admin/products/{id}`
- `GET /api/admin/orders`
- `PATCH /api/admin/orders/{id}/status`

## 10. Huong Dan Test Nhanh Bang cURL

### 10.1 Dang nhap admin

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@shop.com","password":"Admin@123"}'
```

Lay `token` trong `data.token`.

### 10.2 Goi API admin co token

```bash
curl http://localhost:8080/api/admin/orders \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 11. Frontend Notes

- JWT duoc gan qua `auth.interceptor.ts`
- Guard:
  - `auth.guard.ts`: yeu cau dang nhap
  - `admin.guard.ts`: yeu cau ROLE_ADMIN
- Environment API:
  - `src/environments/environment.ts`
  - `src/environments/environment.prod.ts`

## 12. Backend Notes

- Layered architecture:
  - `controller -> service -> repository`
- Validation qua Jakarta Validation
- Exception tap trung qua `GlobalExceptionHandler`
- Security JWT stateless
- CORS doc tu bien moi truong

## 13. Xu Ly Loi Thuong Gap

### Loi CORS

- Kiem tra `CORS_ALLOWED_ORIGINS` trong `.env`
- Dam bao dung host frontend dang truy cap

### Backend khong ket noi DB

- Kiem tra `POSTGRES_*` trong `.env`
- Kiem tra container postgres da healthy chua:

```bash
docker compose ps
```

### Frontend khong goi duoc API

- Kiem tra backend da run cong `8080`
- Kiem tra environment API URL trong frontend

## 14. Checklist Trien Khai Co Ban

1. Doi `JWT_SECRET` manh hon
2. Doi mat khau DB
3. Set `CORS_ALLOWED_ORIGINS` dung domain production
4. Them logging, monitoring, backup DB
5. Them migration tool (Flyway/Liquibase) cho production

