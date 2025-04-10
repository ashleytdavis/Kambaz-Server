// to resolve the many to many relationship
// between user and quiz, i propose this
// bridge table called quizattempt

import mongoose from "mongoose";
const schema = new mongoose.Schema(
    {
        _id: String,
        quizId: { type: String, ref: "QuizModel" },
        userId: { type: String, ref: "UserModel" },
        numAttempt: Number

    },
    { collection: "quizAttempts" }
)
export default schema;
