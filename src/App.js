import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Authors from './pages/authorsPage/authors';
import Login from './pages/Login.js/login';
import PageNotFound from './components/PageNotFound/pagenotfound';
import Navbar from './components/navbar/navbar';
import ScrollToTop from './components/ScrollToTop';
import { useEffect } from 'react';

function App() {
useEffect(()=>{
},[localStorage.getItem('Token')])
  return (
    <div className="App">
     <Router>
      <ScrollToTop/>
     <Navbar/>
      <Routes>
        <Route path="/" element={<Login />} />
        {localStorage.getItem('Token') &&
        <Route path="/authors" element={<Authors/>}/>
        }
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
     </Router>
    </div>


  );
}

export default App;
