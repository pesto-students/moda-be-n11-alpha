const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("app is running...");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("App has started");
});
