import React from 'react';
import { Box, Typography, List, ListItem, Divider } from '@mui/material';
import { styled } from '@mui/system';

const ResultContainer = styled(Box)({
  padding: '2rem',
  border: '2px solid #007bff',
  borderRadius: '10px',
  backgroundColor: '#f8f9fa',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  marginTop: '2rem',
});

const ResultHeading = styled(Typography)({
  color: '#007bff',
  fontSize: '2rem',
  marginBottom: '1.5rem',
});

const ResultText = styled(Typography)({
  fontSize: '1.1rem',
  marginBottom: '1rem',
});

const StyledList = styled(List)({
  listStyleType: 'none',
  padding: 0,
  margin: 0,
});

const StyledListItem = styled(ListItem)({
  marginBottom: '2rem',
  borderBottom: '1px solid #ccc',
  paddingBottom: '1rem',
  '&:last-child': {
    marginBottom: 0,
    borderBottom: 'none',
    paddingBottom: 0,
  },
});

const Strong = styled('strong')({
  fontWeight: 'bold',
});

function QuizResults({ correctAnswers, incorrectAnswers, answeredQuestions }) {
  return (
    <ResultContainer>
      <ResultHeading variant="h2">Quiz Results</ResultHeading>
      <ResultText>Correct Answers: {correctAnswers}</ResultText>
      <ResultText>Incorrect Answers: {incorrectAnswers}</ResultText>
      <div>
        <Typography variant="h3">Answered Questions</Typography>
        <StyledList>
          {answeredQuestions.map((answeredQuestion, index) => (
            <StyledListItem key={index}>
              <ResultText><Strong>Question:</Strong> {answeredQuestion.question}</ResultText>
              <ResultText><Strong>Your Answer:</Strong> {answeredQuestion.userAnswer}</ResultText>
              <ResultText><Strong>Correct Answer:</Strong> {answeredQuestion.correctAnswer}</ResultText>
              <ResultText><Strong>Result:</Strong> {answeredQuestion.isCorrect ? 'Correct' : 'Incorrect'}</ResultText>
              <Divider />
            </StyledListItem>
          ))}
        </StyledList>
      </div>
    </ResultContainer>
  );
}

export default QuizResults;
