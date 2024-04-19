async function getBooks(req, res) {
  res.send("20 books got!");
}

async function searchBook(req, res) {
  res.send("Searching books!");
}

export { getBooks, searchBook };
