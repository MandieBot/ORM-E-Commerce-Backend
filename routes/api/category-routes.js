const router = require("express").Router();
const { Category, Product, ProductTag } = require("../../models");

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
//http://localhost:3001/api/categories
router.get("/", async (req, res) => {
  try {
    const catData = await Category.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    return res.json(catData);
  } catch (error) {
    res.status(500).json(error);
  }
});
// find one category by its `id` value
// be sure to include its associated Products
//http://localhost:3001/api/categories/:id
router.get("/:id", async (req, res) => {
  try {
    const catData = await Category.findOne({
      where: { id: req.params.id },
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(catData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// create a new category
//http://localhost:3001/api/categories
router.post("/", (req, res) => {});

// update a category by its `id` value
//http://localhost:3001/api/categories/:id
router.put("/:id", (req, res) => {});

// delete a category by its `id` value
//http://localhost:3001/api/categories/:id
router.delete("/:id", (req, res) => {});

module.exports = router;
