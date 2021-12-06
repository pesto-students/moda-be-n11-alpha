const router = require("express").Router();
const { getALlProducts, saveProduct } = require("../dao/productDao");

router.get("/", async (req, res) => {
  const { limit, skip } = req.query;
  try {
    const products = await getALlProducts(parseInt(limit), parseInt(skip));
    return res.send(products);
  } catch (ex) {
    res.status(500).send(ex.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { ProductId, title, desc, img, categories, size, color, sex } =
      req.body;
    const savedProduct = await saveProduct({
      ProductId,
      title,
      desc,
      img,
      categories,
      size,
      color,
      sex,
    });
    return res.send(savedProduct);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

module.exports = router;
