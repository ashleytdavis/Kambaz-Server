import model from "./model.js"
import { v4 as uuidv4 } from "uuid";
export function createQuiz(quiz) {
    const newQuiz = { ...quiz, _id: uuidv4() };
    return model.create(newQuiz);
}
export function deleteQuiz(quizId) {
    return model.deleteOne({ _id: quizId });
}
export function updateQuiz(quizId, quizUpdates) {
    return model.findByIdAndUpdate(
        quizId,
        { $set: quizUpdates },
        { new: true }
    )
}
export function findQuizzesForCourse(courseId) {
    return model.find({ courseId: courseId });
}
export function findQuizById(quizId) {
    return model.find({ _id: quizId });
}