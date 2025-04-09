import * as dao from "./dao.js"
export default function EnrollmentRoutes(app) {
    app.post("/api/enrollment/enroll", async (req, res) => {
        const userId = req.params.userId;
        const courseId = req.params.courseId;
        const newEnrollments = await dao.enroll(userId, courseId);
        if (!newEnrollments) {
            res.status(404).send({message: "Error enrolling/unenrolling student"});
        } else {
            res.send({message: "Student enrolled successfully"});
        }
    })
}