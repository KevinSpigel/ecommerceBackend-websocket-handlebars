const { Router } = require("express");

const router = Router();

// --> Handlebars test + Socket test

router.get("/", (req, res) => {
  res.render("index", {});
});

//<--

module.exports = router;
