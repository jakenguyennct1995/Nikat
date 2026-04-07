# AGENTS - Rules, Architecture, Requirements

Tai lieu nay dinh nghia quy tac cho AI agents/developers khi phat trien tiep du an.

## 1. Muc Tieu

- Duy tri codebase ro rang, production-ready baseline, de mo rong.
- Dong bo quy tac khi generate code moi.
- Giu kien truc nhat quan giua frontend/backend.

## 2. Monorepo Convention

- Root gom 2 thu muc chinh:
  - `front_end`
  - `back_end`
- Root quan ly runtime bang `docker-compose.yml`.
- Moi thay doi lon phai cap nhat tai lieu:
  - `README.md`
  - `MANUAL.md`
  - Neu lien quan quy tac -> cap nhat `AGENTS.md`.

## 3. Architecture Rules

## 3.1 Backend (Spring Boot)

Bat buoc dung layered architecture:

1. `controller`: nhan/tra HTTP
2. `service`: xu ly business logic
3. `repository`: truy cap du lieu

Khong viet business logic trong controller.
Khong tra entity truc tiep ra API, phai qua DTO.

Package chuan:

- `config`
- `controller`
- `dto`
- `entity`
- `repository`
- `service`
- `security`
- `exception`
- `mapper`

## 3.2 Frontend (Angular)

- Uu tien standalone components.
- Chia tach ro:
  - `core/models`
  - `core/services`
  - `core/guards`
  - `core/interceptors`
  - `layout`
  - `pages`
- Khong hard-code API URL trong component; dung `environment`.
- API call phai di qua service.

## 4. Security Rules

- JWT auth bat buoc cho endpoint protected.
- Role-based authorization:
  - `ROLE_USER`
  - `ROLE_ADMIN`
- Frontend phai attach JWT bang interceptor.
- Guard frontend:
  - route user -> `auth.guard`
  - route admin -> `admin.guard`

Khong commit secret that.
Tat ca thong so nhay cam phai dua vao `.env`.

## 5. API Design Rules

- REST path dung tieng Anh.
- Response format thong nhat:
  - `success`
  - `message`
  - `data`
  - `timestamp`
- Product list bat buoc ho tro:
  - pagination
  - search theo ten
  - filter theo category
  - sort theo name/price

Khi them endpoint moi:

1. Tao request/response DTO
2. Validate input
3. Bo sung exception handler neu can
4. Cap nhat README/MANUAL

## 6. Data Rules

Entities hien tai:

- User
- Role
- Product
- Category
- Cart
- CartItem
- Order
- OrderItem

Khi them quan he moi:

- Dinh nghia ro fetch/cascade
- Tranh loop JSON
- Khong de pha vo luong order/cart hien co

## 7. Docker & Runtime Rules

- Moi service phai co Dockerfile rieng.
- `docker compose up --build` phai run duoc full stack.
- PostgreSQL bat buoc co volume persist.
- Uu tien co healthcheck cho service quan trong.
- Cong mac dinh:
  - frontend: `4200` (host) -> `80` (container)
  - backend: `8080`
  - postgres: `5432`

## 8. Coding Standards

- Ten file, class, API path, bien: tieng Anh.
- Comment ngan gon, chuyen nghiep.
- Truoc khi merge:
  - khong de code chet
  - khong de debug logs vo nghia
  - giu formatting nhat quan

## 9. Requirement Checklist Khi Generate Code

Moi feature moi phai check:

1. Co dung architecture khong?
2. Co DTO + validation chua?
3. Co xu ly loi/exception chua?
4. Co security phu hop role chua?
5. Co cap nhat API docs (README/MANUAL) chua?
6. Co anh huong docker/env khong?
7. Frontend da co loading/error state chua?

## 10. Non-Functional Requirements

- De test local nhanh.
- De maintain, de onboard.
- De mo rong them payment, inventory, shipping.
- San sang nang cap them:
  - migration tool (Flyway/Liquibase)
  - refresh token
  - unit/integration tests
  - observability stack

## 11. Forbidden Patterns

- Viet query SQL truc tiep trong controller.
- Return stacktrace noi bo cho client.
- Hard-code secrets vao source code.
- Goi API truc tiep trong nhieu component neu da co service dung chung.
- Thay doi architecture ma khong cap nhat AGENTS.md.

## 12. Change Management

Khi thay doi lon:

1. Cap nhat `AGENTS.md` neu quy tac thay doi
2. Cap nhat `MANUAL.md` neu cach su dung thay doi
3. Cap nhat `README.md` neu command/endpoint thay doi

