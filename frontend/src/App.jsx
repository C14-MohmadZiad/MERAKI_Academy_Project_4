import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import ProductDetail from "./pages/ProductDetail";

import "./App.css";
import ProductCard from './components/ProductCard';

const App = () => {
  return (
   <div className="App">
      <h1>Mohmad was here</h1>
      <ProductCard/>
    </div>
  )
}

export default App
