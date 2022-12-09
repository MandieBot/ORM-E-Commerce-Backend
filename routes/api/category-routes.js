const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

//http://localhost:3001/api/categories
router.get("/", async (req, res) => {
  try {
    //include
    const catData = await Category.findAll();
    return res.json(catData);
  } catch (error) {
    res.status(500).json(error);
  }
  // find all categories
  // be sure to include its associated Products
  //this will be a type of join using Sequelize
});
//http://localhost:3001/api/categories/:id
router.get("/:id", async (req, res) => {
  try {
    //include
    const catData = await Category.findByPk(req.params.id);
    res.status(200).json(catData);
  } catch (error) {}
});

// try {
//   const userData = await User.findByPk(req.params.id);
//   if (!userData) {
//     res.status(404).json({ message: "No user with this id!" });
//     return;
//   }
//   res.status(200).json(userData);
// } catch (err) {
//   res.status(500).json(err);
// }
// find one category by its `id` value
// be sure to include its associated Products

//http://localhost:3001/api/categories
router.post("/", (req, res) => {
  // create a new category
});

//http://localhost:3001/api/categories/:id
router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

////http://localhost:3001/api/categories/:id
router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
