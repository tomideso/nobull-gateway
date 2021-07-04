import { injectable, inject } from "inversify";
import { AppError } from "@/ErrorHandler/AppError";
import PaymentPlanSchema from "@/entity/PaymentPlan";

@injectable()
export class PaymentPlanServiceImpl implements PaymentPlanService {


  public async create({ trialCost, trialPeriod, monthlyCost, yearlyCost, flatCost, product }) {

    try {
      const configuration = new PaymentPlanSchema();
      Object.assign(configuration, { trialCost, trialPeriod, monthlyCost, yearlyCost, flatCost, product });

      return await configuration.save();
    } catch (error) {
      throw new AppError(error, 400);
    }
  }

  public async update(id, config) {

    const { trialCost, trialPeriod, monthlyCost, yearlyCost, flatCost } = config;

    try {
      const saved = await PaymentPlanSchema.findByIdAndUpdate(id, { trialCost, trialPeriod, monthlyCost, yearlyCost, flatCost }, {
        new: true,
      });

      return saved;
    } catch (error) {
      throw new AppError(error, 400);
    }
  }

  public async updateByProductId(id, config) {
    const { trialCost, trialPeriod, monthlyCost, yearlyCost, flatCost } = config;

    try {
      const saved = await PaymentPlanSchema.findOneAndUpdate({ product: id },
        { trialCost, trialPeriod, monthlyCost, yearlyCost, flatCost }, {
        new: true,
      });

      return saved;
    } catch (error) {
      throw new AppError(error, 400);
    }
  }

  public async getAll() {
    try {
      const config = await PaymentPlanSchema.find().lean();
      return await config;
    } catch (error) {
      throw new AppError("Error finding Payment Plans", 400);
    }
  }


  public async getByID(id) {
    try {
      const config = await PaymentPlanSchema.findById(id).lean();
      return await config;
    } catch (error) {
      throw new AppError("Error finding config", 400);
    }
  }


  public async getByProductID(id) {
    try {
      const config = await PaymentPlanSchema.find({ product: id }).lean();
      return await config;
    } catch (error) {
      throw new AppError("Error finding Payment Plan", 400);
    }
  }
}

export interface PaymentPlanService {
  create(config): Promise<any>;
  update(id, config): Promise<any>;
  updateByProductId(id, config): Promise<any>;
  getByID(id): Promise<any>;
  getByProductID(id): Promise<any>;
  getAll(): Promise<any>;
}



