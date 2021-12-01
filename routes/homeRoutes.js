const router = require("express").Router();
const Home = require("../models/Home");
const { getHomePageData } = require("../dao/homeDao");

router.get("/", async (_, res) => {
  try {
    const homepageDetails = await getHomePageData();

    return res.send(homepageDetails);
  } catch (err) {
    res.status(500).send(ex.message);
  }
});
router.post("/", async (req, res) => {
  try {
    const { specialOffer, SaleAndOffer, PopularCategories, PopularProduct } =
      req.body;
    const home = new Home({
      specialOffer,
      SaleAndOffer,
      PopularCategories,
      PopularProduct,
    });
    const savedHome = await home.save();
    return res.send(savedHome);
  } catch (ex) {
    res.status(500).send(ex.message);
  }
});

module.exports = router;
