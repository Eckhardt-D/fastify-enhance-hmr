import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import Fastify from "fastify";
import Enhance from "@enhance/fastify-plugin";
import HMR from "./plugins/hot-reload.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = Fastify();

app.register(Enhance);

app.register(HMR, {
  paths: [
    resolve(__dirname, "app"),
    resolve(__dirname, "app/elements"),
    resolve(__dirname, "app/pages"),
  ],
  disabled: process.env.NODE_ENV !== "development",
});

app.listen({ port: process.env.PORT || 3000 }, console.log);
