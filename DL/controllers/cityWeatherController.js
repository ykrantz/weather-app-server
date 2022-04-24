const { cityWeather } = require("../models/IndexModel");

const read = async (filter, proj) => {
  return await cityWeather.find(filter, proj);
};

const readAndPopulate = async (filter, proj, populate) => {
  return await cityWeather.find(filter, proj).populate(populate);
};

const readOne = async (filter, proj) => {
  return await cityWeather.findOne(filter, proj);
};

const readOneAndPopulate = async (filter, proj, populate) => {
  return await cityWeather.findOne(filter, proj).populate(populate);
};

const create = async (newData) => {
  return await cityWeather.create(newData);
};

const update = async (id, updatedData) => {
  return await cityWeather.findByIdAndUpdate(id, updatedData);
};

const deleteOne = async (id) => {
  return await cityWeather.deleteOne(id);
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
