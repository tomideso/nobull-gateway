import { NextFunction, Request, Response, Router } from "express";
import { PaymentServiceImpl } from "@/services/PaymentService"
import TYPES from "@/config/types";
import container from "../container/inversify.config";
import { AppError } from "@/ErrorHandler/AppError";

export default () => {
    const PaymentService = container.get<PaymentServiceImpl>(
        TYPES.PaymentPlanService
    );
    const router = Router();

    router.post(
        "/init",
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const payment = await PaymentService.pay(req.body);

                res.json({
                    message: "Payment successful",
                    success: true
                })
            } catch (error) {
                return next(error);
            }
        }
    );



    return router;
};
