const router = require("express").Router();
const { Category, Product, ProductTag } = require("../../models");

// The `/api/categories` endpoint

// find all categories
//http://localhost:3001/api/categories
router.get("/", async (req, res) => {
  try {
    const catData = await Category.findAll({
      include: [{ model: Product }],
    });
    return res.json(catData);
  } catch (error) {
    res.status(500).json(error);
  }
});
// find one category by its `id` value
//http://localhost:3001/api/categories/:id
router.get("/:id", async (req, res) => {
  try {
    const catData = await Category.findOne({
      where: { id: req.params.id },
      include: [{ model: Product }],
    });
    res.status(200).json(catData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// create a new category
//http://localhost:3001/api/categories
router.post("/", (req, res) => {
  Category.create(req.body)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// update a category by its `id` value
//http://localhost:3001/api/categories/:id
router.put("/:id", (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// delete a category by its `id` value
//http://localhost:3001/api/categories/:id
router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategory) => res.json(deletedCategory))
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
