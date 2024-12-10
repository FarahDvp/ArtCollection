const nodemailer = require("nodemailer");

const Mail_Sender = async (email, content, subject = "Isamm") => {
  let user = process.env.USERMAIL;
  let pass = process.env.APP_PASSWORD;
  const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
  let mailDetails = {
    from: user,
    to: email,
    subject: subject,
    text: "test",
    html: content,
  };

  const result = await mailTransporter.sendMail(mailDetails);
  return result;
};

module.exports = {
  Mail_Sender,
};
