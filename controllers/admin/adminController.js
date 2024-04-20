import bookUpload from "./bookUpload.js";
import sendNewsLetter from "./sendNewsLetter.js";

async function signup(req, res) {
  res.send("signup");
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
};
