import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function createQuestion(question) {
    const newQuestion = { ...question, _id: uuidv4() };
    return model.create(newQuestion);
}

export function findQuestionsForQuiz(quizId) {
    return model.find({ quiz_id: quizId });
}

export function findQuestionById(id) {
    return model.findById(id);
}

export function updateQuestion(id, updates) {
    return model.findByIdAndUpdate(id, { $set: updates }, { new: true });
}

export function deleteQuestion(id) {
    return model.deleteOne({ _id: id });
}
