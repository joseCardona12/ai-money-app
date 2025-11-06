import express, { Express, Request, Response } from "express";
import cors from "cors";
import { UtilApplication } from "./util/utilApplication";
import { router } from "./router";
import { errorHandler } from "./middleware/errorHandler";

const app: Express = express();

// CORS configuration - Allow both local and production URLs
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  process.env.FRONTEND_URL || "",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        process.env.NODE_ENV === "development"
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json()); // Available the transfer data with json format

// Health check endpoint for Render
app.get("/api/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

app.use("/api", router); // Middleware router

// Middleware de manejo de errores (debe ir al final)
app.use(errorHandler);

UtilApplication.initServer(app); //Init server with ORM sequelize
