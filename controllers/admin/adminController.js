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

async function bookUpload(req, res) {
  res.send("Book uploaded!");
}

async function sendNewsLetter(req, res) {
  res.send("newsLetter send");
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