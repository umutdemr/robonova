import React, { useState, useEffect } from 'react';
import { useAuth } from "../use-auth-client";
import { mulakatapp_final_backend } from 'declarations/mulakatapp_final_backend';
import '../../styles/quizForm.scss';
import Notes from '../Notes'; // Notes componentini ekliyoruz
import QuizResults from '../QuizResults'; // QuizResults bileşenini ekliyoruz
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material'; // Dialog bileşenlerini içe aktarıyoruz

function QuizQuestion({ subject }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [isNotesDialogOpen, setIsNotesDialogOpen] = useState(false); // Notes dialogunu kontrol etmek için bir state ekliyoruz
  const [showResults, setShowResults] = useState(false); // QuizResults bileşenini göstermek için state
  const [isTimeButtonDisabled, setIsTimeButtonDisabled] = useState(false); // Süre uzatma düğmesinin etkinlik durumu
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
      let responseText;
      if (subject === 'random-questions') {
        responseText = await mulakatapp_final_backend.makeRandomRequest();
      } else if (subject === 'html') {
        responseText = await mulakatapp_final_backend.makeHtmlRequest();
      } else if (subject === 'javascript') {
        responseText = await mulakatapp_final_backend.makeJsRequest();
      } else if (subject === 'sql') {
        responseText = await mulakatapp_final_backend.makeSQLRequest();
      } else if (subject === 'python') {
        responseText = await mulakatapp_final_backend.makePythonRequest();
      }
      const data = JSON.parse(responseText);
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  }

  function handleNextQuestion() {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    setUserAnswer('');
    setTimeLeft(30);
    setIsTimeButtonDisabled(false); // Yeni soru için süre uzatma düğmesini etkinleştir
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
    } else {
      setIncorrectAnswers(prevIncorrectAnswers => prevIncorrectAnswers + 1);
    }
    handleNextQuestion();
  }

  function handleShowResults() {
    setShowResults(true);
  }

  function handleAddTime() {
    setTimeLeft(prevTimeLeft => prevTimeLeft + 10);
    setIsTimeButtonDisabled(true); // Düğmeyi devre dışı bırak
  }

  if (!isAuthenticated) {
    return <p>Lütfen sorulara erişebilmek için oturum açın.</p>;
  }

  if (questions.length === 0) {
    return <p>Sorular yükleniyor...</p>;
  }

  if (currentQuestionIndex >= questions.length) {
    return (
      <div className="quiz-container">
        <Button onClick={handleShowResults}>Sonuçları Gör</Button>
        {showResults && <QuizResults
          correctAnswers={correctAnswers}
incorrectAnswers={incorrectAnswers}
          answeredQuestions={answeredQuestions}
          subject={subject}
        />}
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <form onSubmit={handleSubmit} className="quiz-form">
        <p className="question">{currentQuestion.question}</p>
        <div className="answer-options">
          {Object.entries(currentQuestion.answers)
            .filter(([key, value]) => value !== null)
            .map(([key, value]) => (
              <label key={key} className="answer-option">
                <input
                  type="radio"
                  name="options"
                  value={key}
                  checked={userAnswer === key}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  required
                />
                <span>{value}</span>
              </label>
            ))}
        </div>
        <button type="submit" className="submit-button">Cevabı Gönder</button>
        <p className="time-left">Kalan Zaman: {timeLeft} saniye</p>
        <Button variant="contained" onClick={handleAddTime} disabled={isTimeButtonDisabled}>
          Süreyi Uzat (+10s)
        </Button>
        {/* Süreyi uzatma düğmesi */}
      </form>

      <div>
        {/* Notes dialogu */}
        <Dialog open={isNotesDialogOpen} onClose={() => setIsNotesDialogOpen(false)}>
          <DialogContent>
            <Notes subject={subject} />
          </DialogContent>
        </Dialog>
        <Button variant="contained" onClick={() => setIsNotesDialogOpen(true)}>
          Write Questions Notes
        </Button>
        {/* Notları açmak için bir buton ekliyoruz */}
      </div>
    </div>
  );
}

export default QuizQuestion;