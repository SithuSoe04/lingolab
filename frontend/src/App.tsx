import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./components/Home/Home"
import LogIn from './components/LogIn/LogIn';
import Definitions from './components/Definitions/Definitions';
import ResearchList from './components/ResearchList/ResearchList';
import VoteButtons from './components/VoteButtons/VoteButtons';


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<LogIn/>} />
          <Route path="/research" element={<ResearchList/>} />
          <Route path="/buttons" element={<VoteButtons/>} />
          <Route path="/definitions" element={<Definitions/>} />
        </Routes>
    </Router>
  );
}

export default App;
