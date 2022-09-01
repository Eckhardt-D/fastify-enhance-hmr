import { randomUUID } from "node:crypto";
import { watch } from "node:fs";
import fp from "fastify-plugin";
import ws from "@fastify/websocket";
import * as z from "zod";

let connections = [];

const hotReloadWatchOptionsSchema = z.object({
  paths: z.array(z.string()),
  disabled: z.boolean().default(false),
});

const fileWatchEventHandler = (_eventType, _filename) => {
  if (connections.length > 0) {
    connections.forEach((connection) => connection.socket.send("reload"));
  }
};

export default fp(async function (fastify, opts) {
  const params = hotReloadWatchOptionsSchema.parse(opts);

  if (params.disabled) return;
  if (params.paths.length <= 0) return;

  await fastify.register(ws);

  fastify.get("/_hmr", { websocket: true }, (connection) => {
    const id = randomUUID();

    connection.socket.on("message", () => {
      connections.push({
        id,
        socket: connection.socket,
      });
    });

    connection.socket.on("close", () => {
      connections = connections.filter((conn) => conn.id !== id);
    });
  });

  params.paths.forEach((path) => {
    watch(
      path,
      {
        persistent: true,
        // recursive: true // not supported everywhere, give all dir paths
      },
      fileWatchEventHandler
    );
  });
});
