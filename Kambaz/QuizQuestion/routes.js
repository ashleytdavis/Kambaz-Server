import * as dao from "./dao.js";
import quizModel from "../Quiz/model.js";
import questionModel from "../QuizQuestion/model.js";

export default function QuizQuestionRoutes(app) {
    app.post("/api/quizzes/:quizId/questions", async (req, res) => {
        const { quizId } = req.params;
        const newQuestion = { ...req.body, quiz_id: quizId };

        try {
            const createdQuestion = await questionModel.create(newQuestion);
            const updatedQuiz = await quizModel.findByIdAndUpdate(
                quizId,
                { $push: { questions: createdQuestion._id } },
                { new: true }
            );
            res.send(updatedQuiz);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error saving question" });
        }
    });

    app.get("/api/quizzes/:quizId/questions", async (req, res) => {
        const { quizId } = req.params;
        const questions = await dao.findQuestionsForQuiz(quizId);
        res.send(questions);
    });

    app.get("/api/questions/:id", async (req, res) => {
        const question = await dao.findQuestionById(req.params.id);
        if (!question) {
            res.status(404).send({ message: "Question not found" });
        } else {
            res.send(question);
        }
    });

    app.put("/api/questions/:id", async (req, res) => {
        const updated = await dao.updateQuestion(req.params.id, req.body);
        if (!updated) {
            res.status(404).send({ message: "Question not found" });
        } else {
            res.send(updated);
        }
    });

    app.delete("/api/questions/:id", async (req, res) => {
        const status = await dao.deleteQuestion(req.params.id);
        if (status.deletedCount === 0) {
            res.status(404).send({ message: "Question not found" });
        } else {
            res.send({ message: "Question deleted" });
        }
    });
}
