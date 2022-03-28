import { NextFunction, Request, Response, Router } from "express";
import { PaymentPlanServiceImpl } from "@/services/PaymentPlanService"
import TYPES from "@/config/types";
import container from "../container/inversify.config";
import { AppError } from "@/ErrorHandler/AppError";

export default () => {
    const PaymentPlanService = container.get<PaymentPlanServiceImpl>(
        TYPES.PaymentPlanService
    );
    const router = Router();

    router.post(
        "/create",
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const configuration = await PaymentPlanService.create(req.body);
                res.send(configuration);
            } catch (error) {
                const err = new AppError("Error Creating Product", 400);
                return next(err);
            }
        }
    );

    router.put(
        "/product/:id",
        async (req: Request, res: Response, next: NextFunction) => {

            try {
                const configuration = await PaymentPlanService.updateByProductId(
                    req.params.id,
                    req.body
                );
                res.send(configuration);
            } catch (error) {
                const err = new AppError("Error updating Plan", 400);
                return next(err);
            }
        }
    );

    router.put(
        "/:id",
        async (req: Request, res: Response, next: NextFunction) => {

            try {
                const configuration = await PaymentPlanService.update(
                    req.params.id,
                    req.body
                );
                res.send(configuration);
            } catch (error) {
                const err = new AppError("Error updating Plan", 400);
                return next(err);
            }
        }
    );

    router.get("/product/:id", async (req: Request, res: Response, next: NextFunction) => {
        try {
            const plans = await PaymentPlanService.getByProductID(req.params.id);
            res.send(plans);
        } catch (error) {
            console.log(error);
            const err = new AppError("Error getting plan", 400);
            return next(err);
        }
    });


    router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
        try {
            const plans = await PaymentPlanService.getByID(req.params.id);
            res.send(plans);
        } catch (error) {
            console.log(error);
            const err = new AppError("Error getting plan", 400);
            return next(err);
        }
    });

    router.get("/", async (req: Request, res: Response, next: NextFunction) => {
        try {
            const plans = await PaymentPlanService.getAll();
            res.send(plans);
        } catch (error) {
            console.log(error);
            const err = new AppError("Error getting plan list", 400);
            return next(err);
        }
    });

    return router;
};
