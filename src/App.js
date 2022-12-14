import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Authors from './pages/authorsPage/authors';
import Login from './pages/Login.js/login';

function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/authors" element={<Authors/>}/>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
