import { createApplication } from "#app.js";
import { loadEnv } from "#config/env.js";
import { makePrismaClient } from "#shared/infrastructure/persistence/prisma-client.js";

const env = loadEnv();
const prisma = makePrismaClient(env.DATABASE_URL);
const app = createApplication(prisma);
app.listen(env.PORT);
