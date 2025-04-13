import * as dao from "./dao.js";
import quizModel from "../Quiz/model.js";
import questionModel from "../QuizQuestion/model.js";
import { evaluateQuizAnswers } from "./scoring.js";


export default function QuizAttemptRoutes(app) {
    app.post("/api/quiz-attempts", async (req, res) => {
        const {quizId, userId, answers} = req.body;

        const quiz = await quizModel.findById(quizId);
        if(!quiz) {
            return res.status(404).send({message: "Quiz not found"});
        }

        const previousAttempts = await dao.findAttemptsByUserAndQuiz(userId, quizId);
        if(previousAttempts.length >= quiz.maxAttempts) {
            return res.status(403).send({message: "Max attempts reached"});
        }

        const questions = await questionModel.find({quiz_id: quiz._id});
        const {scoredAnswers, totalScore} = evaluateQuizAnswers(answers, questions);

        const attempt = await dao.createQuizAttempt({
            quizId,
            userId,
            answers: scoredAnswers,
            score: totalScore
        });

        res.send(attempt);
    });

    app.get("/api/quiz-attempts/:quizId/:userId", async (req, res) => {
        const { quizId, userId } = req.params;
        const attempt = await dao.getLatestAttempt(userId, quizId);
        if (!attempt) {
            res.status(404).send({ message: "No attempts found" });
        } else {
            res.send(attempt);
        }
    });
}