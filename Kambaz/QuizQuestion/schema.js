import mongoose from "mongoose";
const schema = new mongoose.Schema
    (
        {
            _id: String,
            quiz_id: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
            question_text: { type: String, required: true },
            question_type: {
                type: String,
                enum: ["True or False", "Multiple Choice", "Fill In The Blank"],
                required: true
            },
            options: { type: [String], default: undefined },
            correct_answer: { type: mongoose.Schema.Types.Mixed, required: true }
        },
        { collection: "quizQuestions" }
    );
export default schema;