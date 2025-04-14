import * as quizDao from "./dao.js";
import * as quizQuestionDao from "../QuizQuestion/dao.js";

export default function QuizRoutes(app) {
    app.get("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const quiz = await quizDao.findQuizById(quizId);
        if (!quiz) {
            res.status(404).send({ message: "Quiz not found" });
        } else {
            res.send(quiz);
        }
    });

    app.delete("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const status = await quizDao.deleteQuiz(quizId);
        if (!status) {
            res.status(404).send({ message: "Quiz not found" });
        } else {
            res.send({ message: "Quiz deleted successfully" });
        }
    });

    app.post("/api/quizzes", async (req, res) => {
        app.post("/api/quizzes", async (req, res) => {
            const newQuiz = req.body;
            try {
                const createdQuiz = await quizDao.createQuiz(newQuiz);
                if (newQuiz.questions && Array.isArray(newQuiz.questions)) {
                    const quizQuestions = await Promise.all(
                        newQuiz.questions.map(async (question) => {
                            const quizQuestion = {
                                ...question,
                                quiz_id: createdQuiz._id,
                            };
                            return await quizQuestionDao.createQuizQuestion(quizQuestion);
                        })
                    );
                    createdQuiz.questions = quizQuestions;
                }

                res.send(createdQuiz);
            } catch (error) {
                console.error("Error creating quiz:", error);
                res.status(500).send({ message: "Error creating quiz" });
            }
        });
    })

    app.put("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const quizUpdates = req.body;
        const updatedQuiz = await quizDao.updateQuiz(quizId, quizUpdates);
        if (!updatedQuiz) {
            res.status(404).send({ message: "Quiz not found" });
        } else {
            res.send(updatedQuiz);
        }
    });
    app.get("/api/quizzes/course/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const quizzes = await quizDao.findQuizzesForCourse(courseId);
        if (!quizzes) {
            res.status(404).send({ message: "This course has no quizzes" });
        } else {
            res.send(quizzes);
        }
    })
}