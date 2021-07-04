import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const PaymentPlanSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
        unique: true
    },
    trialPeriod: { type: Number, default: 0 },
    trialCost: { type: Number, default: 0 },
    monthlyCost: { type: Number, default: 0 },
    yearlyCost: { type: Number, default: 0 },
    flatCost: { type: Number, default: 0 },
}, {
    timestamps: true
});

export default mongoose.model("PaymentPlan", PaymentPlanSchema);
