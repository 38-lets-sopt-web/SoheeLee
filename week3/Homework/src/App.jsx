import { useState } from 'react';
import Header from './components/header/header';
import Ranking from './components/ranking/ranking';
import Game from './components/game/game';  


function App() {
  const [currentTab, setCurrentTab] = useState('game');

  return (
    <div>
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {currentTab === 'game' ? <Game /> : <Ranking />}
    </div>
  );
}

export default App;