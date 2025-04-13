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
                isCorrect = userAnswer.answer === question.correct_answer;
                break;
            case "True or False":
                isCorrect = userAnswer.answer === question.correct_answer;
                break;
            case "Fill In The Blank":
                if (Array.isArray(question.correct_answer)) {
                    isCorrect = question.correct_answer.some(ans =>
                        ans.toLowerCase().trim() === userAnswer.answer.toLowerCase().trim()
                    );
                } else {
                    isCorrect = userAnswer.answer.toLowerCase().trim() === question.correct_answer.toLowerCase().trim();
                }
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