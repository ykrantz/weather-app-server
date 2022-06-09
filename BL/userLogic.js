const user = require("../DL/controllers/userController");
const Respond = require("../Utils/respondFormat");

// search from CitiesApi:

const createUser = async (userDetails) => {
  const { userName, password } = userDetails;

  if (userName && password) {
    const newUser = await user.create({ userName, password });
    // console.log({ newUser });
    if (newUser) {
      return new Respond(200, newUser);
    } else {
      // return { code: 404, data: "no cities wasn't found" };
      return new Respond(404, "", "no user was created");
    }
  } else {
    // return { code: 404, data: "no cities wasn't found" };
    return new Respond(404, "", "no user was created becuase no details");
  }
};

module.exports = {
  createUser,
};

// test

// require("../DL/db")
//   .connect()
//   .then(() => {
//     console.log("***connected succsesfuly to DB***");
//   });

// const testFunc = async () => {
//   const cityId = await getCity_id("london", "gb");
//   console.log({ cityId });
//   const dityDet = await city.readOne({ _id: cityId });
//   console.log("@@@@@", { dityDet });

//   const dityDet2 = await getCityDetails("london", "gb");
//   console.log({ dityDet2 });
// };

// testFunc();
