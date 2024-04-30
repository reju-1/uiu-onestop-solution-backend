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
      path: firstBook.path.replace(/^public\//, ''),
      logo: firstLogo.path.replace(/^public\//, ''),
    });

    await newBook.save();

    res.status(200).json({ message: "Book Saved Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There is an error Saving the book" });
  }
}


const getAllBooks =  async (req, res) => {
  try{
    const dooks = await Book.find();
    res.status(201).json(dooks)
  }catch(err){
    console.log(err);
    res.status(500).json({ error: "There is an error finding  books" });
  }


}

const deleteBook = async (req, res) => {
  try{
    const deleteRes = await Book.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteRes)
  }catch(err){
    console.log(err);
    res.status(500).json({ error: "error deleting the book" });
  }
}





export  {bookUpload, getAllBooks, deleteBook};
