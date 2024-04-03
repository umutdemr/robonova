import React from 'react';
import './index.scss';
import {  AuthProvider } from "./components/use-auth-client";
import QuizForm from './components/QuizForm';
import Notes from './components/Notes'; // Notes componentini ekliyoruz
import NavBarComponent from './components/NavBarComponent';
import {Route , Routes} from 'react-router-dom';
import Home from './components/Home';
function App() {
 
  

  return (
    <>
    <NavBarComponent/>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/Home' element={<Home/>}/>
    <Route path='/Random-Language' element={<QuizForm/>}/>
    <Route path='/Notes' element={<Notes/>}/>
    </Routes>


     
    </>
  );
}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
