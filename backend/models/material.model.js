import { Schema, model } from "mongoose";

const materialSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity can not be less than 0"],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can not be less than 0"],
    },
    unit: {
      type: String,
      enum: ["kilogram", "gram", "liter", "milliliter", "piece"],
      default: "piece",
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "DELETED"],
      default: "ACTIVE",
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

const Material = model("Material", materialSchema);

export default Material;
