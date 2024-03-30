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

async function filteringSearch(req, res) {
  try {
    const { course, year, trimester, type, pageNumber, sorted } = req.query;

    // Construct MongoDB query
    const query = {};
    if (course) query.course = { $regex: new RegExp(course, "i") };
    if (year) query.year = { $in: year.split(",") };
    if (trimester) query.trimester = { $in: trimester.split(",") };
    if (type) query.type = { $in: type.split(",") };

    // Sorting by year
    let sortOption = {};
    if (sorted === "asc") {
      sortOption = { year: 1 };
    } else if (sorted === "desc") {
      sortOption = { year: -1 };
    } // else, no sorting

    // Pagination
    const pageSize = 5; // Number of items per page
    const skip = (pageNumber - 1) * pageSize;

    // Execute query with sorting
    const questions = await Question.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(pageSize);

    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export { handleUpload, filteringSearch };
