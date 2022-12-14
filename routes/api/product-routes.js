const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// get all products
router.get("/", async (req, res) => {
  try {
    const prodData = await Product.findAll({
      include: [Category, { model: Tag, through: ProductTag }],
    });
    return res.json(prodData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get one product
router.get("/:id", async (req, res) => {
  try {
    const prodData = await Product.findOne({
      where: { id: req.params.id },

      include: [Category, { model: Tag, through: ProductTag }],
    });
    res.status(200).json(prodData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// create new product
/* req.body should look like this...
  {
    product_name: "Basketball",
    price: 200.00,
    stock: 3,
    tagIds: [1, 2, 3, 4]
  }
*/
router.post("/", async (req, res) => {
  try {
    const prodData = await Product.create(req.body);
    if (req.body.tagIds.length) {
      //Mapping over req.body.tagIds
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          //return each prodData.id & tag_id
          product_id: prodData.id,
          tag_id,
        };
      });
      //returns a new array of all req.body.tagIds
      const productTagIds = await ProductTag.bulkCreate(productTagIdArr);
      return res.status(200).json(productTagIds);
    }
    res.status(200).json(prodData);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// update product
router.put("/:id", (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags.filter(({ tag_id }) => !req.body.tagIds.includes(tag_id)).map(({ id }) => id);

      // run both actions
      return Promise.all([ProductTag.destroy({ where: { id: productTagsToRemove } }), ProductTag.bulkCreate(newProductTags)]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      res.status(400).json(err);
    });
});
// delete one product by its `id` value

router.delete("/:id", (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
