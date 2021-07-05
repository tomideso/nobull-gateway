import { injectable, inject } from "inversify";
import { AppError } from "@/ErrorHandler/AppError";
import { InvoiceService } from "./InvoiceService";
import TYPES from "@/config/types";
import { SubscriptionService } from "./SubscriptionService";
import { PaymentPlanService } from "./PaymentPlanService";
import Account from "@/entity/Account";
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)

@injectable()
export class PaymentServiceImpl implements PaymentService {

    private invoiceService: InvoiceService;
    private subscriptionService: SubscriptionService;
    private paymentPlanService: PaymentPlanService;

    constructor(
        @inject(TYPES.InvoiceService) invoiceService: InvoiceService,
        @inject(TYPES.SubscriptionService) subscriptionService: SubscriptionService,
        @inject(TYPES.PaymentPlanService) paymentPlanService: PaymentPlanService,
    ) {
        this.invoiceService = invoiceService;
        this.subscriptionService = subscriptionService;
        this.paymentPlanService = paymentPlanService;
    }

    public async pay({ userId, productId, plan, description, amount, paymentMethod: payment_method }) {

        try {

            // const user = await Account.findOne({ userId });

            const { monthlyCost, flatCost } = await this.paymentPlanService.getByProductID(productId);
            // get amount from product plan

            switch (plan) {

                case "month":
                    if (amount != monthlyCost) { throw new AppError("Invalid Amount", 400) };
                    break;

                case "single":
                    if (amount != flatCost) { throw new AppError("Invalid Amount", 400) };
                    break;
            }



            const { id: paymentRef } = await stripe.paymentIntents.create({
                amount,
                currency: "USD",
                description,
                payment_method,
                confirm: true
            })

            // await this.invoiceService.create({ account: user._id, product: productId, description, amount });

            // const sub = await this.subscriptionService.create({ account: user._id, product: productId, paymentRef, active: true });
            // await Account.findByIdAndUpdate(user._id, { $addToSet: { subscription: sub._id } })


            return {
                message: "Payment successful",
                success: true
            }
            //save to DB

        } catch (error) {
            console.log(error)
            throw new AppError("Payment Failed", 400);
        }
    }

}

export interface PaymentService {
    pay(config): Promise<any>;
}
