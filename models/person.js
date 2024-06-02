import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  credit: {
    type: Number,
    default: 50,
  },

  newsletterType: {
    type: String,
    enum: ["all", "essential"],
    default: "all",
  },
});

const Person = mongoose.model("Person", personSchema);

export default Person;
