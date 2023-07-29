const express = require("express");

const router = express.Router();

const { validateBody, validateBodyFavorite, isValidId, authentication} = require("../../middlewares");

const { schemas } = require("../../models/contact");

const { getAll, getById, add, updateById, updateStatusContact, deleteById } = require('../../controllers/contacts');

router.get("/", authentication, getAll);

router.get("/:id", authentication, isValidId, getById);

router.post("/", authentication, validateBody(schemas.addSchema), add); 

router.delete("/:id", authentication, isValidId, deleteById);

router.put("/:id", authentication, isValidId, validateBody(schemas.addSchema),updateById); 

router.patch("/:id/favorite", authentication, isValidId, validateBodyFavorite(schemas.updateFavoriteSchema), updateStatusContact);

module.exports = router;
