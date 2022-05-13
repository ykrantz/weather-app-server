const { userFavorites } = require("../models/IndexModel");

const read = async (filter, proj) => {
  return await userFavorites.find(filter, proj);
};

const readAndPopulate = async (filter, proj, populate) => {
  return await userFavorites.find(filter, proj).populate(populate);
};

const readOne = async (filter, proj) => {
  return await userFavorites.findOne(filter, proj);
};

const readOneAndPopulate = async (filter, proj, populate) => {
  return await userFavorites.findOne(filter, proj).populate(populate);
};

const create = async (newData) => {
  return await userFavorites.create(newData);
};

const update = async (id, updatedData) => {
  return await userFavorites.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
};

const updateByFilter = async (filter, updatedData) => {
  return await userFavorites.findByIdAndUpdate(filter, updatedData, {
    new: true,
    upsert: true,
  });
};

const deleteOne = async (id) => {
  return await userFavorites.deleteOne(id);
};

module.exports = {
  read,
  readAndPopulate,
  readOne,
  readOneAndPopulate,
  create,
  update,
  updateByFilter,
  deleteOne,
};

// test:

// test

// require("../db")
//   .connect()
//   .then(() => {
//     console.log("***connected succsesfuly to DB***");
//   });

// const testFunc = async () => {
//   // const tst = new ObjectId("6269776952765d09814f9106");
//   const cityWeat = await readOneAndPopulate(
//     {
//       city: "62698e6dccd844d25cb4a1f7",
//       // city: tst.toString(),
//     },
//     "",
//     "city"
//   );

//   // const cityWeat = await readOne({
//   //   city: "62698e6dccd844d25cb4a1f7",
//   //   // city: tst.toString(),
//   // });
//   console.log("GG");
//   console.log({ cityWeat });
//   // const dityDet = await city.readOne({ _id: cityId });
//   // console.log("@@@@@", { dityDet });

//   // const dityDet2 = await getCityDetails("london", "gb");
//   // console.log({ dityDet2 });
// };

// testFunc();
