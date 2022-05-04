import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Main } from './pages/main';
import { Create } from './pages/create';
import { About } from './pages/about';
import { Profile } from './pages/profile';
import { useDispatch, useSelector } from 'react-redux';
import { getNetwork } from './redux/slices/loginSlice';
import { Admin } from './pages/admin';
import { Meme } from './pages/meme';

function App() {
  const dispatch = useDispatch()
  const { metaInstalled } = useSelector((state) => state.login)

  useEffect(() => {
    if (metaInstalled) {
      window.ethereum.on('chainChanged', chainId => {
        dispatch(getNetwork(chainId))
      })
    }

  }, [dispatch, metaInstalled])

  return (
    <Router>
      <Routes>
        <Route path="/meme/:id" element={<Meme />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/pelmen" element={<Admin />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<Create />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
