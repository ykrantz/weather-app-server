const { citySearch } = require("../models/IndexModel");

const read = async (filter, proj) => {
  return await citySearch.find(filter, proj);
};

const readAndPopulate = async (filter, proj, populate) => {
  return await citySearch.find(filter, proj).populate(populate);
};

const readOne = async (filter, proj) => {
  return await citySearch.findOne(filter, proj);
};

const readOneAndPopulate = async (filter, proj, populate) => {
  return await citySearch.findOne(filter, proj).populate(populate);
};

const create = async (newData) => {
  return await citySearch.create(newData);
};

const update = async (id, updatedData) => {
  return await citySearch.findByIdAndUpdate(id, updatedData, { new: true });
};

const deleteOne = async (id) => {
  return await citySearch.deleteOne(id);
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
