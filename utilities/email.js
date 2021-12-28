const sendGridMail = require("@sendgrid/mail");
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

function getMessage() {
  const body = "This is a test email using SendGrid from Node.js";
  return {
    to: "mrudit26@gmail.com",
    from: "modaecomm21@gmail.com",
    subject: "Test email with Node.js and SendGrid",
    text: body,
    html: `<strong>${body}</strong>`,
  };
}

async function sendEmail() {
  try {
    await sendGridMail.send(getMessage());
    console.log("Test email sent successfully");
  } catch (error) {
    console.error("Error sending test email");
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
}
module.exports.sendEmail = sendEmail;
/* 
(async () => {
  console.log("Sending test email");
  await sendEmail();
})(); */
