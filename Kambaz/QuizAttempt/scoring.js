// SCORING LOGIC

export function evaluateQuizAnswers(userAnswers, questions) {
    let totalScore = 0;
    const scoredAnswers = [];

    for (const question of questions) {
        const userAnswer = userAnswers.find(a => a.questionId === question._id);
        if (!userAnswer) continue;
        let isCorrect = false;
        switch (question.question_type) {
            case "Multiple Choice":
                isCorrect = question.correct_answer.some(
                    ans => ans === userAnswer.answer.toString()
                );
                break;
            case "True or False":
                isCorrect = question.correct_answer.some(
                    ans => ans === userAnswer.answer.toString()
                );
                break;
            case "Fill In The Blank":
                isCorrect = question.correct_answer.some(
                    ans => ans === userAnswer.answer.toString()
                );
                break;
        }

        if (isCorrect) {
            totalScore += question.points || 0;
        }

        scoredAnswers.push({
            questionId: question._id,
            answer: userAnswer.answer,
            isCorrect
        });
    }

    return {scoredAnswers, totalScore};
}