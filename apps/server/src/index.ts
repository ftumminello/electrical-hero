import express from "express";
import cors from "cors";
import { APP_NAME, type HealthResponse } from "@electrical-hero/shared";

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  const body: HealthResponse = { status: "ok", app: APP_NAME };
  res.json(body);
});

app.listen(port, () => {
  console.log(`${APP_NAME} server listening on http://localhost:${port}`);
});
