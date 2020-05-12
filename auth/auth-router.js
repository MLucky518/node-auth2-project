const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../routers/users-model");
const jwt = require("jsonwebtoken");
const restrict = require("../middleware/restricted");

router.post("/register", async (req, res, next) => {
  try {
    const { username } = req.body;
    const newUser = await Users.findBy({ username }).first();
    if (newUser) {
      return res.status(409).json({
        message: "username already in use",
      });
    }
    res.status(201).json(await Users.add(req.body));
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  const authError = {
    message: "Invalid credentials",
  };

  try {
    const user = await Users.findBy({ username: req.body.username }).first();
    if (!user) {
      return res.status(401).json(authError);
    }

    const passwordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordValid) {
      return res.status(401).json(authError);
    }

    const tokenPayload = {
      userId: user.id,
      department: user.department,
    };

    res.cookie("token", jwt.sign(tokenPayload, process.env.SECRET));
    res.json({
      message: `Welcome ${user.username}!`,
      token: jwt.sign(tokenPayload, process.env.SECRET),
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/logout", restrict(), async (req, res, next) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

function generateToken() {}

module.exports = router;
