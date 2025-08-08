import {
  transactionModel,
  productModel,
  materialModel,
} from "../models/index.js";
import { apiResponse, apiError, apiHandler } from "../utils/api.util.js";
import messages from "../utils/messages.util.js";

const manufactureProduct = apiHandler(async (req, res) => {
  const { productId, quantity, description } = req.body;

  let product = await productModel
    .findById(productId)
    .populate({ path: "formula.material", select: "_id name price quantity" });

  if (!product) {
    return apiError(messages.NOT_FOUND, "Product", null, res);
  }

  let transaction = new transactionModel({
    type: "PRODUCT",
    product: {
      client: product.client,
      product: productId,
      quantity: quantity,
      summery: {
        name: product.name,
        sellingPrice: product.price,
        material: [],
        otherCosts: product.otherCosts,
        cashDiscount: product.cashDiscount,
      },
    },
    description: description,
    createdBy: req.user._id,
    updatedBy: req.user._id,
  });

  for (let unit of product.formula) {
    let material = unit.material;
    let materialId = material._id;
    let materialQuantity = unit.quantity * quantity;

    await materialModel.findByIdAndUpdate(materialId, {
      $inc: { quantity: -materialQuantity },
    });

    transaction.product.summery.material.push({
      material: materialId,
      name: material.name,
      price: material.price,
      quantity: unit.quantity,
      totalQuantity: materialQuantity,
      totalPrice: material.price * materialQuantity,
      beforeQuantity: material.quantity,
      afterQuantity: material.quantity - materialQuantity,
    });
  }

  await transaction.save();

  return apiResponse(messages.ADD_SUCCESS, "Transaction", transaction, res);
});

const materialTransaction = apiHandler(async (req, res) => {
  const { materials, description } = req.body;

  for (let material of materials) {
    let materialId = material.materialId;
    let action = material.action;
    let actionQuantity = material.actionQuantity;

    let materialData = await materialModel.findById(materialId);

    if (!materialData) {
      return apiError(messages.NOT_FOUND, "Material", null, res);
    }

    if (action === "ADD") {
      await materialModel.findByIdAndUpdate(materialId, {
        $inc: { quantity: actionQuantity },
      });

      material.beforeQuantity = materialData.quantity;
      material.afterQuantity = materialData.quantity + actionQuantity;
    } else if (action === "REMOVE") {
      await materialModel.findByIdAndUpdate(materialId, {
        $inc: { quantity: -actionQuantity },
      });

      material.beforeQuantity = materialData.quantity;
      material.afterQuantity = materialData.quantity - actionQuantity;
    }
  }
  let transaction = new transactionModel({
    type: "MATERIAL",
    materials: materials.map((material) => ({
      material: material.materialId,
      action: material.action,
      actionQuantity: material.actionQuantity,
      beforeQuantity: material.beforeQuantity,
      afterQuantity: material.afterQuantity,
    })),
    description: description,
    createdBy: req.user._id,
    updatedBy: req.user._id,
  });

  await transaction.save();

  return apiResponse(messages.ADD_SUCCESS, "Transaction", transaction, res);
});

const getTransactions = apiHandler(async (req, res) => {
  const transactions = await transactionModel
    .find()
    .sort({ createdAt: -1 })
    .populate([
      {
        path: "product.product",
        select: "_id name",
      },
      {
        path: "product.client",
        select: "_id name",
      },
      {
        path: "materials.material",
        select: "_id name",
      },
    ]);
  return apiResponse(messages.FETCH, "Transactions", transactions, res);
});

export { manufactureProduct, materialTransaction, getTransactions };
