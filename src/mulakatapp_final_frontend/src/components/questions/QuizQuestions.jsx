import React, { useState, useEffect } from 'react';
import { useAuth } from '../use-auth-client';
import { mulakatapp_final_backend } from 'declarations/mulakatapp_final_backend';
import { Button, Dialog, DialogContent, Grid, Typography, CircularProgress } from '@mui/material';
import Notes from '../Notes';
import QuizResults from '../QuizResults';
import { styled } from '@mui/system';

const QuizContainer = styled('div')({
  margin: '2rem',
  fontFamily: 'Arial, sans-serif',
  color: '#333',
});

const Message = styled(Typography)({
  textAlign: 'center',
  fontSize: '1.5rem',
  padding: '2rem',
  backgroundColor: '#f8f9fa',
  borderRadius: '10px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
});

const QuizForm = styled('form')({
  padding: '2rem',
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  '& .question': {
    fontSize: '1.8rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
  },
  '& .answer-options': {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  '& .answer-option': {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.2rem',
  },
  '& .submit-button': {
    marginTop: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
  '& .time-left': {
    marginTop: '1rem',
    fontSize: '1.4rem',
    color: '#777',
    transition: 'color 0.3s ease',
  },
  '& .add-time-button': {
    marginTop: '1rem',
    backgroundColor: '#28a745',
    color: '#fff',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#218838',
    },
  },
});

const LoadingContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
});

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
  const [loading, setLoading] = useState(true);
  const [timeLeftColor, setTimeLeftColor] = useState('#777'); // varsayılan renk

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
        updateTimeLeftColor(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const fetchQuestions = async () => {
    try {
      const responseText = await getRequestForSubject(subject);
      const data = JSON.parse(responseText);
      setQuestions(data);
      setLoading(false); // Sorular yüklendiğinde yüklemeyi durdur
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
    setTimeLeftColor('#777'); // Zaman bittiğinde varsayılan rengi geri getir
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

  const updateTimeLeftColor = (time) => {
    if (time <= 10) {
      setTimeLeftColor('#ff6347'); // 10 saniyeden azsa kırmızıya geç
    } else {
      setTimeLeftColor('#777'); // Varsayılan renk
    }
  };

  if (loading) {
    return (
      <LoadingContainer>
        <CircularProgress size={80} />
      </LoadingContainer>
    );
  }

  if (!isAuthenticated) {
    return <Message variant="body1">Lütfen sorulara erişebilmek için oturum açın.</Message>;
  }

  if (questions.length === 0) {
    return <Message variant="body1">Sorular yükleniyor...</Message>;
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
    <QuizContainer>
      <QuizForm onSubmit={handleAnswerSubmit}>
        <Typography className="question">{currentQuestion.question}</Typography>
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
        <Button
          type="submit"
          variant="contained"
          className="submit-button"
          style={{ backgroundColor: '#007bff', color: '#fff' }}
        >
          Cevabı Gönder
        </Button>
        <Typography className="time-left" style={{ color: timeLeftColor }}>
          Kalan Zaman: {timeLeft} saniye
        </Typography>
        <Button
          variant="contained"
          className="add-time-button"
          onClick={handleAddTime}
          disabled={isTimeButtonDisabled}
          style={{ backgroundColor: '#28a745', color: '#fff' }}
        >
          Süreyi Uzat (+10s)
        </Button>
      </QuizForm>
      <Dialog open={isNotesDialogOpen} onClose={() => setIsNotesDialogOpen(false)}>
        <DialogContent>
          <Notes subject={subject} />
        </DialogContent>
      </Dialog>
      <Button
        variant="contained"
        onClick={() => setIsNotesDialogOpen(true)}
        style={{ backgroundColor: '#007bff', color: '#fff' }}
      >
        Soru Notları Oluştur
      </Button>
    </QuizContainer>
  );
}

export default QuizQuestion;
