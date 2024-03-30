// QuizResults.jsx
import React from 'react';
import './results.scss';
function QuizResults({ correctAnswers, incorrectAnswers, answeredQuestions }) {
  return (
    <div className="result-container">
      <h2>Quiz Results</h2>
      <p>Correct Answers: {correctAnswers}</p>
      <p>Incorrect Answers: {incorrectAnswers}</p>
      <div>
        <h3>Answered Questions</h3>
        <ul>
          {answeredQuestions.map((answeredQuestion, index) => (
            <li key={index}>
              <p><strong>Question:</strong> {answeredQuestion.question}</p>
              <p><strong>Your Answer:</strong> {answeredQuestion.userAnswer}</p>
              <p><strong>Correct Answer:</strong> {answeredQuestion.correctAnswer}</p>
              <p><strong>Result:</strong> {answeredQuestion.isCorrect ? 'Correct' : 'Incorrect'}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default QuizResults;