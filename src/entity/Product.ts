import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    recurring: { type: Boolean, default: false },
    description: String,
    name: String,
    url: String,
    logo: String
}, { timestamps: true });

export default mongoose.model("Product", ProductSchema);
