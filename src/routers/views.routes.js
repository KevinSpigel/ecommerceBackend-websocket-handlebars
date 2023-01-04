const { Router } = require("express");

const router = Router();

// --> Handlebars test
const testProducts = [
  { item: "Pizza", price: 11 },
  { item: "Hotdog", price: 5 },
];

router.get("/", (req, res) => {
  const user = {
    name: req.query.name,
    isAdmin: req.query.name === "Kevin",
  };

  const data = {
    title: "Dynamic title",
    user,
    list: testProducts,
  };
  res.render("index", data);
});
//<--

module.exports = router;
