import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import SurveyForm from './Components/Survey/Survey';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/survey" element={<SurveyForm />} />
      </Routes>
    </Router>
  );
}

export default App;
