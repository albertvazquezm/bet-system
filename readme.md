# Betting System Monorepo

This monorepo includes a NodeJS API using Express, a NextJS app that consumes the API and a shared package for DTOs.

As the project has been created using a very limited amount of time, there are key features missing for any production application. They are listed in the [Missing Features](#missing-features) section.

The rest of the features required for the project are implemented.

## Features

- [x] DB Seeding
- [x] CRUD API for events under /api/events with validation using Zod
- [x] Basic logging system on the API, including winston abstraction and request error logs.
- [x] NextJS app to list events and place bets (using Next parallel routes for UX)
- [x] Comprehensive error handling on App: Error toast for common errors and a custom error boundary with request retry functionality.
- [x] Shared DTO package with zod schemas and types, to allow filter implementation and typescript support on App and API.
- [x] Mobile responsive design (basic implementation)
- [x] Dockerfiles for production deployment of API and APP

## Setup

```bash
npm install
```

## Development

Run the API, App and DTO package in development mode:

```bash
npm run dev:all
```

Run the API in development mode:
(Remember to have a DB running and the DTO package built)

```bash
npm run dev:api
```

Run the app in development mode:
(Remember to have the DTO package built)

```bash
npm run dev:app
```

## Production

### Docker

Both the API and APP have dockerfiles that can be used to build the production images.

```bash
docker build -t betting-system-api -f packages/api/Dockerfile .
docker build -t betting-system-app -f packages/app/Dockerfile .
```

To run the production images, you can use the following commands:

Added the DB_HOST environment variable to the API container to allow the container to connect to the DB running on the host.
```bash
docker run -e DB_HOST=host.docker.internal -p 4000:4000 betting-system-api
docker run -p 3000:3000 betting-system-app
```

## Missing Features

- [ ] Authentication and security
- [ ] Unit and end to end tests
- [ ] Better SSR support for the frontend
- [ ] Modal URLs don't support refresh (some config would be needed to support it)
