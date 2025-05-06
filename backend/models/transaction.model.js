import { Schema, model } from "mongoose";

const materialSchema = new Schema({
  material: {
    type: Schema.Types.ObjectId,
    ref: "Material",
  },
  action: {
    type: String,
    enum: ["ADD", "REMOVE"],
  },
  actionQuantity: {
    type: Number,
    min: [0, "Quantity can't be negative"],
  },
  beforeQuantity: {
    type: Number,
  },
  afterQuantity: {
    type: Number,
  },
});

const productSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client",
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, "Quantity can't be negative"],
  },
  summery: {
    type: Schema.Types.Mixed,
    required: true,
  }
});

const transactionSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["MATERIAL", "PRODUCT"],
      required: true,
    },
    materials: {
      type: [materialSchema],
      required: false,
    },
    product: {
      type: productSchema,
      required: false,
    },
    description: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Transaction = model("Transaction", transactionSchema);

export default Transaction;
