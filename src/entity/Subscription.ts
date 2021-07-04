import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: false,
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: "Account",
        required: true,
    },
    active: { type: Boolean, default: false }
}, {
    timestamps: true
});

export default mongoose.model("Subscription", SubscriptionSchema);


