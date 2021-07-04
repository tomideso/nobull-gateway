import { injectable, inject } from "inversify";
import { AppError } from "@/ErrorHandler/AppError";
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)

@injectable()
export class PaymentServiceImpl implements PaymentService {


    public async pay({ userId, productId, plan, description, amount, paymentMethod: payment_method }) {

        try {

            const payment = await stripe.paymentIntents.create({
                amount,
                currency: "USD",
                description,
                payment_method,
                confirm: true
            })
            //save to DB

        } catch (error) {
            throw new AppError("Payment Failed", 400);

        }
    }

}

export interface PaymentService {
    pay(config): Promise<any>;
}
