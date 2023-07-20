const express = require("express");

const router = express.Router();

const { validateBody, validateBodyFavorite, isValidId} = require("../../middlewares");

const { schemas } = require("../../models/contact");

const { getAll, getById, add, updateById, updateStatusContact, deleteById } = require('../../controllers/contacts');

router.get("/", getAll);

router.get("/:id", isValidId, getById);

router.post("/", validateBody(schemas.addSchema), add);

router.delete("/:id", isValidId, deleteById);

router.put("/:id", isValidId, validateBody(schemas.addSchema), updateById);

router.patch("/:id/favorite", isValidId, validateBodyFavorite(schemas.updateFavoriteSchema), updateStatusContact);

module.exports = router;
