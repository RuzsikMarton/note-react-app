import React from 'react'
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Content from './components/Content'; 
import Home from './components/Home';

const App = () =>{
  const [theme, setTheme] = React.useState('dark');

  return (
    <main className={`${theme} ? '' : 'dark'`}>
        <Navbar theme={theme} setTheme={setTheme}/>
        <Sidebar />
        <Content />
        <Home />
    </main>
  )
}

export default App;