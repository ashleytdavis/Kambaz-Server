// to resolve the many to many relationship
// between user and quiz, i propose this
// bridge table called quizattempt

import mongoose from "mongoose";
const schema = new mongoose.Schema(
    {
        _id: String,
        quizId: { type: String, ref: "QuizModel" },
        userId: { type: String, ref: "UserModel" },
        numAttempt: {type: Number, required: true},
        score: {type: Number, default: 0},
        answers: [
           { questionId: {type: String, required: true},
            answer: mongoose.Schema.Types.Mixed, // could be string, array, num, etc
            isCorrect: Boolean}
        ],
        submittedAt: {type: Date, default: Date.now }

    },
    { collection: "quizAttempts" }
)
export default schema;
