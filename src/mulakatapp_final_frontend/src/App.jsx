import React from 'react';
import './index.scss';
import { useAuth, AuthProvider } from "./components/use-auth-client";
import Notes from './components/Notes'; // Notes componentini ekliyoruz
import NavBarComponent from './components/NavBarComponent';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Demo from './components/Demo';
import JsQuestion from './components/questions/JsQuestion';
import HtmlQuestion from './components/questions/HtmlQuestion';
import SqlQuestions from './components/questions/SqlQuestions';
import PythonQuestions from './components/questions/PythonQuestions';
import RandomQuestions from './components/questions/RandomQuestions';
import HomePage from './components/HomePage';
import BeginnerMotoko from './components/BeginnerMotoko';
// import { Box } from '@mui/material';
import Lesson1 from './components/lessons/Lesson1';
import Lesson2 from './components/lessons/Lesson2';
import Lesson3 from './components/lessons/Lesson3';
import Lesson4 from './components/lessons/Lesson4';
import Lesson5 from './components/lessons/Lesson5';
import Lesson6 from './components/lessons/Lesson6';
import Lesson7 from './components/lessons/Lesson7';
import Login from './components/Login';


function App() {

  return (
    <>
      <NavBarComponent />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Home' element={<HomePage />} />
        <Route path='/Random-Language' element={<RandomQuestions />} />
        <Route path='/Html' element={<HtmlQuestion />} />
        <Route path='/Javascript' element={<JsQuestion />} />
        <Route path='/SQL' element={<SqlQuestions />} />
        <Route path='/Python' element={<PythonQuestions />} />
        <Route path='/Notes' element={<Notes />} />
        <Route path='/Demo' element={<Demo />} />
        <Route path='/Lesson1' element={<Lesson1 />} />
        <Route path='/Lesson2' element={<Lesson2 />} />
        <Route path='/Lesson3' element={<Lesson3 />} />
        <Route path='/Lesson4' element={<Lesson4 />} />
        <Route path='/Lesson5' element={<Lesson5 />} />
        <Route path='/Lesson6' element={<Lesson6 />} />
        <Route path='/Lesson7' element={<Lesson7 />} />
        <Route path='/Beginner' element={<BeginnerMotoko />} />
        <Route path='/Login' element={<Login />} />
      </Routes>
    </>
  );
}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
