import { Schema, model } from "mongoose";

const transactionSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["MATERIAL", "PRODUCT"],
      required: true,
    },
    materials: [
      {
        material: {
          type: Schema.Types.ObjectId,
          ref: "Material",
          required: true,
        },
        action: {
          type: String,
          enum: ["ADD", "REMOVE"],
          required: true,
        },
        actionQuantity: {
          type: Number,
          required: true,
          min: [0, "Quantity can't be negative"],
        },
        beforeQuantity: {
          type: Number,
          required: true,
        },
        afterQuantity: {
          type: Number,
          required: true,
        },
      },
    ],
    product: {
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
      },
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
