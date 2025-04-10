import { clientModel, materialModel, productModel } from "../models/index.js";
import { apiResponse, apiError, apiHandler } from "../utils/api.util.js";
import messages from "../utils/messages.util.js";

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

const getProductsByClient = apiHandler(async (req, res) => {
  const id = req.params.id;

  const products = await productModel
    .find({ client: id })
    .populate("formula.material");
  if (!products) {
    return apiError(messages.NOT_FOUND, "Products", null, res);
  }

  return apiResponse(messages.FETCH, "Products", products, res);
});

const createProduct = apiHandler(async (req, res) => {
  const productData = req.body;

  const client = await clientModel.findOne({ _id: productData.client });

  if (!client) {
    return apiError(messages.NOT_FOUND, "Client", null, res);
  }

  const existingProduct = await productModel
    .findOne({
      name: productData.name,
    })
    .collation({ locale: "en", strength: 2 });

  if (existingProduct) {
    return apiError(messages.EXISTS, "Product with this name", null, res);
  }

  let materialIds = productData.formula.map((formula) => formula.material);
  if (materialIds.length !== new Set(materialIds).size) {
    return apiError(
      messages.CUSTOM_ERROR,
      "Product formula contains repeated materials",
      null,
      res
    );
  }
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

  const existingProduct = await productModel.findOne({
    name: productData.name,
    _id: { $ne: productData.id },
  });

  if (existingProduct) {
    return apiError(messages.EXISTS, "Product with this name", null, res);
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

const manufactureProduct = apiHandler(async (req, res) => {
  let productId = req.params.id;

  let productData = await productModel.findById(productId);

  if (!productData) {
    return apiError(messages.NOT_FOUND, "Product", null, res);
  }

  let materialIds = productData.formula.map((formula) => formula.material);

  let materials = await materialModel.find({ _id: { $in: materialIds } });

  if (materials.length !== materialIds.length) {
    return apiError(messages.NOT_FOUND, "Material", null, res);
  }

  for (const formula of productData.formula) {
    const material = materials.find(
      (m) => m._id.toString() === formula.material.toString()
    );

    if (!material) {
      return apiError(messages.NOT_FOUND, "Material", null, res);
    }

    if (material.quantity < formula.quantity) {
      return apiError(messages.INSUFFICIENT_QUANTITY, material.name, null, res);
    }

    material.quantity -= formula.quantity;
    await material.save();
  }

  return apiResponse(messages.UPDATE_SUCCESS, "Material", materials, res);
});

export {
  getProducts,
  getProduct,
  getProductsByClient,
  createProduct,
  updateProduct,
  deleteProduct,
  manufactureProduct,
};
