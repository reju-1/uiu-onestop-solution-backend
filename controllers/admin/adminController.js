import{ bookUpload} from "./bookUpload.js";
import sendNewsLetter from "./sendNewsLetter.js";
import { uploadEvent, getEvents, getEventByID } from "./event.js";

import Admin from "../../models/admin.js";

async function signup(req, res) {
  //  try {
  //   const { name, email, password } = req.body;
  //   const photo = req.file.path;

  //   const isAlreadyExist = await Admin.findOne({email});

  //   console.log(isAlreadyExist)

  //   // if(isAlreadyExist)
  //   //   return  res.json({msg : "User Already Exist With this Email Account"})
    

  //   // const hashedPassword = await bcrypt.hash(password, 10);


  //   // const modifiedString = photo.replace(/^public\\/, "");

  //   // const newPhoto = `${process.env.SERVER_URL}/${modifiedString}`;

  //   // const newAdmin = new Admin({ name, email, password: hashedPassword});
  //   // await newAdmin.save();

  //   // req.json({ msg : "Admin Created"})




  //  }catch(err){
  //   res.json({err})
  //  }

}


async function login(req, res) {
  res.send("logIn");
}

async function reviewQB(req, res) {
  res.send("reviewQB");
}

async function finalizeQuestion(req, res) {
  res.send("Question saved/Drop");
}

async function getReports(req, res) {
  res.send("report * this question is fuzzy");
}

export {
  signup,
  login,
  reviewQB,
  finalizeQuestion,
  getReports,
  bookUpload,
  sendNewsLetter,
  uploadEvent,
  getEvents,
  getEventByID,
};
