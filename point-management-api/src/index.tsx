import "reflect-metadata";
import { initializePostgres } from "@/databases/postgres";
import { initPointWorker } from "@/systems/worker/pointWorker";
import express from "express";
import routes from "@/routers/index";
import config from "@/config/index";
import helmet from "helmet";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./swagger/swaggerConfig";

// Initialize core systems
initializePostgres();
initPointWorker();

const app = express();
const { HOST_API_PORT } = config.server || { HOST_API_PORT: 3000 };

app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  }),
);

app.get("/", (req, res) => {
  res.send("Point Management API is running");
});

app.use("/api/v1", routes);

app.use((req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
});

app.listen(HOST_API_PORT, () => {
  console.log(`🚀 Express Server listening on port ${HOST_API_PORT}`);
});
