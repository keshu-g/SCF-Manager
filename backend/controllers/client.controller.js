import { clientModel } from "../models/index.js";
import { apiResponse, apiError, apiHandler } from "../utils/api.util.js";
import messages from "../utils/messages.util.js";

const getClients = apiHandler(async (req, res) => {
  const clients = await clientModel.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "client",
        as: "products",
      },
    },
    {
      $addFields: {
        productCount: { $size: "$products" },
      },
    },
    {
      $project: {
        products: 0,
      },
    },
  ]);

  return apiResponse(messages.FETCH, "Clients", clients, res);
});

const getClient = apiHandler(async (req, res) => {
  const client = await clientModel.findOne({ _id: req.params.id });

  if (!client) {
    return apiError(messages.NOT_FOUND, "Client", null, res);
  }

  return apiResponse(messages.FETCH, "Client", client, res);
});

const createClient = apiHandler(async (req, res) => {
  const clientData = req.body;

  const existingClient = await clientModel
    .findOne({
      name: clientData.name,
    })
    .collation({ locale: "en", strength: 2 });

  if (existingClient) {
    return apiError(messages.EXISTS, "Client with this name", null, res);
  }

  clientData.createdBy = req.user._id;

  const client = await clientModel.create(clientData);
  return apiResponse(messages.ADD_SUCCESS, "Client", client, res);
});

const updateClient = apiHandler(async (req, res) => {
  const clientData = req.body;

  const client = await clientModel.findOne({ _id: clientData.id });

  if (!client) {
    return apiError(messages.NOT_FOUND, "Client", null, res);
  }

  const existingClient = await clientModel
    .findOne({
      name: clientData.name,
      _id: { $ne: clientData.id },
    })
    .collation({ locale: "en", strength: 2 });

  if (existingClient) {
    return apiError(messages.EXISTS, "Client with this name", null, res);
  }

  client.updatedBy = req.user._id;

  const updatedClient = await clientModel.findOneAndUpdate(
    { _id: clientData.id },
    clientData,
    {
      new: true,
    }
  );

  return apiResponse(messages.UPDATE_SUCCESS, "Client", updatedClient, res);
});

const deleteClient = apiHandler(async (req, res) => {
  const clientData = await clientModel.findOneAndDelete({
    _id: req.params.id,
  });

  if (!clientData) {
    return apiError(messages.NOT_FOUND, "Client", null, res);
  }

  return apiResponse(messages.DELETE_SUCCESS, "Client", null, res);
});

export { getClients, getClient, createClient, updateClient, deleteClient };
