const mongoose = require("mongoose");
const newsletterSchema = mongoose.Schema(
  {
    email: { unique: true, type: String },
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("newsletter", newsletterSchema);
