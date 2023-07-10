import React from "react";
import { useEffect } from "react";

const Header = ({ handleNewGame, wins, elapsedTime }) => {
  // Update page title with win count
  useEffect(() => (document.title = `${wins} wins`), [wins]);

  return (
    <header className="header">
      <h3>Memory Game</h3>
      <h4>{wins} wins</h4>
      <h4>{elapsedTime} seconds</h4>
      <button onClick={handleNewGame}>RESET GAME</button>
    </header>
  );
};

export default Header;
