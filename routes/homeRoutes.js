const router = require('express').Router();
const Home = require('../models/Home');
const { getHomePageData } = require('../dao/homeDao');
const { getALlProducts } = require('../dao/productDao');
const { GeneralError } = require('../utilities/error');
router.get('/', async (_, res, next) => {
  try {
    const homepageDetails = await getHomePageData();
    return res.send(homepageDetails);
  } catch (e) {
    next(new GeneralError(e.message));
  }
});

router.patch('/', async (_, res, next) => {
  try {
    const homepageDetails = await getHomePageData();
    const products = await getALlProducts();
    let pr = products.slice(13, 19);
    return res.send({ homepageDetails, pr });
  } catch (ex) {
    next(new GeneralError(e.message));
  }
});

router.post('/', async (req, res, next) => {
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
    next(new GeneralError(e.message));
  }
});

module.exports = router;
