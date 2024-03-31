// QuizForm.jsx
import React from 'react';

function QuizForm({ questions, currentQuestionIndex, userAnswer, setUserAnswer, handleSubmit }) {
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <form onSubmit={handleSubmit}>
      <p className="question">{currentQuestion.question}</p>
      {Object.entries(currentQuestion.answers)
        .filter(([key, value]) => value !== null)
        .map(([key, value]) => (
          <label key={key}>
            <input 
              type="radio" 
              name="options" 
              value={key} 
              checked={userAnswer === key} 
              onChange={(e) => setUserAnswer(e.target.value)} 
              required 
            />
            {value}
          </label>
        ))}
      <button type="submit" className="submit-button">Submit Answer</button>
    </form>
  );
}

export default QuizForm;
