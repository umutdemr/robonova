import React, { useState, useEffect } from 'react';
import './index.scss';
import { useAuth, AuthProvider } from "./components/use-auth-client";
import Notes from './components/Notes';
import NavBarComponent from './components/NavBarComponent';
import { Route, Routes } from 'react-router-dom';
import BeginnerMotoko from './components/BeginnerMotoko';
import HomePage from './components/HomePage';
import Lesson1 from './components/lessons/Lesson1';
import Lesson2 from './components/lessons/Lesson2';
import Lesson3 from './components/lessons/Lesson3';
import Lesson4 from './components/lessons/Lesson4';
import Lesson5 from './components/lessons/Lesson5';
import Lesson6 from './components/lessons/Lesson6';
import Lesson7 from './components/lessons/Lesson7';
import LogInProfile from './components/LogInProfile';
import LoginPrompt from './components/LoginPrompt';

function App() {
  const { isAuthenticated } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
    } else {
      setShowLoginPrompt(false);
    }
  }, [isAuthenticated]);

  return (
    <>
      <NavBarComponent />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Home' element={<HomePage />} />
        <Route path='/Beginner' element={<BeginnerMotoko />} />
        <Route path='/LogInProfile' element={<LogInProfile />} />
        {isAuthenticated ? (
          <>
            <Route path='/Lesson1' element={<Lesson1 />} />
            <Route path='/Lesson2' element={<Lesson2 />} />
            <Route path='/Lesson3' element={<Lesson3 />} />
            <Route path='/Lesson4' element={<Lesson4 />} />
            <Route path='/Lesson5' element={<Lesson5 />} />
            <Route path='/Lesson6' element={<Lesson6 />} />
            <Route path='/Lesson7' element={<Lesson7 />} />
            <Route path='/Notes' element={<Notes />} />
          </>
        ) : (
          <Route path="*" element={<LoginPrompt />} />
        )}
      </Routes>
    </>
  );
}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
