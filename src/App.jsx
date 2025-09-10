import React, { use, useEffect } from 'react'
import Navbar from './components/Navbar';
import Note from './components/Note'; 
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';

const App = () =>{
  const [theme, setTheme] = React.useState('dark');

  return (
    <main className={`${theme} ? '' : 'dark'`}>
        <Navbar theme={theme} setTheme={setTheme}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/note/:id' element={<Note />} />
        </Routes>
    </main>
  )
}

export default App;