import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./components/Home/Home"
import LogIn from './components/LogIn/LogIn';
import PdfViewer from './components/PdfViewer/PdfViewer';
import Navbar from "./components/Navbar/Navbar"
import FileExplorer from './components/FileExplorer/FileExplorer';
import Definitions from './components/Definitions/Definitions';
import ResearchList from './components/ResearchList/ResearchList';
import VoteButtons from './components/VoteButtons/VoteButtons';


function App() {
  return (
    <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<LogIn/>} />
          <Route path="/pdfviewer" element={<PdfViewer/>} />
          <Route path="/fileexplorer" element={<FileExplorer/>} />
          <Route path="/research" element={<ResearchList/>} />
          <Route path="/buttons" element={<VoteButtons/>} />
          <Route path="/definitions" element={<Definitions/>} />
        </Routes>
    </Router>
  );
}

export default App;
