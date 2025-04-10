import * as quizDao from "./dao.js"
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
        const newQuiz = req.body;
        const createdQuiz = await quizDao.createQuiz(newQuiz);
        res.send((createdQuiz));
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
        const quizzes = quizDao.findQuizzesForCourse(courseId);
        if (!quizzes) {
            res.status(404).send({ message: "This course has no quizzes" });
        } else {
            res.send(quizzes);
        }
    })
}