import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Main } from './pages/main';
import { Create } from './pages/create';
import { Upload } from './pages/upload';
import { About } from './pages/about';
import { Profile } from './pages/profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/create" element={<Create />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
