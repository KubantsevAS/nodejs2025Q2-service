# Home Library Service

## Summary

Home Library Service is a RESTful API built with NestJS that provides a comprehensive solution for managing a personal music collection. The service allows users to organize and manage their Artists, Albums, and Tracks, with the ability to create custom favorites lists.

### Key Features

- 🎵 Complete music collection management (Artists, Albums, Tracks)
- ⭐ Favorites system for personal collections
- 📚 PostgreSQL database with Prisma ORM
- 🐳 Docker containerization for easy deployment
- 📝 OpenAPI/Swagger documentation
- ✅ Comprehensive testing suite with Jest
- 🔒 Input validation and error handling

### Tech Stack

- **Backend**: NestJS v10.4
- **Database**: PostgreSQL with Prisma ORM
- **Containerization**: Docker & Docker Compose
- **Documentation**: OpenAPI/Swagger
- **Testing**: Jest
- **Node.js**: v22.14.0+

### Quick Start with docker

```bash
# Clone the repository
git clone https://github.com/KubantsevAS/nodejs2025Q2-service.git
cd nodejs2025Q2-service

# Set up environment variables
cp .env.example .env

# Start the application with Docker
docker-compose up
```

The service will be available at `http://localhost:4000` with API documentation at `http://localhost:4000/doc/`

## Table of Contents

- [Home Library Service](#home-library-service)
  - [Summary](#summary)
    - [Key Features](#key-features)
    - [Tech Stack](#tech-stack)
    - [Quick Start with docker](#quick-start-with-docker)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Quick Start](#quick-start)
    - [Using Docker (Recommended)](#using-docker-recommended)
    - [Docker Hub Image](#docker-hub-image)
    - [Manual Installation](#manual-installation)
  - [Docker Commands](#docker-commands)
    - [Basic Commands](#basic-commands)
    - [Development Commands](#development-commands)
  - [Database Management](#database-management)
    - [Accessing the Database](#accessing-the-database)
    - [Database Structure](#database-structure)
  - [API Documentation](#api-documentation)
    - [Available Endpoints](#available-endpoints)
      - [Users](#users)
      - [Artists](#artists)
      - [Albums](#albums)
      - [Tracks](#tracks)
      - [Favorites](#favorites)
  - [Development](#development)
    - [Testing](#testing)
    - [Code Quality](#code-quality)
    - [Debugging](#debugging)
  - [Project Structure](#project-structure)
  - [Troubleshooting](#troubleshooting)
    - [Common Issues](#common-issues)
  - [Production Deployment](#production-deployment)
  - [License](#license)

## Description

A Home Library Service built with NestJS that allows users to manage their music collection. Users can create, read, update, and delete data about Artists, Tracks, and Albums, and add them to Favorites in their own Home Library. The service provides a RESTful API with comprehensive OpenAPI documentation.

## Features

- CRUD operations for Artists, Albums, and Tracks
- Favorites management
- OpenAPI/Swagger documentation
- Input validation
- Error handling
- Unit and E2E testing
- Docker containerization
- PostgreSQL database with Prisma ORM
- Security audit scripts

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads)
- Node.js (v20.11.1 or higher) - [Download & Install Node.js](https://nodejs.org/en/download/)
- npm (comes with Node.js)
- Docker - [Download & Install Docker](https://docs.docker.com/get-docker/)
- Docker Compose - [Download & Install Docker Compose](https://docs.docker.com/compose/install/)

## Quick Start

### Using Docker (Recommended)

1. Clone the repository:

    ```bash
    git clone https://github.com/KubantsevAS/nodejs2025Q2-service.git
    cd nodejs2025Q2-service
    ```

2. Set up environment variables:

    ```bash
    # Copy the example environment file
    cp .env.example .env
    
    # Edit .env with your actual values
    nano .env  # or use your preferred text editor
    ```

    The `.env` file should contain the following variables (example values shown):

    ```env
    # Application
    PORT=4000
    NODE_ENV=development

    # Database
    POSTGRES_USER=your_username
    POSTGRES_PASSWORD=your_password
    POSTGRES_DB=your_database
    POSTGRES_PORT=5432
    POSTGRES_HOST=db

    # Database URL
    DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}
    ```

    Make sure to replace the example values with your actual configuration.

3. Start the application:

```bash
# Development mode
docker-compose up

# Or in detached mode
docker-compose up -d
```

The application will be available at `http://localhost:4000`

### Docker Hub Image

You can pull the latest image directly from Docker Hub:

```bash
docker pull henry173/nodejs2025q2-service-web:latest
```

Or use it in your docker-compose.yml:

```yaml
services:
  app:
    image: henry173/nodejs2025q2-service-web:latest
    ports:
      - "4000:4000"
```

[View on Docker Hub](https://hub.docker.com/r/henry173/nodejs2025q2-service-web)

### Manual Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/KubantsevAS/nodejs2025Q2-service.git
    cd nodejs2025Q2-service
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create `.env` file (see above)

4. Start the application:

    ```bash
    # Development mode
    npm run start:dev

    # Production mode
    npm run build
    npm run start:prod
    ```

## Docker Commands

### Basic Commands

```bash
# Build image
docker build -t home-library .

# Run container
docker run -p 4000:4000 --name home-library-container home-library

# Build and run with docker-compose
docker-compose up --build

# Stop containers
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Development Commands

```bash
# Start in development mode
docker-compose up --build

# Rebuild without cache
docker-compose build --no-cache

# View logs
docker-compose logs -f
```

## Database Management

### Accessing the Database

```bash
# Connect to database
docker-compose exec db psql -U postgres

# Check database status
docker-compose exec db pg_isready -U postgres
```

### Database Structure

- PostgreSQL 14
- Prisma ORM for database operations
- Data persisted in Docker volume
- Automatic migrations on startup
- Health checks enabled
- Maximum connections: 1000

## API Documentation

Access the OpenAPI documentation at: `http://localhost:4000/doc/`

### Available Endpoints

#### Users

- `GET /user` - Get all users
- `GET /user/:id` - Get user by ID
- `PUT /user/:id` - Update user
- `DELETE /user/:id` - Delete user

#### Artists

- `GET /artist` - Get all artists
- `GET /artist/:id` - Get artist by ID
- `POST /artist` - Create new artist
- `PUT /artist/:id` - Update artist
- `DELETE /artist/:id` - Delete artist

#### Albums

- `GET /album` - Get all albums
- `GET /album/:id` - Get album by ID
- `POST /album` - Create new album
- `PUT /album/:id` - Update album
- `DELETE /album/:id` - Delete album

#### Tracks

- `GET /track` - Get all tracks
- `GET /track/:id` - Get track by ID
- `POST /track` - Create new track
- `PUT /track/:id` - Update track
- `DELETE /track/:id` - Delete track

#### Favorites

- `GET /favs` - Get all favorites
- `POST /favs/track/:id` - Add track to favorites
- `POST /favs/album/:id` - Add album to favorites
- `POST /favs/artist/:id` - Add artist to favorites
- `DELETE /favs/track/:id` - Remove track from favorites
- `DELETE /favs/album/:id` - Remove album from favorites
- `DELETE /favs/artist/:id` - Remove artist from favorites

## Development

### Testing

```bash
# Run all tests
npm run test

# Run specific test suite
npm run test -- <path-to-suite>
```

### Code Quality

```bash
# Linting
npm run lint

# Formatting
npm run format

# Security audit
npm run security:audit

# Fix security issues
npm run security:audit:fix
```

### Debugging

- Press `F5` in VSCode to start debugging
- For more information: [VSCode Debugging](https://code.visualstudio.com/docs/editor/debugging)

## Project Structure

```yaml
src/
├── main.ts              # Application entry point
├── app.module.ts        # Root module
├── app.controller.ts    # Root controller
├── app.service.ts       # Root service
├── user/                # Users module
├── artist/              # Artists module
├── album/               # Albums module
├── track/               # Tracks module
└── favs/                # Favorites module

prisma/
├── schema.prisma        # Database schema
└── migrations/          # Database migrations

test/
├── auth.e2e-spec.ts     # Authentication tests
└── refresh.e2e-spec.ts  # Refresh token tests
```

## Troubleshooting

### Common Issues

1. **Database Connection Issues**

    ```bash
    # Check database logs
    docker-compose logs db

    # Check application logs
    docker-compose logs web
    ```

2. **Container Issues**

    ```bash
    # Check container status
    docker-compose ps

    # Restart containers
    docker-compose restart
    ```

3. **Reset Everything**

    ```bash
    # Stop and remove everything
    docker-compose down -v

    # Rebuild and start
    docker-compose up --build
    ```

## Production Deployment

For production deployment:

1. Use production Dockerfile
2. Set appropriate environment variables
3. Use proper secrets management
4. Configure proper logging
5. Set up monitoring

Example production deployment:

```bash
# Build production image
docker build -t home-library:prod .

# Run with production environment
docker run -d \
  -p 4000:4000 \
  -e NODE_ENV=production \
  -e DATABASE_URL=your_production_db_url \
  --name home-library-prod \
  home-library:prod
```

## License

UNLICENSED
