import { injectable, inject } from "inversify";
import { AppError } from "@/ErrorHandler/AppError";
import SubscriptionSchema from "@/entity/Subscription";

@injectable()
export class SubscriptionServiceImpl implements SubscriptionService {


    public async create({ product, account, paymentPlan, active }) {

        try {
            const configuration = new SubscriptionSchema();
            Object.assign(configuration, { product, account, paymentPlan, active });

            return await configuration.save();
        } catch (error) {
            throw new AppError(error, 400);
        }
    }

    public async enable(id) {

        try {
            const saved = await SubscriptionSchema.findOneAndUpdate({ product: id },
                { $set: { active: true } }, {
                new: true,
            });

            return saved;
        } catch (error) {
            throw new AppError(error, 400);
        }
    }

    public async disable(id) {

        try {
            const saved = await SubscriptionSchema.findOneAndUpdate({ product: id },
                { $set: { active: false } }, {
                new: true,
            });

            return saved;
        } catch (error) {
            throw new AppError(error, 400);
        }
    }

    public async getAllByUser(userId) {
        try {
            const config = await SubscriptionSchema.find({ account: userId }).lean();
            return await config;
        } catch (error) {
            throw new AppError("Error finding Payment Plans", 400);
        }
    }


}

export interface SubscriptionService {
    create(config): Promise<any>;
    enable(id: String): Promise<any>;
    disable(id: String): Promise<any>;
    getAllByUser(accountId: String): Promise<any>;
}