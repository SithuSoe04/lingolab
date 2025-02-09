import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./components/Home/Home"
import LogIn from './components/LogIn/LogIn';
import PdfViewer from './components/PdfViewer/PdfViewer';
import Navbar from "./components/Navbar/Navbar"
import FileExplorer from './components/FileExplorer/FileExplorer';

function App() {
  return (
    <div>
      <Router>
        <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<LogIn/>} />
            <Route path="/pdfviewer" element={<PdfViewer/>} />
            <Route path="/fileexplorer" element={<FileExplorer/>} />
            {/* <Route path="/howitworks" element={<Home/>} /> */}
          </Routes>
      </Router>
    </div>
  );
}

export default App;
