import { Express } from "express";
import { sequelize } from "../config/db";
import { port } from "./constants/loadEnv";
import { validateEnvironmentVariables } from "./validateEnv";

export class UtilApplication {
  public static async initServer(app: Express): Promise<void> {
    try {
      // Validate environment variables before starting
      validateEnvironmentVariables();

      // Connect to database
      await sequelize.authenticate();
      console.log("✅ Database connection established successfully");

      // Sync database models
      await sequelize.sync();
      console.log("✅ Database models synchronized");

      // Start server
      app.listen(port, () => {
        console.log(`🚀 Server running on port: ${port}`);
        console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
        console.log(`🔗 Health check: http://localhost:${port}/api/health`);
      });
    } catch (error) {
      console.error("❌ Failed to start server:", error);
      process.exit(1);
    }
  }

  public static verifyExistParams(...values: (string | number)[]): boolean {
    return values.every((value) => value);
  }
}
