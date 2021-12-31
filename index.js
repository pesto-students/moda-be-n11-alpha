const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");

const PORT = process.env.PORT || 2000;

dotenv.config();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/cart", require("./routes/cartRoutes"));
app.use("/api/v1/orders", require("./routes/orderRoutes"));
app.use("/api/v1/product", require("./routes/productRoutes"));
app.use("/api/v1/pay", require("./routes/payRoutes"));
app.use("/api/v1/home", require("./routes/homeRoutes"));
app.use("/api/v1/otp", require("./routes/otpRoutes"));
app.use("/api/v1/newsletter", require("./routes/newsletterRoutes"));
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("db  connection successful"))
  .catch((err) => console.log(err));

app.listen(PORT, () =>
  console.log(`...listening to port ${process.env.PORT || 2000}`)
);
