import { useEffect } from "react";

const Header = ({ handleNewGame, wins }) => {
  // Update page title with win count
  useEffect(() => (document.title = `${wins} wins`), [wins]);

  return (
    <header className="header">
      <h3>Memory Game</h3>
      <h4>{wins} wins</h4>
      <button onClick={handleNewGame}>New Game</button>
    </header>
  );
};

export default Header;
