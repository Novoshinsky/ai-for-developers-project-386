import express from "express";
import { createRouter } from "./generated/generated";
import type { ApiGetHealth } from "./generated/generated";

const apiGetHealth: ApiGetHealth = async (_input, respond) => {
  return respond.with200().body({ status: "ok" });
};

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(
    createRouter({
      apiGetHealth,
    }),
  );
  app.use((_request, response) => {
    response.status(404).json({ message: "Not found" });
  });

  return app;
}
