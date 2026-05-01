function Header({ currentTab, setCurrentTab }) {
  return (
    <header>
      <h1>두더지 게임</h1>
      <nav>
        <button onClick={() => setCurrentTab('game')}>게임</button>
        <button onClick={() => setCurrentTab('ranking')}>랭킹</button>
      </nav>
    </header>
  );
}

export default Header;