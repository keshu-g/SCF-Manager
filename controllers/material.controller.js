const { materialModel } = require("../models");
const { apiResponse, apiError, apiHandler } = require("../utils/apiHandler");
const {
  FETCH,
  EXISTS,
  NOT_FOUND,
  ADD_SUCCESS,
  UPDATE_SUCCESS,
  DELETE_SUCCESS,
} = require("../utils/messages");

const getMaterials = apiHandler(async (req, res) => {
  const materials = await materialModel.find();
  return apiResponse(FETCH, "Materials", materials, res);
});

const getMaterial = apiHandler(async (req, res) => {
  const material = await materialModel.findOne({ _id: req.params.id });
  return apiResponse(FETCH, "Material", material, res);
});

const createMaterial = apiHandler(async (req, res) => {
  const materialData = req.body;

  const existingMaterial = await materialModel.findOne({
    name: materialData.name,
  });

  if (existingMaterial) {
    return apiError(EXISTS, "Material with this name", null, res);
  }

  materialData.createdBy = req.user._id;

  const material = await materialModel.create(materialData);
  return apiResponse(ADD_SUCCESS, "Material", material, res);
});

const updateMaterial = apiHandler(async (req, res) => {
  const materialData = req.body;

  const material = await materialModel.findOne({ _id: materialData.id });

  if (!material) {
    return apiError(NOT_FOUND, "Material", null, res);
  }

  material.updatedBy = req.user._id;

  const updatedMaterial = await materialModel.findOneAndUpdate(
    { _id: materialData.id },
    materialData,
    {
      new: true,
    }
  );

  return apiResponse(UPDATE_SUCCESS, "Material", updatedMaterial, res);
});

const deleteMaterial = apiHandler(async (req, res) => {
  const materialData = await materialModel.findOneAndDelete({
    _id: req.params.id,
  });

  if (!materialData) {
    return apiError(NOT_FOUND, "Material", null, res);
  }

  return apiResponse(DELETE_SUCCESS, "Material", null, res);
});

module.exports = {
  getMaterials,
  getMaterial,
  createMaterial,
  updateMaterial,
  deleteMaterial,
};
