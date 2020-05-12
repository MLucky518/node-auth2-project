const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    message: "ayyyye",
  });
});

module.exports = router;
