import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from './pages/Login.js/login';
import PageNotFound from './components/PageNotFound/pagenotfound';
import Navbar from './components/navbar/navbar';
import ScrollToTop from './components/ScrollToTop';
import Preview from './components/authorComponents/Preview/Preview';
import './App.css';


const App = ()=> {

  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/bookpreview/id=:id" element={<Preview />} />
          <Route path='*' element={<PageNotFound />} />

        </Routes>
      </Router>
    </div>


  );
}

export default App;
