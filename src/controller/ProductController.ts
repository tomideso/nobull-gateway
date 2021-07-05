import { NextFunction, Request, Response, Router } from "express";
import { ProductServiceImpl } from "@/services/ProductService"
import TYPES from "@/config/types";
import container from "../container/inversify.config";
import { AppError } from "@/ErrorHandler/AppError";

export default () => {
  const ProductService = container.get<ProductServiceImpl>(
    TYPES.ProductService
  );
  const router = Router();

  router.post(
    "/create",
    async (req: Request, res: Response, next: NextFunction) => {
      const { name, description, recurring, url, paid } = req.body;
      try {
        const configuration = await ProductService.create({ name, description, recurring, url, paid });
        res.send(configuration);
      } catch (error) {
        const err = new AppError("Error Creating Product", 400);
        return next(err);
      }
    }
  );

  router.put(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      const { name, description, recurring, url, paid } = req.body;

      try {
        const configuration = await ProductService.update(
          req.params.id,
          { name, description, recurring, url, paid }
        );
        res.send(configuration);
      } catch (error) {
        const err = new AppError("Error updating product", 400);
        return next(err);
      }
    }
  );

  router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await ProductService.getAll();
      res.send(products);
    } catch (error) {
      console.log(error);
      const err = new AppError("Error getting products list", 400);
      return next(err);
    }
  });

  return router;
};
