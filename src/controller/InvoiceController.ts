import { NextFunction, Request, Response, Router } from "express";
import { InvoiceServiceImpl } from "@/services/InvoiceService"
import TYPES from "@/config/types";
import container from "../container/inversify.config";
import { AppError } from "@/ErrorHandler/AppError";

export default () => {
  const InvoiceService = container.get<InvoiceServiceImpl>(
    TYPES.InvoiceService
  );
  const router = Router();


  router.get(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      const { name, description, recurring, url, paid } = req.body;

      try {
        const invoice = await InvoiceService.getByUserID(
          req.params.id,
        );
        res.send(invoice);
      } catch (error) {
        const err = new AppError("Error getting invoice ", 400);
        return next(err);
      }
    }
  );


  return router;
};
