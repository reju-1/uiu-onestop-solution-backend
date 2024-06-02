import transporter from "../../utilities/mailer.js";
import Person from "../../models/person.js";

async function sendNewsLetter(req, res) {
  const { subject, content, category } = req.body;
  const files = req.files;

  //category value:  "all-type, essential-type, app-forum, debate-club"
  let query;
  if (category.includes("all")) {
    query = "all";
  } else if (category.includes("essential")) {
    query = "essential";
  }

  const usersEmail = await Person.find({ newsletterType: query }, "email");
  const emailsArray = usersEmail.map((item) => item.email);

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
    to: emailsArray,
    subject: subject,
    html: content,
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
