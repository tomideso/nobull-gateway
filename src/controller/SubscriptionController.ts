import { NextFunction, Request, Response, Router } from "express";
import { SubscriptionServiceImpl } from "@/services/SubscriptionService"
import TYPES from "@/config/types";
import container from "../container/inversify.config";
import { AppError } from "@/ErrorHandler/AppError";

export default () => {
  const SubscriptionService = container.get<SubscriptionServiceImpl>(
    TYPES.SubscriptionService
  );
  const router = Router();

  router.post(
    "/create",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const config = await SubscriptionService.create(req.body);
        res.send(config);
      } catch (error) {
        const err = new AppError("Error Creating Product", 400);
        return next(err);
      }
    }
  );

  router.put(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {

      try {
        const configuration = await SubscriptionService.disable(
          req.params.id
        );
        res.send(configuration);
      } catch (error) {
        const err = new AppError("Error Disabling subscription", 400);
        return next(err);
      }
    }
  );

  router.get("/user/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subscriptions = await SubscriptionService.getAllByUser(req.params.id);
      res.send(subscriptions);
    } catch (error) {
      console.log(error);
      const err = new AppError("Error getting user subscription list", 400);
      return next(err);
    }
  });

  return router;
};
