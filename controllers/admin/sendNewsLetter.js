import transporter from "../../utilities/mailer.js";

async function sendNewsLetter(req, res) {
  const { subject, content, category } = req.body;
  const files = req.files;

  let attachmentObject = [];

  if (files) {
    attachmentObject = files.map(({ filename, path, mimetype }) => ({
      filename: filename,
      path: path,
      contentType: mimetype,
    }));
  }

  let mailOptions = {
    from: process.env.EMAIL_AC,
    to: ["rahmed1445@gmail.com"],
    subject: subject,
    text: content,
    attachments: attachmentObject || [],
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  res.json({ message: "Email send successfully" });
}

export default sendNewsLetter;
