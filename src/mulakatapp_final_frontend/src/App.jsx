// App.jsx
import React, { useState, useEffect } from 'react';
import { mulakatapp_final_backend } from 'declarations/mulakatapp_final_backend';
import './index.scss';
import LoggedIn from "./LoggedIn";
import { useAuth, AuthProvider } from "./use-auth-client";
import LoggedOut from "./LoggedOut";
import QuizForm from './QuizForm';
import QuizResults from './QuizResults';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchQuestions();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
    } else {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  async function fetchQuestions() {
    try {
      const responseText = await mulakatapp_final_backend.makeHttpRequest();
      const data = JSON.parse(responseText);
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  }

  function handleNextQuestion() {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    setUserAnswer('');
    setIsCorrect(null);
    setTimeLeft(30);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.correct_answer;
    const isAnswerCorrect = userAnswer === correctAnswer;
    setAnsweredQuestions(prevQuestions => [
      ...prevQuestions,
      { question: currentQuestion.question, userAnswer, correctAnswer, isCorrect: isAnswerCorrect }
    ]);
    if (isAnswerCorrect) {
      setCorrectAnswers(prevCorrectAnswers => prevCorrectAnswers + 1);
      setScore(prevScore => prevScore + 1);
    } else {
      setIncorrectAnswers(prevIncorrectAnswers => prevIncorrectAnswers + 1);
      setScore(prevScore => Math.max(0, prevScore - 1));
    }
    handleNextQuestion();
  }

  return (
    <>
    <main className="quiz-app" id="pageContent">
      <h1>Quiz App</h1>
      <div className="quiz-container">
        {isAuthenticated && questions.length > 0 && currentQuestionIndex < questions.length && (
          <QuizForm
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            userAnswer={userAnswer}
            setUserAnswer={setUserAnswer}
            handleSubmit={handleSubmit}
          />
        )}
        <p>Time Left: {timeLeft} seconds</p>

      </div>
      {isAuthenticated ? <LoggedIn /> : <LoggedOut />}
      {currentQuestionIndex === questions.length && (
        <QuizResults
          correctAnswers={correctAnswers}
          incorrectAnswers={incorrectAnswers}
          answeredQuestions={answeredQuestions}
        />
      )}
    </main>
    </>
  );
}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);