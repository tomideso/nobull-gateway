import { injectable, inject } from "inversify";
import { AppError } from "@/ErrorHandler/AppError";
import { InvoiceService } from "./InvoiceService";
import TYPES from "@/config/types";
import { SubscriptionService } from "./SubscriptionService";
import { PaymentPlanService } from "./PaymentPlanService";
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

            const productPlan = await this.paymentPlanService.getByProductID(productId);
            // get amount from product plan

            const payment = await stripe.paymentIntents.create({
                amount,
                currency: "USD",
                description,
                payment_method,
                confirm: true
            })

            await this.invoiceService.create({ account: userId, product: productId, description, amount });
            // await this.subscriptionService.create({ account: userId, product: productId,billingId:payment.billingId, active: true });

            return {
                message: "Payment successful",
                success: true
            }
            //save to DB

        } catch (error) {
            throw new AppError("Payment Failed", 400);
        }
    }

}

export interface PaymentService {
    pay(config): Promise<any>;
}
