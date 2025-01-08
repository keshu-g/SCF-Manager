import express from "express";
import { validate } from "../middlewares/validation.middleware.js";
import {
  createClient,
  updateClient,
  deleteClient,
  getClients,
  getClient,
} from "../controllers/client.controller.js";
import {
  getClientSchema,
  addClientSchema,
  updateClientSchema,
} from "../validations/client.validation.js";

const router = express.Router();

router.get("/", getClients);
router.get("/:id", validate(getClientSchema, "params"), getClient);
router.post("/", validate(addClientSchema, "body"), createClient);
router.put("/", validate(updateClientSchema, "body"), updateClient);
router.delete("/:id", validate(getClientSchema, "params"), deleteClient);

export default router;
