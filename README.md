# Walk the Line

## Street Photography Contest Platform

Welcome to Walk the Line, the ultimate platform for street photography enthusiasts. Our backend infrastructure powers an engaging and dynamic street photography contest where photographers from around the globe can showcase their talent in capturing the essence of everyday life.

# Folder Structure

The project follows an organized structure to facilitate maintenance and scalability. Below is the directory hierarchy in the `src` directory:

- **database**: Configuration for database connection.

  - `index.ts`: Contains the `connectToDatabase` function.

- **features**: Main functionalities of the project.

  - **ping**: Server availability check.
    - _controller_: `PingController.ts` with tests.
    - _router_: `PingRouter.ts` with tests.
  - **photos**: Photo management.
    - _controller_: `PhotosController.ts` with endpoint tests.
    - _mock_: Unit tests for photo-related mocks.
    - _model_: `Photo.ts` - Mongoose schema for photos.
    - _repository_: `types.ts` and `PhotosMongooseRepository.ts`.
    - _router_: `PhotosRouter.ts` with endpoint tests.
    - _schema_: `PhotosSchema.ts` for photo validation.

- **server**: Server configuration files.

  - _CustomError_: Custom error handling.
  - _middlewares_: `errorMiddleware.ts` and `notFoundErrorMiddleware.ts` with tests.
  - `app.ts`: Express application configuration.
  - `index.ts`: Main file importing and using middlewares.

- **setuptests.ts**: Configuration file for tests.

- **index.ts**: Main entry point of the application.

The structure is designed to promote modularity and easy navigation through different layers of the project.

# API Endpoints

The API exposes several endpoints to interact with the application's features. The key endpoints are outlined below:

## Ping Endpoint

`GET /ping`: Checks the availability of the server.

## Photos Endpoint

`GET /photos` : Retrieves a list of all photos.

`GET /photos/:id` : Retrieves details of a specific photo by ID.

`POST /photos` : Adds a new photo.

`PATCH /photos/:id` : Modifies objct photo by ID.

`DELETE /photos/:id` : Deletes a specific photo by ID.

# Database Configuration

For MongoDB:

1. **Install MongoDB:**
   Download and install from [official MongoDB website](https://www.mongodb.com/try/download/community).

2. **Set Up Environment Variables:**
   Configure `MONGODB_URI` and other variables.

3. **Start MongoDB:**
   Ensure MongoDB server is running

Database Migration:

1. **Migration Scripts:**
   Create scripts in database/migrations for schema/data changes.npm install -g migrate-mongo
   migrate-mongo up

2. **Run Migrations:**
   Use migrate-mongo:
   npm install -g migrate-mongo
   migrate-mongo up

3. **Rollback Migrations:**
   migrate-mongo down

# Environment Variables

1. **PORT:**

   - Description: Specifies the port on which the server will run.
   - Configuration: Set the desired port number (e.g., `PORT=1984`).

2. **MONGODB_URL:**

   - Description: MongoDB connection string, including credentials and database name.
   - Configuration: Replace the placeholder values with your MongoDB credentials and database name (e.g., `MONGODB_URL=mongodb+srv://username:password@cluster0.xyqhtjz.mongodb.net/your-database`).

3. **DEBUG:**

   - Description: Enables debugging for the specified namespace (`streetphotography` in this case).
   - Configuration: Adjust the namespace or remove the line if debugging is not required (e.g., `DEBUG=streetphotography:*`).

4. **ALLOWED_ORIGIN:**

   - Description: Allowed origin for CORS in the development environment.
   - Configuration: Set the allowed origin for local development (e.g., `ALLOWED_ORIGIN=http://localhost:5173`).

5. **ALLOWED_ORIGIN_PROD:**
   - Description: Allowed origin for CORS in the production environment.
   - Configuration: Set the allowed origin for the production environment (e.g., `ALLOWED_ORIGIN_PROD=https://your-production-app.netlify.app`).

Adjust these variables according to your specific requirements and environment. Users can configure these variables in a `.env` file or through their hosting platform's environment variable settings.

# Project Dependencies

## Dependencies

- **Express:** Web framework for Node.js facilitating the building of applications and APIs.
- **Cors:** Middleware enabling HTTP Cross-Origin Resource Sharing (CORS) to allow requests from different domains.
- **Debug:** Debugging utility for printing debug messages to the console.
- **Dotenv:** Loads environment variables from a `.env` file to ease application configuration.
- **Mongoose:** Object Data Modeling (ODM) for MongoDB, facilitating interaction with MongoDB databases.
- **Morgan:** HTTP logging middleware for Node.js.

## DevDependencies

- **Jest:** Testing framework for JavaScript and TypeScript.
- **Supertest:** Library for HTTP API integration testing.
- **Ts-Jest:** TypeScript integration for Jest.
- **TypeScript:** Typed programming language compiling to JavaScript.
- **@types/express:** Type definitions for Express.
- **@types/jest:** Type definitions for Jest.
- **@typescript-eslint:** Linting and static analysis tools for TypeScript.
- **Eslint:** Linting tool to identify and fix code style issues.
- **Husky:** Git hooks configuration for running scripts before certain events (e.g., commits).
- **Lint-Staged:** Runs scripts only on files that are staged for Git commit.
- **Prettier:** Code formatter to maintain consistent coding style.

## Where to Find

You can inspect the specific versions of these dependencies in the `package.json` file. Additional configurations related to testing, linting, and building may be defined in other files, such as `.eslintrc.js` or `jest.config.js`.

# Adding New Tests

Collaborators can run and add tests following these steps, contributing to project testing efforts and ensuring codebase stability.

### Unit Tests:

- Add new tests in `__tests__` folders for individual components or functions.

### Integration Tests:

- Extend integration tests in `__tests__` folders for testing multiple components.

### Follow Naming Conventions:

- Adhere to naming conventions (e.g., `example.test.ts`).

### Run Tests Locally:

- Ensure new tests pass locally using test scripts.

### Commit and Push Changes:

- Commit changes and push to the repository.

### Continuous Integration (CI):

- Rely on CI tools (e.g., GitHub Actions) to automatically run tests on pull requests.
