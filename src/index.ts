import express, { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { errorMiddleware } from "./libs/middlewares/error.middleware";
import { env } from "./libs/config/env";
import routes from "./app/routes";

export const createApp = (): Express => {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  });

  app.use(limiter);
  app.use("/api", routes);
  app.use(errorMiddleware);

  return app;
};

const app = createApp();
app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
