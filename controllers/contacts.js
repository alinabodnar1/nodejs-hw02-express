const { Contact } = require("../models/contact");
const { decorator } = require("../helpers");

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  // const result = await Contact.findOne({ _id: id });
  const result = await Contact.findById({_id: id});
  if (!result) {
    res.status(404).json({
      message: "Not found",
    });
    return;
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result || result === null) {
    res.status(404).json({
      message: "Not found",
    });
    return;
  }
  res.json({
    message: "Contact deleted",
  });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
  if (!result || result === null) {
    res.status(404).json({
      message: "Not found",
    });
    return;
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
  if (!result || result === null) {
    res.status(404).json({
      message: "Not found",
    });
    return;
  }
  res.json(result);
}


module.exports = {
  getAll: decorator(getAll),
  getById: decorator(getById),
  add: decorator(add),
  deleteById: decorator(deleteById),
  updateById: decorator(updateById),
  updateStatusContact: decorator(updateStatusContact),
};
