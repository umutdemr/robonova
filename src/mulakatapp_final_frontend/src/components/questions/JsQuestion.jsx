import React from 'react';
import { useAuth } from "../use-auth-client";
import QuizQuestions from './QuizQuestions';
import { Typography } from '@mui/material';
import Alert from '@mui/material/Alert';

function JsQuestions(questions) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Alert severity="warning" style={{ margin: '20px 0' }}>
        <Typography variant="body1" color="inherit">
          Lütfen sorulara erişebilmek için oturum açın.
        </Typography>
      </Alert>
    );
  }

  return (
    <QuizQuestions questions={questions} subject="javascript" />
  );
}

export default JsQuestions;
