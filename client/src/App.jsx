import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Landing from './components/landing/Landing';
import NavBar from './components/navBar/NavBar';
import Home from "./components/Home/Home"
import Cards from "./components/CardsContainer/Cards"

import {Route, Routes} from "react-router-dom"

function App() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/dogs') 
      .then(response => setDogs(response.data))
      .catch(error => console.error('Error al obtener los datos:', error));
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Routes>
      <Route path="/home" element={<Home />} />
        <Route path="/" element={<Landing />} />
        <Route path="/card" element={<Cards />} />
        
      </Routes>
    </div>
  );
}

export default App;