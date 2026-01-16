# NestJS Project with Advanced Testing

A progressive [Node.js](http://nodejs.org) framework for building efficient and scalable server-side applications, enhanced with a comprehensive testing suite.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

```bash
# Clone the repository
$ git clone <repository-url>

# Navigate to the project directory
$ cd project-name

# Install dependencies
$ npm install
```

## 🏃 Running the App

### Standard Modes
```bash
# Development mode
$ npm run start

# Watch mode (Auto-reload on changes)
$ npm run start:dev

# Production mode
$ npm run start:prod
```

### ⚖️ Load Balancing (Cluster Mode)
This project uses **PM2** to run in Cluster Mode, distributing traffic across all available CPU cores.

```bash
# Build the project first
$ npm run build

# Start the cluster
$ npm run start:cluster

# Monitor the processes
$ npx pm2 monit
```

---

## 🧪 Testing

This project implements multiple testing formats to ensure high quality and reliability.

### 1. Unit Testing
Tests individual functions and classes in isolation.
```bash
$ npm run test
```

### 2. Integration Testing
Tests the interaction between components (e.g., Controller + Service) without full HTTP.
```bash
# Runs the specific integration test file
$ npx jest --rootDir . test/app-integration.spec.ts
```

### 3. End-to-End (E2E) Testing
Tests the full request-response cycle.
```bash
$ npm run test:e2e
```

### 4. Load Testing
Performance testing using **Autocannon**.
> **Note:** Ensure the server is running (`npm run start`) before running this test.
```bash
$ npm run test:load
```

### 5. Contract Testing (Pact)
Ensures the API meets the expectations of its consumers.
```bash
# 1. Run consumer test to generate the Pact contract
$ npm run test:contract:consumer

# 2. Run provider test to verify the API against the contract
$ npm run test:contract:provider
```

### 6. Mutation Testing (Stryker)
Evaluates the quality of your tests by introducing "bugs" (mutants) into your code.
```bash
$ npm run test:mutation
```

---

## 🛠️ Project Structure
- `src/`: Application source code.
- `test/`:
  - `contract/`: Pact contract tests.
  - `k6/`: Reference K6 load testing scripts.
  - `app-integration.spec.ts`: Integration test.
  - `app.e2e-spec.ts`: E2E test.

## 📝 License
Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
# all-_est_wiht_nest.js_project
