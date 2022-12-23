import React, { useEffect , useContext} from "react";
import { Context } from "./contexts/AppContext";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Authors from './pages/authorsPage/authors';
import Login from './pages/Login.js/login';
import PageNotFound from './components/PageNotFound/pagenotfound';
import Navbar from './components/navbar/navbar';
import ScrollToTop from './components/ScrollToTop';
import Preview from './components/authorComponents/Preview/Preview';
import './App.css';


const App = ()=> {
 const context = useContext(Context);
 const Token = localStorage.getItem("Token");
 console.log(Token);
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/bookpreview/id=:id" element={<Preview />} />
          {Token?
            <Route path="/authors" element={<Authors />} />
          :
          <Route path='*' element={<PageNotFound />} />
  }
        </Routes>
      </Router>
    </div>


  );
}

export default App;
