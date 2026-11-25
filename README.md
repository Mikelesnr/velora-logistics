# Velora Logistics — Laravel 13 + React 19 + Inertia v2 + Sanctum API

## Quick Start
```bash
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
npm install
npm run dev
```

## Seeded Demo Accounts (Password: `password`)
- **System Admin:** `admin@veloralogistics.local`
- **Shop / Institution Owner:** `owner@dhl-demo.local`
- **Driver / Courier:** `driver@dhl-demo.local`

## API Auth Endpoints (`/api/v1/auth/*`)
- `POST /api/v1/auth/login` (`email`, `password`, `device_name`)
- `POST /api/v1/auth/register` (supports optional client-generated `id` UUID for idempotency)
- `GET /api/v1/auth/me` (Bearer token or Inertia stateful session)
- `POST /api/v1/auth/logout`
- `POST /api/v1/auth/logout-all`

## Testing
```bash
./vendor/bin/pest
```
