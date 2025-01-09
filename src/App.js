import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import RandomChar from './components/RandomChar';
import CharList from './components/CharList';
import CharInfo from './components/CharInfo';

function App() {

  const [selectedChar, setSelectedChar] = useState(null)

  const onCharSerlected = (id) => {
    setSelectedChar(id)
}
  return (
    <div className="App">
      <div className='w-[1175px] mx-auto px-3 py-12'>
        <Header />
        <RandomChar />
        <div className="grid grid-cols-5 gap-8 mt-20 h-screen">
          <CharList onCharSerlected={onCharSerlected}/>
          <div className='col-span-2 relative'>
            <CharInfo charId={selectedChar}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
