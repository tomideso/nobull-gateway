import { NextFunction, Request, Response, Router } from "express";
import { PaymentServiceImpl } from "@/services/PaymentService"
import TYPES from "@/config/types";
import container from "../container/inversify.config";
import { AppError } from "@/ErrorHandler/AppError";

export default () => {

    const PaymentService = container.get<PaymentServiceImpl>(
        TYPES.PaymentService
    );

    const router = Router();

    router.post(
        "/init",
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                // const session = res.locals.user;
                const payment = await PaymentService.pay(req.body);
                // const payment = await PaymentService.pay({ ...req.body, userId: session?.user?.id });

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
