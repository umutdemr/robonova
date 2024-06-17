import React from 'react';
import './index.scss';
import { AuthProvider } from "./components/use-auth-client";
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

function App() {



  return (
    <>
      <NavBarComponent />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Home' element={<HomePage />} />
        <Route path='/Random-Language' element={<RandomQuestions />} />
        <Route path='/Html' element={<HtmlQuestion />} />
        <Route path='/Javascript' element={<JsQuestion />} />
        <Route path='/SQL' element={<SqlQuestions />} />
        <Route path='/Python' element={<PythonQuestions />} />
        <Route path='/Notes' element={<Notes />} />
        <Route path='/Demo' element={<Demo />} />
        <Route path='/Beginner' element={<BeginnerMotoko />} />

      </Routes>



    </>
  );
}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
