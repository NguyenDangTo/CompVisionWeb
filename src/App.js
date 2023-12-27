// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Error from "./components/Error";
import Goal from "./components/Goal";
import Question from "./components/Question";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/goal" element={<Goal />} />
        <Route path="/goal/:goal/question" element={<Question />} />
      </Routes>
    </Router>
  );
};

export default App;
