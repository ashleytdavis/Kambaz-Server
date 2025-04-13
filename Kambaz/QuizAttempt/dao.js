import model from "./model.js";
import {v4 as uuidv4} from "uuid";

export function findAttemptsByUserAndQuiz(userId, quizId) {
    return model.find({userId, quizId}).sort({numAttempt: -1}); // ?
}

export async function createQuizAttempt({quizId, userId, answers, score}) {
    const previousAttempts = await findAttemptsByUserAndQuiz(userId, quizId);
    const newAttempt = {
        _id: uuidv4(),
        quizId,
        userId,
        numAttempt: previousAttempts.length + 1,
        answers,
        score,
        submittedAt: new Date()
    };
    return model.create(newAttempt);
}

export async function getLatestAttempt(userId, quizId) {
    return model.findOne({ quizId, userId }).sort({ numAttempt: -1 });
}