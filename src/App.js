import { Home, Questions, Scoreboard } from './Pages'
import './App.css';

import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='questions' element={<Questions />}></Route>
        <Route path='scoreboard' element={<Scoreboard />}></Route>
      </Routes>
    </>
  );
}

export default App;
