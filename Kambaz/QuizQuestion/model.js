import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("QuizQuestion", schema);
export default model;