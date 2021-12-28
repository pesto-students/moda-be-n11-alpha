const Home = require("../models/Home");

async function getHomePageData() {
  try {
    const data = await Home.find();
    return data;
  } catch (err) {
    throw err;
  }
}
module.exports.getHomePageData = getHomePageData;
