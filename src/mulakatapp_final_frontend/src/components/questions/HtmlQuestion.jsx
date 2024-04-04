import React from 'react';
import { useAuth } from "../use-auth-client";
import '../../styles/quizForm.scss';
import QuizQuestions from './QuizQuestions';

function HtmlQuestions(questions) {
  const { isAuthenticated } = useAuth();

 
  if (!isAuthenticated) {
    return <p>Lütfen sorulara erişebilmek için oturum açın.</p>;
  }

  return (
    <QuizQuestions questions={questions} subject="html" />
  );
}

export default HtmlQuestions;
