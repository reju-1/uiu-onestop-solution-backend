import Question from "../../models/question.js";

async function handleUpload(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { course, code, type, trimester, year, department } = req.body;
    // console.log({file: req.file, request_body:req.body, hash:req.hash});
  
    const newQuestion = new Question({
      course: course,
      code: code,
      type: type,
      trimester: trimester,
      year: year,
      department: department,

      path: req.file.path,
      hash: req.hash,
      status: "pending",
    });

    let resp = await newQuestion.save();

    res.json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while saving in Database");
  }
}

export { handleUpload };
