const sendGridMail = require("@sendgrid/mail");
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

function getMessage(email, subject, body) {
  return {
    to: email,
    from: "modaecomm21@gmail.com",
    subject: subject,
    text: body,
    html: `<strong>${body}</strong>`,
  };
}

async function sendEmail(email, subject, body) {
  try {
    await sendGridMail.send(getMessage(email, subject, body));
  } catch (error) {
    console.error("Error sending test email");
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
}
module.exports.sendEmail = sendEmail;
