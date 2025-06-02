# Home Library Service

## Description

This is a Home Library Service built with NestJS. Users can create, read, update, and delete data about Artists, Tracks, and Albums, and add them to Favorites in their own Home Library. The service provides a RESTful API with comprehensive OpenAPI documentation.

## Features

- CRUD operations for Artists, Albums, and Tracks
- Favorites management
- OpenAPI/Swagger documentation
- Input validation
- Error handling
- Unit and E2E testing

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads)
- Node.js (v22.14.0 or higher) - [Download & Install Node.js](https://nodejs.org/en/download/)
- npm (comes with Node.js)

## Installation

- Clone the repository:

```bash
git clone https://github.com/KubantsevAS/nodejs2025Q2-service.git
cd nodejs2025Q2-service
```

- Install dependencies:

```bash
npm install
```

- Create a `.env` file in the root directory with the following variables:

```env
PORT=4000
```

## Running the Application

```bash
npm run start
```

### Development mode

```bash
npm run start:dev
```

### Production mode

```bash
npm run build
npm run start:prod
```

The application will be available at `http://localhost:4000` (or the port specified in your .env file).

## API Documentation

Once the application is running, you can access the OpenAPI documentation at: <http://localhost:4000/doc/>

The documentation includes:

- All available endpoints
- Request/response schemas
- Example requests and responses

## API Endpoints

### Users

- `GET /user` - Get all users
- `GET /user/:id` - Get user by ID
- `PUT /user/:id` - Update user
- `DELETE /user/:id` - Delete user

### Artists

- `GET /artist` - Get all artists
- `GET /artist/:id` - Get artist by ID
- `POST /artist` - Create new artist
- `PUT /artist/:id` - Update artist
- `DELETE /artist/:id` - Delete artist

### Albums

- `GET /album` - Get all albums
- `GET /album/:id` - Get album by ID
- `POST /album` - Create new album
- `PUT /album/:id` - Update album
- `DELETE /album/:id` - Delete album

### Tracks

- `GET /track` - Get all tracks
- `GET /track/:id` - Get track by ID
- `POST /track` - Create new track
- `PUT /track/:id` - Update track
- `DELETE /track/:id` - Delete track

### Favorites

- `GET /favs` - Get all favorites
- `POST /favs/track/:id` - Add track to favorites
- `POST /favs/album/:id` - Add album to favorites
- `POST /favs/artist/:id` - Add artist to favorites
- `DELETE /favs/track/:id` - Remove track from favorites
- `DELETE /favs/album/:id` - Remove album from favorites
- `DELETE /favs/artist/:id` - Remove artist from favorites

## Testing

### Run all tests

```bash
npm run test
```

### Run tests with authentication

```bash
npm run test:auth
```

### Run specific test suite

```bash
npm run test -- <path-to-suite>
```

### Run specific test suite with authentication

```bash
npm run test:auth -- <path-to-suite>
```

## Code Quality

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

## Debugging

### VSCode

Press `F5` to start debugging.

For more information about debugging in VSCode, visit: <https://code.visualstudio.com/docs/editor/debugging>

## Project Structure

```yaml
src/
├── main.ts              # Application entry point
├── app.module.ts        # Root module
├── app.controller.ts    # Root controller
├── app.service.ts       # Root service
├── auth/               # Authentication module
├── users/              # Users module
├── artists/            # Artists module
├── albums/             # Albums module
├── tracks/             # Tracks module
└── favorites/          # Favorites module
```
