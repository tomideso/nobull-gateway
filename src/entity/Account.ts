import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  userId: { type: String, unique: true },
  subscription: [{ type: Schema.Types.ObjectId, ref: "Subscription" }],
}, {
  timestamps: true
});


export default mongoose.model("Account", AccountSchema);
