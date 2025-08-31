## Boilerplate Backend with Hono

### Copy ENV
```bash
cp .env .env.example
```

### Run
```bash
npm run dev
```

### Folder Structure
```text
├── .gitignore
├── README.md
├── docker-compose.yml
├── drizzle.config.ts
├── package-lock.json
├── package.json
├── src/
│   ├── db/
│   │   ├── index.ts
│   │   └── schema.ts
│   ├── index.ts
│   ├── lib/
│   │   ├── jwt/
│   │   │   └── index.ts
│   │   ├── open-api/
│   │   │   └── index.ts
│   │   ├── router/
│   │   │   └── index.ts
│   │   └── zod/
│   │       └── index.ts
│   ├── middleware/
│   │   └── auth.middleware.ts
│   └── routes/
│       ├── auth/
│       │   ├── auth.handlers.ts
│       │   ├── auth.route.ts
│       │   ├── auth.schema.ts
│       │   └── index.ts
│       └── index.ts
└── tsconfig.json
```
