import { clientModel, materialModel, productModel } from "../models/index.js";
import { apiResponse, apiError, apiHandler } from "../utils/apiHelper.js";
import messages from "../utils/messages.js";

const getProducts = apiHandler(async (req, res) => {
  const products = await productModel.find();
  return apiResponse(messages.FETCH, "Products", products, res);
});

const getProduct = apiHandler(async (req, res) => {
  const product = await productModel.findOne({ _id: req.params.id });

  if (!product) {
    return apiError(messages.NOT_FOUND, "Product", null, res);
  }

  return apiResponse(messages.FETCH, "Product", product, res);
});

const createProduct = apiHandler(async (req, res) => {
  const productData = req.body;

  const client = await clientModel.findOne({ _id: productData.client });

  if (!client) {
    return apiError(messages.NOT_FOUND, "Client", null, res);
  }

  let materialIds = productData.formula.map((formula) => formula.material);
  materialIds = [...new Set(materialIds)];

  const materials = await materialModel.find({ _id: { $in: materialIds } });

  if (materials.length !== materialIds.length) {
    return apiError(messages.NOT_FOUND, "Material", null, res);
  }

  const product = await productModel.create(productData);

  return apiResponse(messages.ADD_SUCCESS, "Product", product, res);
});

const updateProduct = apiHandler(async (req, res) => {
  const productData = req.body;

  const client = await clientModel.findOne({ _id: productData.client });

  if (!client) {
    return apiError(messages.NOT_FOUND, "Client", null, res);
  }

  const product = await productModel.findOne({ _id: productData.id });

  if (!product) {
    return apiError(messages.NOT_FOUND, "Product", null, res);
  }

  let materialIds = productData.formula.map((formula) => formula.material);
  materialIds = [...new Set(materialIds)];

  const materials = await materialModel.find({ _id: { $in: materialIds } });

  if (materials.length !== materialIds.length) {
    return apiError(messages.NOT_FOUND, "Material", null, res);
  }

  product.updatedBy = req.user._id;

  const updatedProduct = await productModel.findOneAndUpdate(
    { _id: productData.id },
    productData,
    {
      new: true,
    }
  );

  return apiResponse(messages.UPDATE_SUCCESS, "Product", updatedProduct, res);
});

const deleteProduct = apiHandler(async (req, res) => {
  const productData = await productModel.findOneAndDelete({
    _id: req.params.id,
  });

  if (!productData) {
    return apiError(messages.NOT_FOUND, "Product", null, res);
  }

  return apiResponse(messages.DELETE_SUCCESS, "Product", null, res);
});

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
