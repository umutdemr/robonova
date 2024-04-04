import React from 'react';
import { useAuth } from "../use-auth-client";
import '../../styles/quizForm.scss';
import QuizQuestions from './QuizQuestions';

function JsQuestions(questions) {
  const { isAuthenticated } = useAuth();

 
  if (!isAuthenticated) {
    return <p>Lütfen sorulara erişebilmek için oturum açın.</p>;
  }

  return (
    <QuizQuestions questions={questions} subject="javascript" />
  );
}

export default JsQuestions;
