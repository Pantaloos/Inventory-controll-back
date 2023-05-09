## Prerequisites

- Node.js 18+
- Postgres 14+

## Install all necessary packages

```properties
npm install
```

## Set database

```fill .env.example
rename .env.example to .env
```

## Seed the database

```properties
npx sequelize-cli db:seed:all
```

## Launch the project

```properties
npm run dev
```
