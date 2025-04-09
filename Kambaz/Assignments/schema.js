import mongoose from "mongoose";
const schema = new mongoose.Schema
    (
        {
            _id: String,
            title: String,
            course: { type: String, ref: "CourseModel" },
            date: Date,
            dueDate: Date,
            points: Number,
            description: String,
        },
        { collection: "assignments" }
    );
export default schema;