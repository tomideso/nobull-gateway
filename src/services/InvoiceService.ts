import { injectable, inject } from "inversify";
import { AppError } from "@/ErrorHandler/AppError";
import InvoiceSchema from "@/entity/Invoice";

@injectable()
export class InvoiceServiceImpl implements InvoiceService {

    public async create({ account, description, amount, product }) {

        try {
            const configuration = new InvoiceSchema();
            Object.assign(configuration, { account, description, amount, product });

            return await configuration.save();
        } catch (error) {
            throw new AppError(error, 400);
        }
    }


    public async getByUserID(userId) {
        try {
            const invoice = await InvoiceSchema.find({ "account.userId": userId }).lean();
            return await invoice;
        } catch (error) {
            throw new AppError("Error finding invoces", 400);
        }
    }


}

export interface InvoiceService {
    create(config): Promise<any>;
    getByUserID(id): Promise<any>;
}
