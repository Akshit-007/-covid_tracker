import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './Components/Auth';
import Display from './Components/Display';
import DisplayCountry from './Components/DisplayCountry';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Auth />} />
          <Route path="/display" element={<Display />} />
          <Route path="/display/country" element={<DisplayCountry />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
