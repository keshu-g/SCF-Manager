import { materialModel, productModel } from "../models/index.js";
import { apiResponse, apiError, apiHandler } from "../utils/apiHelper.js";
import messages from "../utils/messages.js";

const getMaterials = apiHandler(async (req, res) => {
  const materials = await materialModel.find();
  return apiResponse(messages.FETCH, "Materials", materials, res);
});

const getMaterial = apiHandler(async (req, res) => {
  const material = await materialModel.findOne({ _id: req.params.id });

  if (!material) {
    return apiError(messages.NOT_FOUND, "Material", null, res);
  }

  return apiResponse(messages.FETCH, "Material", material, res);
});

const createMaterial = apiHandler(async (req, res) => {
  const materialData = req.body;

  const existingMaterial = await materialModel.findOne({
    name: materialData.name,
  });

  if (existingMaterial) {
    return apiError(messages.EXISTS, "Material with this name", null, res);
  }

  materialData.createdBy = req.user._id;

  const material = await materialModel.create(materialData);
  return apiResponse(messages.ADD_SUCCESS, "Material", material, res);
});

const updateMaterial = apiHandler(async (req, res) => {
  const materialData = req.body;

  const material = await materialModel.findOne({ _id: materialData.id });

  if (!material) {
    return apiError(messages.NOT_FOUND, "Material", null, res);
  }

  const existingMaterial = await materialModel.findOne({
    name: materialData.name,
    _id: { $ne: materialData.id },
  });

  if (existingMaterial) {
    return apiError(messages.EXISTS, "Material with this name", null, res);
  }

  material.updatedBy = req.user._id;

  const updatedMaterial = await materialModel.findOneAndUpdate(
    { _id: materialData.id },
    materialData,
    {
      new: true,
    }
  );

  return apiResponse(messages.UPDATE_SUCCESS, "Material", updatedMaterial, res);
});

const deleteMaterial = apiHandler(async (req, res) => {

  let products = await productModel.find({ "formula.material": req.params.id });

  if (products.length > 0) {
    return apiError(messages.ITEM_IN_USE, "Material", null, res);
  }

  const materialData = await materialModel.findOneAndDelete({
    _id: req.params.id,
  });

  if (!materialData) {
    return apiError(messages.NOT_FOUND, "Material", null, res);
  }

  return apiResponse(messages.DELETE_SUCCESS, "Material", null, res);
});

export {
  getMaterials,
  getMaterial,
  createMaterial,
  updateMaterial,
  deleteMaterial,
};
