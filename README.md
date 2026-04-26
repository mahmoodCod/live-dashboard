# Live Dashboard Backend

A real-time order management backend built with NestJS, TypeScript, MySQL, and Socket.IO.
This project provides both HTTP and WebSocket interfaces for creating, tracking, and broadcasting coffee shop orders in real time.

## Why This Project

This backend is designed for live operational workflows where state changes must be visible immediately (for example: customer order submission and manager monitoring panels).

It focuses on:
- clear modular architecture
- real-time event delivery
- database-backed persistence
- clean foundation for scaling into production

## Core Features

- **Real-time updates** with Socket.IO namespace-based gateway (`orders-live`)
- **REST endpoint** for order creation
- **MySQL persistence** via TypeORM entities and repositories
- **Global configuration** with `.env` using `@nestjs/config`
- **CORS support** for local multi-client development
- **Simple frontend clients** for customer order creation and manager live monitoring

## Tech Stack

- NestJS 11
- TypeScript
- MySQL
- TypeORM
- Socket.IO
- ESLint + Prettier

## Project Structure

```text
src/
  app.module.ts
  main.ts
  dashboard/
    dashboard.gateway.ts
  order/
    entities/
      order.entity.ts
    order.module.ts
    order.controller.ts
    order.service.ts
    order.gateway.ts
coffee-coustomer.html
coffee-manager.html
```

## Architecture Overview

1. A customer submits a new order from `coffee-coustomer.html`.
2. The browser sends `POST /orders-live`.
3. `OrderController` calls `OrderService.createOrder(...)`.
4. `OrderService` persists the order in MySQL through TypeORM.
5. `OrderService` triggers `OrderGateway.emitNewOrder(...)`.
6. Connected manager clients on `orders-live` receive `newOrder` instantly.
7. On connection, managers also receive `initialOrders`.

## API and Events

### HTTP

- `POST /orders-live`
  - Creates a new order
  - Request body:

```json
{
  "productName": "Latte",
  "quantity": 2
}
```

### WebSocket (Namespace: `orders-live`)

- `initialOrders` -> emitted when a manager client connects
- `newOrder` -> emitted whenever a new order is created

## Environment Variables

Create a `.env` file in the project root. Typical values:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_NAME=live-dashboard
DB_SYNCHRONIZE=true
```

> Note: `DB_SYNCHRONIZE=true` is convenient for development but should usually be `false` in production.

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Start the backend

```bash
npm run start:dev
```

### 3) Open clients

- Open `coffee-coustomer.html` to create orders
- Open `coffee-manager.html` to watch live incoming orders

## Scripts

```bash
npm run start
npm run start:dev
npm run start:prod
npm run build
npm run lint
npm run test
npm run test:e2e
```

## Production Notes

For a production-ready deployment, consider:
- strict CORS allowlist (no wildcard)
- DTO validation with `class-validator` + `ValidationPipe`
- authentication and role-based authorization
- database migrations instead of synchronize
- centralized logging and monitoring
- rate limiting and security headers

## Roadmap

- Add full order lifecycle status transitions
- Add pagination and filtering for manager dashboard
- Add authentication for manager panel
- Add tests for order service, gateway, and controller
- Containerize with Docker and add CI pipeline
