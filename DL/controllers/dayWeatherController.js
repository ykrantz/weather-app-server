const { dayWeather } = require("../models/IndexModel");

const read = async (filter, proj) => {
  return await dayWeather.find(filter, proj);
};

const readAndPopulate = async (filter, proj, populate) => {
  return await dayWeather.find(filter, proj).populate(populate);
};

const readOne = async (filter, proj) => {
  return await dayWeather.findOne(filter, proj);
};

const readOneAndPopulate = async (filter, proj, populate) => {
  return await dayWeather.findOne(filter, proj).populate(populate);
};

const create = async (newData) => {
  return await dayWeather.create(newData);
};

const update = async (id, updatedData) => {
  return await dayWeather.findByIdAndUpdate(id, updatedData, { new: true });
};

const deleteOne = async (id) => {
  return await dayWeather.deleteOne(id);
};

module.exports = {
  read,
  readAndPopulate,
  readOne,
  readOneAndPopulate,
  create,
  update,
  deleteOne,
};
