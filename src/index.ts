import { createApplication } from "#app.js";
import { loadEnv } from "#config/env.js";

const env = loadEnv();
const app = createApplication(env);
app.listen(env.PORT);
