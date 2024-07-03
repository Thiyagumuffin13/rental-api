## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Prisma and .env
```bash
# creates schema.prisma file and .env file
$ npx prisma init

# prisma migration commands for db connections
$ npx prisma generate
$ npx prisma migrate pull
$ npx prisma migrate deploy
$ npx prisma migrate dev --name version1.0
```