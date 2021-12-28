const router = require("express").Router();
const { getALlProducts, getOneProduct } = require("../dao/productDao");

router.get("/popularProducts", async (req, res) => {
  try {
    const products = await getALlProducts(parseInt(5), parseInt(0));
    return res.send(products);
  } catch (ex) {
    console.log(ex.message);
    res.status(500).send(ex.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await getOneProduct(id);
    res.send(product);
  } catch (ex) {
    console.log(ex.message);
    res.status(500).send(ex.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const { color, size, text, gender, page, limit = 30, skip = 0 } = req.query;
    console.log(color, size, text, gender);
    const products = await getALlProducts(
      parseInt(limit),
      parseInt(skip),
      color,
      size,
      text,
      gender,
      page
    );

    return res.send(products);
  } catch (ex) {
    console.log(ex.message);
    res.status(500).send(ex.message);
  }
});

router.get("/popularProducts", async (req, res) => {
  try {
    const { color, size, text, limit = 30, skip = 0 } = req.query;
    const products = await getALlProducts(
      parseInt(5),
      parseInt(0),
      color,
      size,
      text
    );
    return res.send(products);
  } catch (ex) {
    console.log(ex.message);
    res.status(500).send(ex.message);
  }
});

module.exports = router;
