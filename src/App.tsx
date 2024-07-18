// App.tsx
import React from 'react';
// import TicTacToe from './components/TicTacToe'; // Corrected path
import Temp from './page/temp';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      {/* <TicTacToe /> */}
      <Temp />
    </div>
  );
};

export default App;
