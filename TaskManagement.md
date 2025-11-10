# Task Web App — Prompt & Response Snapshot

---

## 1) Prompt used in ChatGPT

```text
Act as a senior full‑stack engineer. Build a **Task Web App** from scratch with the following requirements. Output everything as a single, self‑contained answer that I can copy into a fresh repo. **Do not omit files or use ellipses.**

### Tech stack
- **Frontend:** React + Vite + TypeScript + Material UI + React Router + React Hook Form
- **Backend:** Node.js + Express + TypeScript + MongoDB + JWT (auth)
- **Tooling:** ESLint + Prettier + Jest + Testing Library + ts-node/tsx
- **DevX:** .env example,

### Functional requirements
1. **Auth:** username/password signup, login, logout; password hashing; JWT-based session (httpOnly cookie). Public routes: /login, /register. Protected routes: /app/*
2. **Tasks CRUD:** title (string), description (string), status (todo|doing|done), dueDate (nullable Date).
3. **UX features:** search, filter by status/priority/tag, sort by due date & priority, optimistic UI.
4. **Accessibility & responsiveness:** keyboard support, ARIA roles, proper color contrast, mobile-first layout.
5. **Error handling:** global Express error middleware; typed API errors surfaced in UI.
6. **Testing:** unit + component tests (Jest + RTL) and minimal API tests (supertest).
7. **Docs:** A root **README.md** with quick start, scripts, and architecture diagram (ASCII OK) + inline comments. Include a basic **CHANGELOG.md**.

### Code organization & deliverables
- Provide a monorepo-like structure or two folders: **/client** and **/server**.
- For every file, include a **header comment with the full relative path** (e.g., `// server/src/index.ts`).
- Include the following representative files (no placeholders):
  - Server: `src/index.ts`, `src/env.ts`, `src/server.ts`, `src/app.ts`, `src/auth/jwt.ts`, `src/auth/requireAuth.ts`, `src/routes/auth.ts`, `src/routes/tasks.ts`, `src/routes/health.ts`, `src/middlewares/error.ts`, `prisma/schema.prisma`, `prisma/seed.ts`, `package.json`, `tsconfig.json`, `jest.config.ts`, `.env.example`.
  - Client: `src/main.tsx`, `src/App.tsx`, `src/routes/*.tsx`, `src/components/*` (TaskCard, Column, Filters, Header, Loader, ErrorBoundary), `src/store/tasks.ts`, `src/client.ts`, `index.html`, vite.config.ts`, `package.json`, `tsconfig.json`, `jest.config.ts`.
  - Root: `docker-compose.yml`, `README.md`, `CHANGELOG.md`, `.editorconfig`, `.prettierrc`, `.eslintrc.cjs`, `.nvmrc`.
- API:
  - `POST /auth/signup`, `POST /auth/login`, `POST /auth/logout`
  - `GET /tasks`, `POST /tasks`, `PATCH /tasks/:id`, `DELETE /tasks/:id`
  - `GET /health`
- Include **Mongo models** for User and Task with relations; migrations for mongoDB; seed two users and example tasks.
- Client should have screens: Login, Register, App (three columns: To‑Do / Doing / Done), Task modal/editor, Profile/Logout.
- Provide **copy‑pasteable** shell commands to run locally (Node LTS). Include scripts for dev, build, test, and seed.
- Provide a **Security & Privacy** section in README (JWT cookie flags, CORS, rate limit suggestion, .env handling).

### Output format rules
- Use **markdown** with distinct sections per file. Start each file with a level‑3 heading `### <relative path>` immediately followed by a fenced code block.
- Do **not** skip files. Keep imports consistent (ESM). Prefer safest defaults. Keep comments concise.
- End with a "Quick Start" section containing 10 or fewer copy‑paste steps to run everything with and without Docker.

If anything is ambiguous, make sensible decisions and proceed.
```

---

## 2) ChatGPT Response (paste below)

<details>
  <summary><strong>Show/Hide ChatGPT Response</strong></summary>

```
.editorconfig
# .editorconfig
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2
trim_trailing_whitespace = true

.prettierrc
{
  "$schema": "https://json.schemastore.org/prettierrc",
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "arrowParens": "always",
  "endOfLine": "lf"
}

.eslintrc.cjs
// .eslintrc.cjs
/* eslint-env node */
module.exports = {
  root: true,
  ignorePatterns: ['dist', 'build', 'coverage', '.turbo', '.next'],
  overrides: [
    {
      files: ['server/**/*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'import'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'prettier',
      ],
      env: { node: true, es2022: true, jest: true },
      rules: {
        'import/order': [
          'warn',
          {
            groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index']],
            'newlines-between': 'always',
            alphabetize: { order: 'asc', caseInsensitive: true },
          },
        ],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: { attributes: false } }],
      },
    },
    {
      files: ['client/**/*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'react', 'react-hooks', 'import', 'jest-dom', 'testing-library'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:testing-library/react',
        'plugin:jest-dom/recommended',
        'prettier',
      ],
      env: { browser: true, es2022: true, jest: true },
      settings: { react: { version: 'detect' } },
      rules: {
        'react/react-in-jsx-scope': 'off',
        'import/order': [
          'warn',
          {
            groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index']],
            'newlines-between': 'always',
            alphabetize: { order: 'asc', caseInsensitive: true },
          },
        ],
      },
    },
  ],
};

.nvmrc
# .nvmrc
v20

docker-compose.yml
# docker-compose.yml
version: '3.9'
services:
  mongo:
    image: mongo:7
    restart: unless-stopped
    ports:
      - '27017:27017'
    environment:
      MONGO_INITDB_DATABASE: task_web_app
    volumes:
      - mongo_data:/data/db

  server:
    build:
      context: ./server
      dockerfile: Dockerfile
    environment:
      NODE_ENV: development
      PORT: 4000
      DATABASE_URL: mongodb://mongo:27017/task_web_app
      JWT_SECRET: devsecret_change_me
      COOKIE_NAME: access_token
      CLIENT_ORIGIN: http://localhost:5173
    ports:
      - '4000:4000'
    depends_on:
      - mongo
    volumes:
      - ./server:/app:cached
      - /app/node_modules

  client:
    build:
      context: ./client
      dockerfile: Dockerfile
    environment:
      VITE_API_BASE_URL: http://localhost:4000
    ports:
      - '5173:5173'
    depends_on:
      - server
    volumes:
      - ./client:/app:cached
      - /app/node_modules

volumes:
  mongo_data:

SERVER
server/package.json
{
  "name": "task-web-app-server",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "engines": { "node": ">=20" },
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "jest --runInBand",
    "seed": "tsx prisma/seed.ts",
    "prisma:generate": "prisma generate",
    "prisma:push": "prisma db push",
    "lint": "eslint . --ext .ts"
  },
  "dependencies": {
    "@prisma/client": "5.20.0",
    "bcryptjs": "2.4.3",
    "cookie-parser": "1.4.6",
    "cors": "2.8.5",
    "dotenv": "16.4.5",
    "express": "4.21.1",
    "helmet": "7.1.0",
    "jsonwebtoken": "9.0.2",
    "zod": "3.23.8"
  },
  "devDependencies": {
    "@types/bcryptjs": "2.4.6",
    "@types/cookie-parser": "1.4.7",
    "@types/cors": "2.8.17",
    "@types/express": "4.17.21",
    "@types/jest": "29.5.12",
    "@types/jsonwebtoken": "9.0.6",
    "@types/supertest": "2.0.16",
    "@typescript-eslint/eslint-plugin": "8.10.0",
    "@typescript-eslint/parser": "8.10.0",
    "eslint": "9.11.1",
    "eslint-config-prettier": "9.1.0",
    "eslint-plugin-import": "2.30.0",
    "jest": "29.7.0",
    "prisma": "5.20.0",
    "supertest": "7.0.0",
    "ts-jest": "29.2.5",
    "ts-node": "10.9.2",
    "tsx": "4.19.2",
    "typescript": "5.6.3"
  }
}

server/tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "bundler",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "resolveJsonModule": true
  },
  "include": ["src", "prisma"]
}

server/jest.config.ts
// server/jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts)$': [
      'ts-jest',
      {
        tsconfig: {
          module: 'commonjs'
        },
        useESM: false
      }
    ]
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  roots: ['<rootDir>/src', '<rootDir>/__tests__']
};

export default config;

server/.env.example
# server/.env.example
NODE_ENV=development
PORT=4000
DATABASE_URL="mongodb://localhost:27017/task_web_app"
JWT_SECRET="devsecret_change_me"
COOKIE_NAME="access_token"
CLIENT_ORIGIN="http://localhost:5173"

server/prisma/schema.prisma
// server/prisma/schema.prisma
// Prisma schema for MongoDB (relations via ObjectId)

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

enum TaskStatus {
  todo
  doing
  done
}

enum Priority {
  low
  medium
  high
}

model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  username  String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())

  tasks     Task[]
}

model Task {
  id          String     @id @default(auto()) @map("_id") @db.ObjectId
  userId      String     @db.ObjectId
  user        User       @relation(fields: [userId], references: [id])
  title       String
  description String
  status      TaskStatus @default(todo)
  dueDate     DateTime?
  priority    Priority   @default(medium)
  tags        String[]   @db.Array
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}

server/prisma/seed.ts
// server/prisma/seed.ts
import { PrismaClient, TaskStatus, Priority } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany({});
  await prisma.task.deleteMany({});

  const password1 = await bcrypt.hash('password123', 10);
  const password2 = await bcrypt.hash('secret456', 10);

  const alice = await prisma.user.create({
    data: { username: 'alice', email: 'alice@example.com', password: password1 },
  });
  const bob = await prisma.user.create({
    data: { username: 'bob', email: 'bob@example.com', password: password2 },
  });

  await prisma.task.createMany({
    data: [
      {
        userId: alice.id,
        title: 'Plan sprint backlog',
        description: 'Groom stories and define priorities',
        status: TaskStatus.todo,
        priority: Priority.high,
        tags: ['planning', 'sprint'],
        dueDate: new Date(Date.now() + 86400000),
      },
      {
        userId: alice.id,
        title: 'Build auth endpoints',
        description: 'Signup, login, logout, cookies',
        status: TaskStatus.doing,
        priority: Priority.high,
        tags: ['backend', 'auth'],
      },
      {
        userId: bob.id,
        title: 'Set up testing',
        description: 'Jest + RTL + supertest',
        status: TaskStatus.todo,
        priority: Priority.medium,
        tags: ['testing'],
      },
      {
        userId: bob.id,
        title: 'Polish UI',
        description: 'Add responsive layout and a11y',
        status: TaskStatus.done,
        priority: Priority.low,
        tags: ['frontend', 'a11y'],
      },
    ],
  });

  console.log('Seed completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

server/src/env.ts
// server/src/env.ts
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().url().or(z.string().startsWith('mongodb://')),
  JWT_SECRET: z.string().min(16, 'JWT_SECRET should be a reasonably long secret'),
  COOKIE_NAME: z.string().default('access_token'),
  CLIENT_ORIGIN: z.string().default('http://localhost:5173'),
});

export type Env = z.infer<typeof EnvSchema>;

export const env: Env = EnvSchema.parse(process.env);
export const isProd = env.NODE_ENV === 'production';

server/src/auth/jwt.ts
// server/src/auth/jwt.ts
import jwt from 'jsonwebtoken';
import type { Request, Response } from 'express';
import { env, isProd } from '../env.js';

export type JwtPayload = { sub: string };

export function signJwt(userId: string): string {
  return jwt.sign({ sub: userId }, env.JWT_SECRET, { expiresIn: '7d' });
}

export function verifyJwt(token: string): JwtPayload {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
}

export function setAuthCookie(res: Response, token: string) {
  res.cookie(env.COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

export function clearAuthCookie(res: Response) {
  res.clearCookie(env.COOKIE_NAME, { httpOnly: true, secure: isProd, sameSite: 'lax', path: '/' });
}

export function getTokenFromRequest(req: Request): string | null {
  const token = req.cookies?.[env.COOKIE_NAME];
  return token ?? null;
}

server/src/auth/requireAuth.ts
// server/src/auth/requireAuth.ts
import type { NextFunction, Request, Response } from 'express';
import { getTokenFromRequest, verifyJwt } from './jwt.js';

export type AuthedRequest = Request & { userId?: string };

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const token = getTokenFromRequest(req);
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    const payload = verifyJwt(token);
    req.userId = payload.sub;
    next();
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

server/src/middlewares/error.ts
// server/src/middlewares/error.ts
import type { NextFunction, Request, Response } from 'express';

export class ApiError extends Error {
  status: number;
  details?: unknown;
  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ error: 'Not Found' });
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ error: err.message, details: err.details ?? null });
  }
  console.error(err);
  return res.status(500).json({ error: 'Internal Server Error' });
}

server/src/routes/health.ts
// server/src/routes/health.ts
import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ ok: true, service: 'task-web-app', ts: new Date().toISOString() });
});

export default router;

server/src/routes/auth.ts
// server/src/routes/auth.ts
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { ApiError } from '../middlewares/error.js';
import { clearAuthCookie, setAuthCookie, signJwt } from '../auth/jwt.js';
import { requireAuth, AuthedRequest } from '../auth/requireAuth.js';

const prisma = new PrismaClient();
const router = Router();

const credsSchema = z.object({
  username: z.string().min(3).max(32).optional(),
  email: z.string().email(),
  password: z.string().min(6).max(128),
});

router.post('/signup', async (req, res, next) => {
  try {
    const parsed = credsSchema.parse(req.body);
    if (!parsed.username) throw new ApiError(400, 'username is required');
    const exists = await prisma.user.findUnique({ where: { email: parsed.email } });
    if (exists) throw new ApiError(409, 'Email already registered');

    const hash = await bcrypt.hash(parsed.password, 10);
    const user = await prisma.user.create({
      data: { username: parsed.username, email: parsed.email, password: hash },
      select: { id: true, username: true, email: true, createdAt: true },
    });

    const token = signJwt(user.id);
    setAuthCookie(res, token);
    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const parsed = credsSchema.omit({ username: true }).parse(req.body);
    const user = await prisma.user.findUnique({ where: { email: parsed.email } });
    if (!user) throw new ApiError(401, 'Invalid credentials');

    const ok = await bcrypt.compare(parsed.password, user.password);
    if (!ok) throw new ApiError(401, 'Invalid credentials');

    const token = signJwt(user.id);
    setAuthCookie(res, token);
    res.json({ id: user.id, username: user.username, email: user.email, createdAt: user.createdAt });
  } catch (e) {
    next(e);
  }
});

router.post('/logout', async (_req, res) => {
  clearAuthCookie(res);
  res.json({ ok: true });
});

router.get('/me', requireAuth, async (req: AuthedRequest, res, next) => {
  try {
    const me = await prisma.user.findUnique({
      where: { id: req.userId! },
      select: { id: true, username: true, email: true, createdAt: true },
    });
    if (!me) throw new ApiError(404, 'User not found');
    res.json(me);
  } catch (e) {
    next(e);
  }
});

export default router;

server/src/routes/tasks.ts
// server/src/routes/tasks.ts
import { Router } from 'express';
import { PrismaClient, TaskStatus, Priority } from '@prisma/client';
import { z } from 'zod';
import { AuthedRequest, requireAuth } from '../auth/requireAuth.js';

const prisma = new PrismaClient();
const router = Router();

const taskCreateSchema = z.object({
  title: z.string().min(1),
  description: z.string().default(''),
  status: z.nativeEnum(TaskStatus).default(TaskStatus.todo),
  dueDate: z.string().datetime().nullable().optional(),
  priority: z.nativeEnum(Priority).default(Priority.medium),
  tags: z.array(z.string()).default([]),
});

const taskUpdateSchema = taskCreateSchema.partial();

router.use(requireAuth);

// GET /tasks?search=&status=&priority=&tag=&sort=dueDate|priority&order=asc|desc
router.get('/', async (req: AuthedRequest, res) => {
  const { search, status, priority, tag, sort = 'dueDate', order = 'asc' } = req.query as Record<
    string,
    string
  >;

  const where: any = { userId: req.userId };
  if (status && Object.values(TaskStatus).includes(status as TaskStatus)) where.status = status;
  if (priority && Object.values(Priority).includes(priority as Priority))
    where.priority = priority;
  if (tag) where.tags = { has: tag };
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { tags: { has: search } },
    ];
  }

  const orderBy =
    sort === 'priority'
      ? { priority: order === 'desc' ? 'desc' : 'asc' }
      : { dueDate: order === 'desc' ? 'desc' : 'asc' };

  const tasks = await prisma.task.findMany({ where, orderBy });
  res.json(tasks);
});

router.post('/', async (req: AuthedRequest, res, next) => {
  try {
    const body = taskCreateSchema.parse(req.body);
    const task = await prisma.task.create({
      data: {
        userId: req.userId!,
        title: body.title,
        description: body.description,
        status: body.status,
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
        priority: body.priority,
        tags: body.tags,
      },
    });
    res.status(201).json(task);
  } catch (e) {
    next(e);
  }
});

router.patch('/:id', async (req: AuthedRequest, res, next) => {
  try {
    const id = req.params.id;
    const data = taskUpdateSchema.parse(req.body);
    const task = await prisma.task.update({
      where: { id },
      data: {
        ...(data.title !== undefined ? { title: data.title } : {}),
        ...(data.description !== undefined ? { description: data.description } : {}),
        ...(data.status !== undefined ? { status: data.status } : {}),
        ...(data.dueDate !== undefined ? { dueDate: data.dueDate ? new Date(data.dueDate) : null } : {}),
        ...(data.priority !== undefined ? { priority: data.priority } : {}),
        ...(data.tags !== undefined ? { tags: data.tags } : {}),
      },
    });
    if (task.userId !== req.userId) return res.status(403).json({ error: 'Forbidden' });
    res.json(task);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req: AuthedRequest, res, next) => {
  try {
    const id = req.params.id;
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task || task.userId !== req.userId) return res.status(404).json({ error: 'Not Found' });
    await prisma.task.delete({ where: { id } });
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

export default router;

server/src/app.ts
// server/src/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { env } from './env.js';
import health from './routes/health.js';
import auth from './routes/auth.js';
import tasks from './routes/tasks.js';
import { errorHandler, notFound } from './middlewares/error.js';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CLIENT_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use('/health', health);
app.use('/auth', auth);
app.use('/tasks', tasks);

app.use(notFound);
app.use(errorHandler);

export default app;

server/src/server.ts
// server/src/server.ts
import app from './app.js';
import { env } from './env.js';

export function startServer() {
  return app.listen(env.PORT, () => {
    console.log(`API listening on http://localhost:${env.PORT}`);
  });
}

server/src/index.ts
// server/src/index.ts
import { PrismaClient } from '@prisma/client';
import { env } from './env.js';
import { startServer } from './server.js';

const prisma = new PrismaClient();

async function main() {
  // Establish a connection early to fail-fast if DB is unreachable.
  await prisma.$connect();
  console.log('DB connected.');
  startServer();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

server/tests/health.test.ts
// server/__tests__/health.test.ts
import request from 'supertest';
import app from '../src/app';

describe('GET /health', () => {
  it('returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});

CLIENT
client/package.json
{
  "name": "task-web-app-client",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "engines": { "node": ">=20" },
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "jest",
    "lint": "eslint . --ext .ts,.tsx"
  },
  "dependencies": {
    "@emotion/react": "11.13.3",
    "@emotion/styled": "11.13.0",
    "@mui/icons-material": "6.1.6",
    "@mui/material": "6.1.6",
    "axios": "1.7.7",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "react-hook-form": "7.53.0",
    "react-router-dom": "6.27.0",
    "zustand": "4.5.2"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "6.6.3",
    "@testing-library/react": "16.0.1",
    "@types/jest": "29.5.12",
    "@types/node": "20.11.30",
    "@types/react": "18.3.11",
    "@types/react-dom": "18.3.1",
    "@vitejs/plugin-react": "4.3.4",
    "eslint": "9.11.1",
    "eslint-config-prettier": "9.1.0",
    "eslint-plugin-import": "2.30.0",
    "eslint-plugin-jest-dom": "5.4.0",
    "eslint-plugin-react": "7.37.2",
    "eslint-plugin-react-hooks": "4.6.0",
    "eslint-plugin-testing-library": "6.4.0",
    "jest": "29.7.0",
    "jest-environment-jsdom": "29.7.0",
    "typescript": "5.6.3",
    "vite": "5.4.10"
  }
}

client/tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "types": ["jest", "@testing-library/jest-dom"]
  },
  "include": ["src", "jest.setup.ts"]
}

client/jest.config.ts
// client/jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleFileExtensions: ['tsx', 'ts', 'js', 'jsx'],
  transform: {},
  testMatch: ['**/__tests__/**/*.test.(ts|tsx)'],
  roots: ['<rootDir>/src', '<rootDir>/__tests__']
};
export default config;

client/jest.setup.ts
// client/jest.setup.ts
import '@testing-library/jest-dom';

client/vite.config.ts
// client/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  }
});

client/index.html
<!-- client/index.html -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Task Web App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

client/src/client.ts
// client/src/client.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: (import.meta as any).env?.VITE_API_BASE_URL
    ? `${(import.meta as any).env.VITE_API_BASE_URL}`
    : 'http://localhost:4000',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

export type TaskStatus = 'todo' | 'doing' | 'done';
export type Priority = 'low' | 'medium' | 'high';

export type Task = {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string | null;
  priority: Priority;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type User = { id: string; username: string; email: string; createdAt: string };

client/src/store/tasks.ts
// client/src/store/tasks.ts
import { create } from 'zustand';
import { api, Task, TaskStatus, Priority } from '../client';

type Filters = {
  search: string;
  status: TaskStatus | 'all';
  priority: Priority | 'all';
  tag: string;
  sort: 'dueDate' | 'priority';
  order: 'asc' | 'desc';
};

type State = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filters: Filters;
  fetchTasks: () => Promise<void>;
  createTask: (data: Partial<Task>) => Promise<Task>;
  updateTask: (id: string, data: Partial<Task>) => Promise<Task>;
  deleteTask: (id: string) => Promise<void>;
  setFilter: (f: Partial<Filters>) => void;
  clear: () => void;
};

const defaultFilters: Filters = {
  search: '',
  status: 'all',
  priority: 'all',
  tag: '',
  sort: 'dueDate',
  order: 'asc',
};

export const useTasksStore = create<State>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,
  filters: defaultFilters,
  async fetchTasks() {
    const { filters } = get();
    set({ loading: true, error: null });
    const params: Record<string, string> = {};
    if (filters.search) params.search = filters.search;
    if (filters.status !== 'all') params.status = filters.status;
    if (filters.priority !== 'all') params.priority = filters.priority;
    if (filters.tag) params.tag = filters.tag;
    params.sort = filters.sort;
    params.order = filters.order;

    const res = await api.get('/tasks', { params });
    set({ tasks: res.data, loading: false });
  },
  async createTask(data) {
    // optimistic: push temp task
    const tempId = `temp-${Math.random()}`;
    const temp: Task = {
      id: tempId,
      userId: 'me',
      title: String(data.title ?? ''),
      description: String(data.description ?? ''),
      status: (data.status as TaskStatus) ?? 'todo',
      dueDate: (data.dueDate as string | null) ?? null,
      priority: (data.priority as Priority) ?? 'medium',
      tags: (data.tags as string[]) ?? [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((s) => ({ tasks: [temp, ...s.tasks] }));
    try {
      const res = await api.post('/tasks', {
        title: temp.title,
        description: temp.description,
        status: temp.status,
        dueDate: temp.dueDate,
        priority: temp.priority,
        tags: temp.tags,
      });
      set((s) => ({ tasks: s.tasks.map((t) => (t.id === tempId ? res.data : t)) }));
      return res.data;
    } catch (e: any) {
      set((s) => ({ tasks: s.tasks.filter((t) => t.id !== tempId) }));
      throw e;
    }
  },
  async updateTask(id, data) {
    // optimistic: patch local
    const prev = get().tasks;
    const next = prev.map((t) => (t.id === id ? { ...t, ...data, updatedAt: new Date().toISOString() } : t));
    set({ tasks: next });
    try {
      const res = await api.patch(`/tasks/${id}`, data);
      set((s) => ({ tasks: s.tasks.map((t) => (t.id === id ? res.data : t)) }));
      return res.data;
    } catch (e) {
      set({ tasks: prev });
      throw e;
    }
  },
  async deleteTask(id) {
    const prev = get().tasks;
    set({ tasks: prev.filter((t) => t.id !== id) });
    try {
      await api.delete(`/tasks/${id}`);
    } catch (e) {
      set({ tasks: prev }); // rollback
      throw e;
    }
  },
  setFilter(f) {
    set((s) => ({ filters: { ...s.filters, ...f } }));
  },
  clear() {
    set({ tasks: [], filters: defaultFilters, loading: false, error: null });
  },
}));

client/src/components/Header.tsx
// client/src/components/Header.tsx
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api } from '../client';

export default function Header() {
  const navigate = useNavigate();
  const logout = async () => {
    await api.post('/auth/logout');
    navigate('/login');
  };
  return (
    <AppBar position="sticky" color="primary" enableColorOnDark>
      <Toolbar>
        <Typography component="h1" variant="h6" sx={{ flexGrow: 1 }}>
          Task Web App
        </Typography>
        <Box role="navigation" aria-label="profile actions">
          <Button color="inherit" onClick={() => navigate('/app/profile')}>
            Profile
          </Button>
          <Button color="inherit" onClick={logout} aria-label="logout">
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

client/src/components/Loader.tsx
// client/src/components/Loader.tsx
import { Box, CircularProgress } from '@mui/material';

export default function Loader() {
  return (
    <Box role="status" aria-live="polite" sx={{ display: 'grid', placeItems: 'center', py: 6 }}>
      <CircularProgress />
    </Box>
  );
}

client/src/components/ErrorBoundary.tsx
// client/src/components/ErrorBoundary.tsx
import { Component, ReactNode } from 'react';
import { Alert, AlertTitle } from '@mui/material';

type Props = { children: ReactNode };
type State = { hasError: boolean; error?: any };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <Alert severity="error" role="alert" aria-live="assertive">
          <AlertTitle>Something went wrong</AlertTitle>
          {String(this.state.error)}
        </Alert>
      );
    }
    return this.props.children;
  }
}

client/src/components/TaskCard.tsx
// client/src/components/TaskCard.tsx
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  IconButton,
  Stack,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Task } from '../client';

type Props = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
};

export default function TaskCard({ task, onEdit, onDelete }: Props) {
  const due = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—';
  return (
    <Card variant="outlined" sx={{ mb: 2 }} role="article" aria-label={`Task ${task.title}`}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="start">
          <Typography variant="h6">{task.title}</Typography>
          <Chip
            size="small"
            label={task.priority}
            color={task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'warning' : 'default'}
            aria-label={`priority ${task.priority}`}
          />
        </Stack>
        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
          {task.description}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }} role="list" aria-label="tags">
          {task.tags.map((t) => (
            <Chip key={t} size="small" label={t} role="listitem" />
          ))}
        </Stack>
        <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
          Due: {due}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Tooltip title="Edit task">
          <IconButton aria-label="edit task" onClick={() => onEdit(task)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete task">
          <IconButton aria-label="delete task" onClick={() => onDelete(task.id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}

client/src/components/Filters.tsx
// client/src/components/Filters.tsx
import {
  Box,
  TextField,
  InputAdornment,
  MenuItem,
  Stack,
  IconButton,
  Tooltip,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
  import RefreshIcon from '@mui/icons-material/Refresh';
import { useTasksStore } from '../store/tasks';

export default function Filters() {
  const { filters, setFilter, fetchTasks } = useTasksStore();

  const apply = async () => {
    await fetchTasks();
  };

  const reset = async () => {
    setFilter({ search: '', status: 'all', priority: 'all', tag: '', sort: 'dueDate', order: 'asc' });
    await fetchTasks();
  };

  return (
    <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ mb: 2 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
        <TextField
          label="Search"
          size="small"
          fullWidth
          value={filters.search}
          onChange={(e) => setFilter({ search: e.target.value })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" aria-hidden>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Status"
          size="small"
          select
          value={filters.status}
          onChange={(e) => setFilter({ status: e.target.value as any })}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="todo">To-Do</MenuItem>
          <MenuItem value="doing">Doing</MenuItem>
          <MenuItem value="done">Done</MenuItem>
        </TextField>
        <TextField
          label="Priority"
          size="small"
          select
          value={filters.priority}
          onChange={(e) => setFilter({ priority: e.target.value as any })}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </TextField>
        <TextField
          label="Tag"
          size="small"
          value={filters.tag}
          onChange={(e) => setFilter({ tag: e.target.value })}
        />
        <TextField
          label="Sort"
          size="small"
          select
          value={filters.sort}
          onChange={(e) => setFilter({ sort: e.target.value as any })}
        >
          <MenuItem value="dueDate">Due Date</MenuItem>
          <MenuItem value="priority">Priority</MenuItem>
        </TextField>
        <TextField
          label="Order"
          size="small"
          select
          value={filters.order}
          onChange={(e) => setFilter({ order: e.target.value as any })}
        >
          <MenuItem value="asc">Asc</MenuItem>
          <MenuItem value="desc">Desc</MenuItem>
        </TextField>
        <Button variant="contained" onClick={apply} aria-label="apply filters">
          Apply
        </Button>
        <Tooltip title="Reset filters">
          <IconButton onClick={reset} aria-label="reset filters">
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
}

client/src/components/Column.tsx
// client/src/components/Column.tsx
import { Box, Typography } from '@mui/material';
import TaskCard from './TaskCard';
import { Task } from '../client';

type Props = {
  title: string;
  tasks: Task[];
  onEdit: (t: Task) => void;
  onDelete: (id: string) => void;
};

export default function Column({ title, tasks, onEdit, onDelete }: Props) {
  return (
    <Box role="region" aria-label={`${title} column`} sx={{ flex: 1, px: { xs: 0, md: 1 } }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {title}
      </Typography>
      {tasks.map((t) => (
        <TaskCard key={t.id} task={t} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </Box>
  );
}

client/src/components/TaskEditorModal.tsx
// client/src/components/TaskEditorModal.tsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { Priority, Task, TaskStatus } from '../client';

type FormValues = {
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string | null;
  priority: Priority;
  tags: string; // comma-separated
};

type Props = {
  open: boolean;
  initial?: Partial<Task>;
  onClose: () => void;
  onSave: (data: Partial<Task>) => Promise<void>;
};

export default function TaskEditorModal({ open, initial, onClose, onSave }: Props) {
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      title: initial?.title ?? '',
      description: initial?.description ?? '',
      status: (initial?.status as TaskStatus) ?? 'todo',
      dueDate: initial?.dueDate ? initial.dueDate.substring(0, 10) : '',
      priority: (initial?.priority as Priority) ?? 'medium',
      tags: (initial?.tags ?? []).join(','),
    },
  });

  const submit = handleSubmit(async (values) => {
    await onSave({
      title: values.title,
      description: values.description,
      status: values.status,
      dueDate: values.dueDate ? new Date(values.dueDate).toISOString() : null,
      priority: values.priority,
      tags: values.tags
        ? values.tags
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
    });
    reset();
    onClose();
  });

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="task-editor-title" fullWidth>
      <DialogTitle id="task-editor-title">{initial?.id ? 'Edit Task' : 'Create Task'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField label="Title" {...register('title', { required: true })} autoFocus />
          <TextField label="Description" multiline rows={3} {...register('description')} />
          <TextField label="Status" select {...register('status')}>
            <MenuItem value="todo">To-Do</MenuItem>
            <MenuItem value="doing">Doing</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </TextField>
          <TextField
            label="Due Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            {...register('dueDate')}
          />
          <TextField label="Priority" select {...register('priority')}>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>
          <TextField
            label="Tags (comma separated)"
            placeholder="e.g. planning,backend"
            {...register('tags')}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={submit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

client/src/routes/Login.tsx
// client/src/routes/Login.tsx
import {
  Box,
  Button,
  Container,
  Link,
  Paper,
  TextField,
  Typography,
  Alert,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { api } from '../client';

type FormValues = { email: string; password: string };

export default function Login() {
  const { register, handleSubmit } = useForm<FormValues>();
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (values) => {
    try {
      await api.post('/auth/login', values);
      navigate('/app');
    } catch {
      const el = document.getElementById('login-error');
      if (el) el.hidden = false;
    }
  });

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper sx={{ p: 3 }} component="section" aria-labelledby="login-title">
        <Typography id="login-title" variant="h5" gutterBottom>
          Login
        </Typography>
        <Alert id="login-error" severity="error" hidden role="alert" aria-live="assertive">
          Invalid credentials
        </Alert>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ display: 'grid', gap: 2, mt: 2 }}>
          <TextField label="Email" type="email" autoComplete="email" {...register('email', { required: true })} />
          <TextField label="Password" type="password" autoComplete="current-password" {...register('password', { required: true })} />
          <Button type="submit" variant="contained">Sign in</Button>
        </Box>
        <Typography sx={{ mt: 2 }}>
          No account?{' '}
          <Link component={RouterLink} to="/register">
            Register
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

client/src/routes/Register.tsx
// client/src/routes/Register.tsx
import { Box, Button, Container, Link, Paper, TextField, Typography, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { api } from '../client';

type FormValues = { username: string; email: string; password: string };

export default function Register() {
  const { register, handleSubmit } = useForm<FormValues>();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    try {
      await api.post('/auth/signup', values);
      navigate('/app');
    } catch {
      const el = document.getElementById('signup-error');
      if (el) el.hidden = false;
    }
  });

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper sx={{ p: 3 }} component="section" aria-labelledby="register-title">
        <Typography id="register-title" variant="h5" gutterBottom>
          Register
        </Typography>
        <Alert id="signup-error" severity="error" hidden role="alert">
          Could not register
        </Alert>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ display: 'grid', gap: 2, mt: 2 }}>
          <TextField label="Username" {...register('username', { required: true })} />
          <TextField label="Email" type="email" {...register('email', { required: true })} />
          <TextField label="Password" type="password" {...register('password', { required: true, minLength: 6 })} />
          <Button type="submit" variant="contained">Create account</Button>
        </Box>
        <Typography sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link component={RouterLink} to="/login">
            Login
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

client/src/routes/AppHome.tsx
// client/src/routes/AppHome.tsx
import { useEffect, useMemo, useState } from 'react';
import { Container, Fab, Grid, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Header from '../components/Header';
import Filters from '../components/Filters';
import Column from '../components/Column';
import TaskEditorModal from '../components/TaskEditorModal';
import { ErrorBoundary } from '../components/ErrorBoundary';
import Loader from '../components/Loader';
import { useTasksStore } from '../store/tasks';
import { Task } from '../client';

export default function AppHome() {
  const { tasks, fetchTasks, deleteTask, updateTask, createTask, loading } = useTasksStore();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<Task> | undefined>(undefined);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const todo = useMemo(() => tasks.filter((t) => t.status === 'todo'), [tasks]);
  const doing = useMemo(() => tasks.filter((t) => t.status === 'doing'), [tasks]);
  const done = useMemo(() => tasks.filter((t) => t.status === 'done'), [tasks]);

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Filters />
        <ErrorBoundary>
          {loading ? (
            <Loader />
          ) : (
            <Grid container spacing={2} role="list" aria-label="task columns">
              <Grid item xs={12} md={4} role="listitem">
                <Column
                  title="To-Do"
                  tasks={todo}
                  onEdit={(t) => {
                    setEditing(t);
                    setOpen(true);
                  }}
                  onDelete={deleteTask}
                />
              </Grid>
              <Grid item xs={12} md={4} role="listitem">
                <Column
                  title="Doing"
                  tasks={doing}
                  onEdit={(t) => {
                    setEditing(t);
                    setOpen(true);
                  }}
                  onDelete={deleteTask}
                />
              </Grid>
              <Grid item xs={12} md={4} role="listitem">
                <Column
                  title="Done"
                  tasks={done}
                  onEdit={(t) => {
                    setEditing(t);
                    setOpen(true);
                  }}
                  onDelete={deleteTask}
                />
              </Grid>
            </Grid>
          )}
        </ErrorBoundary>

        <Tooltip title="Create task">
          <Fab
            color="primary"
            aria-label="create task"
            onClick={() => {
              setEditing(undefined);
              setOpen(true);
            }}
            sx={{ position: 'fixed', bottom: 24, right: 24 }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Container>

      <TaskEditorModal
        open={open}
        initial={editing}
        onClose={() => setOpen(false)}
        onSave={async (data) => {
          if (editing?.id) {
            await updateTask(editing.id, data);
          } else {
            await createTask(data);
          }
        }}
      />
    </>
  );
}

client/src/routes/Profile.tsx
// client/src/routes/Profile.tsx
import { useEffect, useState } from 'react';
import { api, User } from '../client';
import Header from '../components/Header';
import { Container, Paper, Typography, Stack, TextField } from '@mui/material';

export default function Profile() {
  const [me, setMe] = useState<User | null>(null);

  useEffect(() => {
    api.get('/auth/me').then((res) => setMe(res.data));
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ py: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Profile
          </Typography>
          {me && (
            <Stack spacing={2}>
              <TextField label="Username" value={me.username} InputProps={{ readOnly: true }} />
              <TextField label="Email" value={me.email} InputProps={{ readOnly: true }} />
              <TextField
                label="Member since"
                value={new Date(me.createdAt).toLocaleString()}
                InputProps={{ readOnly: true }}
              />
            </Stack>
          )}
        </Paper>
      </Container>
    </>
  );
}

client/src/routes/Protected.tsx
// client/src/routes/Protected.tsx
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { api } from '../client';

export default function Protected() {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    let mounted = true;
    api
      .get('/auth/me')
      .then(() => {
        if (mounted) setChecked(true);
      })
      .catch(() => {
        navigate('/login', { replace: true, state: { from: loc.pathname } });
      });
    return () => {
      mounted = false;
    };
  }, [navigate, loc.pathname]);

  if (!checked) return null;
  return <Outlet />;
}

client/src/App.tsx
// client/src/App.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './routes/Login';
import Register from './routes/Register';
import AppHome from './routes/AppHome';
import Profile from './routes/Profile';
import Protected from './routes/Protected';

const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  {
    path: '/app',
    element: <Protected />,
    children: [
      { index: true, element: <AppHome /> },
      { path: 'profile', element: <Profile /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

client/src/main.tsx
// client/src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: { mode: 'light' },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);

client/tests/login.test.tsx
// client/__tests__/login.test.tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../src/routes/Login';

describe('Login page', () => {
  it('renders fields', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });
});

ROOT DOCS
README.md
# Task Web App (React + Express + TS + MongoDB + JWT)

A full-stack task management app with secure cookie-based JWT auth, Prisma (MongoDB), Material UI, optimistic updates, filters/sorting, accessibility, and tests.

## Architecture



monorepo/
├─ client/ (React + Vite + TS + MUI + React Router + React Hook Form + Zustand)
│ ├─ src/components (TaskCard, Column, Filters, Header, Loader, ErrorBoundary)
│ ├─ src/routes (Login, Register, AppHome, Profile, Protected)
│ ├─ src/store/tasks.ts (state + optimistic mutations)
│ └─ src/client.ts (axios client + shared types)
├─ server/ (Express + TS + Prisma for MongoDB + JWT cookies)
│ ├─ src/routes (auth, tasks, health)
│ ├─ src/auth (jwt.ts, requireAuth.ts)
│ ├─ src/middlewares/error.ts (typed API errors)
│ ├─ prisma/schema.prisma (Mongo models + enums)
│ └─ prisma/seed.ts (two users + sample tasks)
└─ docker-compose.yml (mongo + server + client)


### ASCII Diagram



[Browser]
| Axios (withCredentials)
v
[Client Router] --(public)--> /login, /register
| |
| (GET /auth/me) | (POST /auth/)
v v
[Protected /app/] --------> [Express API]
|
| cookie-parser + JWT (httpOnly)
v
[Prisma Client] --> [MongoDB]


## Features

- **Auth**: Sign up, login, logout; password hashing; JWT in **httpOnly** cookie; public routes `/login`, `/register`, protected `/app/*`.
- **Tasks CRUD**: Title, description, `status` (`todo|doing|done`), `dueDate` (nullable), plus **priority** and **tags** for filtering/sorting.
- **UX**: Search, filter by status/priority/tag, sort by due date or priority, **optimistic UI** on create/update/delete.
- **A11y & Responsive**: Keyboard focusable components, ARIA roles, high-contrast MUI defaults, mobile-first grid.
- **Error handling**: Central Express error middleware, typed JSON error payloads surfaced by UI.
- **Testing**: Client (Jest + RTL) and API smoke test for `/health` (supertest).
- **Tooling**: ESLint + Prettier; Node v20 via `.nvmrc`.

## Environment

Copy and adjust **server/.env.example** to `server/.env`:


NODE_ENV=development
PORT=4000
DATABASE_URL="mongodb://localhost:27017/task_web_app"
JWT_SECRET="change_me_in_prod_please"
COOKIE_NAME="access_token"
CLIENT_ORIGIN="http://localhost:5173
"


## Scripts

### Server
- `pnpm dev` / `npm run dev` – Start API in watch mode
- `pnpm build` / `npm run build` – Type-check and emit `dist`
- `pnpm start` – Run compiled server
- `pnpm test` – Jest tests
- `pnpm prisma:push` – Apply Prisma schema to MongoDB
- `pnpm seed` – Seed DB

### Client
- `pnpm dev` – Vite dev server
- `pnpm build` – Build for production
- `pnpm preview` – Preview production build
- `pnpm test` – Jest + RTL

## Security & Privacy

- **JWT Cookie Flags**: `httpOnly`, `sameSite=lax`, `secure` (enabled in production), 7-day expiry. Prevents XSS from reading tokens.
- **CORS**: Restricted to `CLIENT_ORIGIN` and `credentials: true`.
- **Password storage**: `bcrypt` with salt rounds (10). Never log raw credentials.
- **Rate limiting**: Recommended to add middleware like `express-rate-limit` for auth routes.
- **Error messages**: Avoid leaking internals; generic 401/403/404 responses.
- **.env handling**: Never commit secrets; use `.env` files locally and vendor secrets in production.
- **HTTPS**: Required in production so `secure` cookies are sent; terminate TLS at a reverse proxy if needed.

## Notes

- Prisma with MongoDB **does not use traditional migrations**; use `prisma db push` to sync schema. We provide `prisma/seed.ts` to generate example data.
- Filtering/sorting happens server-side (query params). Client state uses **Zustand** and applies **optimistic** updates.

## Quick Start

### Without Docker
1. **Install Node 20**: `nvm use` (reads `.nvmrc`) or install manually.
2. **Install deps**: `cd server && pnpm i` and `cd ../client && pnpm i` (or `npm i`).
3. **Run MongoDB**: `docker run -p 27017:27017 -d --name mongo mongo:7` *(or local mongod)*.
4. **Apply schema**: `cd server && pnpm prisma:push`.
5. **Seed**: `pnpm seed`.
6. **Start API**: `pnpm dev` (server at `http://localhost:4000`).
7. **Start Web**: `cd ../client && pnpm dev` (client at `http://localhost:5173`).
8. **Login**: Use `alice@example.com` / `password123` or register a new user.

### With Docker
1. `docker compose up --build -d`
2. **Generate & push prisma (first time, optional)**: `docker compose exec server pnpm prisma:push`
3. **Seed**: `docker compose exec server pnpm seed`
4. Open `http://localhost:5173`

Happy building! 🚀
```

</details>

---

