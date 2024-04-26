import Book from "../../models/book.js";

async function bookUpload(req, res) {
     console.log(req.body, req.files);
  try {
    const { name, description } = req.body;

    const {
      logo: [firstLogo],
      book: [firstBook],
    } = req.files;

    const newBook = new Book({
      name: name,
      description: description,
      path: firstBook.path,
      logo: firstLogo.path,
    });

    await newBook.save();

    res.status(200).json({ message: "Book Saved Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There is an error Saving the book" });
  }
}

export default bookUpload;
