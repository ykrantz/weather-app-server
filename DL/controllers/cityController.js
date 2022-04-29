const { city } = require("../models/IndexModel");

const read = async (filter, proj) => {
  return await city.find(filter, proj);
};

const readAndPopulate = async (filter, proj, populate) => {
  return await city.find(filter, proj).populate(populate);
};

const readOne = async (filter, proj) => {
  return await city.findOne(filter, proj);
};

const readOneAndPopulate = async (filter, proj, populate) => {
  return await city.findOne(filter, proj).populate(populate);
};

const create = async (newData) => {
  return await city.create(newData);
};

const update = async (id, updatedData) => {
  return await city.findByIdAndUpdate(id, updatedData, { new: true });
};

const deleteOne = async (id) => {
  return await city.deleteOne(id);
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

// test:
// require("dotenv").config();
// require("../db").connect();

// async function createTest() {
//   const ans = await create({ name: "test2" });

//   console.log(ans);
// }
// createTest();
