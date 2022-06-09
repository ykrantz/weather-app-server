const express = require("express");
const router = express.Router();
const user = require("../BL/userLogic");

router.get("/", async (req, res) => {
  try {
    console.log("user");
    res.status(200).json({ message: "user" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "internal server eror" });
  }
});

// create user:
router.post("/", async (req, res) => {
  try {
    console.log("###");
    const userDetails = req.body;
    // console.log({ userDetails });

    const userCreated = await user.createUser(userDetails);
    res
      .status(userCreated?.code)
      .json(userCreated?.data || userCreated?.message);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "internal server eror" });
  }
});

module.exports = router;
