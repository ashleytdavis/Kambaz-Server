import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
    app.get("/api/assignments", async (req, res) => {
        const { courseId } = req.query;
        if (courseId) {
            const assignments = await assignmentsDao.findAssignmentByCourseId(courseId);
            if (!assignments || assignments.length === 0) {
                return res.status(404).send({ message: "No assignments found for this course" });
            }
            return res.send(assignments);
        }
        const assignments = await assignmentsDao.findAllAssignments();
        res.send(assignments);
    });

    app.get("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const assignment = await assignmentsDao.findAssignmentById(assignmentId);
        if (!assignment) {
            res.status(404).send({ message: "Assignment not found" });
        } else {
            res.send(assignment);
        }
    });

    app.post("/api/assignments", async (req, res) => {
        const newAssignment = req.body;
        const createdAssignment = await assignmentsDao.createAssignment(newAssignment);
        res.send(createdAssignment);
    });

    app.put("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const assignmentUpdates = req.body;
        const updatedAssignment = await assignmentsDao.updateAssignment(assignmentId, assignmentUpdates);
        if (!updatedAssignment) {
            res.status(404).send({ message: "Assignment not found" });
        } else {
            res.send(updatedAssignment);
        }
    });

    app.delete("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const status = await assignmentsDao.deleteAssignment(assignmentId);
        if (!status) {
            res.status(404).send({ message: "Assignment not found" });
        } else {
            res.send({ message: "Assignment deleted successfully" });
        }
    });
}
