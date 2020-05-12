const router = require("express").Router();
const Users = require("./users-model");
const restrict = require("../middleware/restricted");

router.get("/",restrict(), async (req, res, next) => {
  try {
    const userList = await Users.getUsers();
    if (!userList) {
      res.status(404).json({
        message: "could not get users",
      });
    } else {
      console.log(process.env.SECRET)
      res.status(200).json(userList);
    }
  } catch (err) {
    next(err);
  }
});



module.exports = router;
