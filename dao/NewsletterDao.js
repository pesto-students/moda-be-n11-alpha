const Newsletter = require("../models/Newsletter");
const { sendEmail } = require("../utilities/email");

const saveEmailAndSendMail = async (email) => {
  const subject = "Welcome to Moda!!!";
  const body =
    "Thanks for becoming a part of us!!! You will recieve an update on our latest offers and discounts. ";

  let newsletter = new Newsletter({ email });
  await newsletter.save();
  await sendEmail(email, subject, body);
};

module.exports = { saveEmailAndSendMail };
