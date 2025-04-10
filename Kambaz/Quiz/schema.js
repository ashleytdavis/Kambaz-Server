import mongoose from "mongoose";
const schema = new mongoose.Schema(
    {
        _id: String,
        description: String,
        type: {
            type: String,
            enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
            default: "Graded Quiz"
        },
        points: Number,
        assignmentGroup: {
            type: String,
            enum: ["Quizzes", "Exams", "Assignments", "Project"],
            default: "Quizzes"
        },
        shuffleAnswers: {
            type: Boolean,
            default: true
        },
        timeLimit: {
            "hours": {
                type: Number,
                default: 0
            },
            "minutes": {
                type: Number,
                default: 20
            }
        },
        multipleAttempts: {
            type: Boolean,
            default: false
        },
        maxAttempts: {
            type: Number,
            default: 1
        },
        showCorrectAnswers: Boolean,
        accessCode: {
            type: String,
            default: ""
        },
        oneQuestionAtATime: {
            type: Boolean,
            default: true
        },
        webcamRequired: {
            type: Boolean,
            default: false
        },
        LockQuestions: {
            type: Boolean,
            default: false
        },
        dueDate: Date,
        availableDate: Date,
        untilDate: Date,
        courseId: String
    },
    { collection: "quizzes" }
)
export default schema;
// for availability, we can have this auto change in the db
// using mongo middleware from what i remember
// (pretty much equivalent to a mysql trigger)

// maybe add some mongo middleware to ensure due date is after available date.
// and does not exceed untilDate