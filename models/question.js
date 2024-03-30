import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true,
  },
  code: {
    type: String,
  },
  type: {
    type: String,
    enum: ["ct", "mid", "final", "solution"],
    required: true,
  },
  trimester: {
    type: String,
    enum: ["fall", "summer", "spring"],
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  department: {
    type: String,
    enum: ["cse", "eee", "bba", "others"],
  },

  path: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved"],
    required: true,
  },
});

// Define a model using the schema
const Question = mongoose.model("Question", questionSchema);

export default Question;
