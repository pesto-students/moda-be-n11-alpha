const router = require("express").Router();
const Home = require("../models/Home");
const { getHomePageData } = require("../dao/homeDao");
const { getALlProducts } = require("../dao/productDao");

router.get("/", async (_, res) => {
  try {
    const homepageDetails = await getHomePageData();

    return res.send(homepageDetails);
  } catch (err) {
    res.status(500).send(ex.message);
  }
});

router.patch("/", async (req, res, next) => {
  try {
    const homepageDetails = await getHomePageData();
    const products = await getALlProducts();
    let pr = products.slice(13, 19);
    return res.send({ homepageDetails, pr });
  } catch (ex) {}
});

router.post("/", async (req, res) => {
  try {
    const { specialOffer, SaleAndOffer, PopularCategories } = req.body;
    const home = new Home({
      specialOffer,
      SaleAndOffer,
      PopularCategories,
    });
    const savedHome = await home.save();
    return res.send(savedHome);
  } catch (ex) {
    res.status(500).send(ex.message);
  }
});

module.exports = router;
