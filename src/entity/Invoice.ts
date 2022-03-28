import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    description: String,
    amount: String,
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    account: { type: Schema.Types.ObjectId, ref: "Account" },
}, { timestamps: true });

export default mongoose.model("Invoice", InvoiceSchema);
