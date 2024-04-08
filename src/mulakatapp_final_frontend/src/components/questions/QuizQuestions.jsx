import React, { useState, useEffect } from 'react';
import { useAuth } from "../use-auth-client";
import { mulakatapp_final_backend } from 'declarations/mulakatapp_final_backend';
import { Button, Dialog, DialogContent, Grid } from '@mui/material';
import Notes from '../Notes';
import QuizResults from '../QuizResults';
import '../../styles/quizForm.scss';

function QuizQuestion({ subject }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [isNotesDialogOpen, setIsNotesDialogOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isTimeButtonDisabled, setIsTimeButtonDisabled] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchQuestions();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleQuestionTimeout();
    } else {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const fetchQuestions = async () => {
    try {
      const responseText = await getRequestForSubject(subject);
      const data = JSON.parse(responseText);
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const getRequestForSubject = async (subject) => {
    const requestMap = {
      'random-questions': mulakatapp_final_backend.makeRandomRequest,
      'html': mulakatapp_final_backend.makeHtmlRequest,
      'javascript': mulakatapp_final_backend.makeJsRequest,
      'sql': mulakatapp_final_backend.makeSQLRequest,
      'python': mulakatapp_final_backend.makePythonRequest
    };
    const requestFunction = requestMap[subject];
    return await requestFunction();
  };

  function handleQuestionTimeout() {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    setUserAnswer('');
    setTimeLeft(30);
    setIsTimeButtonDisabled(false);
  };

  const handleAnswerSubmit = (event) => {
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
    handleQuestionTimeout();
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  const handleAddTime = () => {
    setTimeLeft(prevTimeLeft => prevTimeLeft + 10);
    setIsTimeButtonDisabled(true);
  };

  if (!isAuthenticated) {
    return <p className="message">Lütfen sorulara erişebilmek için oturum açın.</p>;
  }

  if (questions.length === 0) {
    return <p className="message">Sorular yükleniyor...</p>;
  }

  if (currentQuestionIndex >= questions.length) {
    return (
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Button variant="contained" onClick={handleShowResults} fullWidth>Sonuçları Gör</Button>
        </Grid>
        {showResults && 
          <Grid item xs={12} sm={6}>
            <QuizResults
              correctAnswers={correctAnswers}
              incorrectAnswers={incorrectAnswers}
              answeredQuestions={answeredQuestions}
              subject={subject}
            />
          </Grid>
        }
      </Grid>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <form onSubmit={handleAnswerSubmit} className="quiz-form">
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
        <Button type="submit" variant="contained" className="submit-button">Cevabı Gönder</Button>
        <p className="time-left">Kalan Zaman: {timeLeft} saniye</p>
        <Button variant="contained" onClick={handleAddTime} disabled={isTimeButtonDisabled}>
          Süreyi Uzat (+10s)
        </Button>
      </form>
      <br/>
      <div>
        <Dialog open={isNotesDialogOpen} onClose={() => setIsNotesDialogOpen(false)}>
          <DialogContent>
            <Notes subject={subject} />
          </DialogContent>
        </Dialog>
        <Button variant="contained" onClick={() => setIsNotesDialogOpen(true)}>
          Write Questions Notes
        </Button>
      </div>
    </div>
  );
}

export default QuizQuestion;
