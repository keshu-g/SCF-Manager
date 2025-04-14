import { Schema, model } from "mongoose";

const formulaSchema = new Schema({
  material: {
    type: Schema.Types.ObjectId,
    ref: "Material",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const productSchema = new Schema(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    formula: [formulaSchema],
    otherCosts: [
      {
        name: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
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

const Product = model("Product", productSchema);

export default Product;
