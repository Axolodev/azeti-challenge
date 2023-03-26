import styles from "@/styles/home.module.css";
import React from "react";
import Board from "@/components/Board";
import { GameStateProvider } from "@/components/GameStateContext";

function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <p>Buzzword Bingo</p>
      </header>
      <GameStateProvider>
        <Board />
      </GameStateProvider>
    </div>
  );
}

export default Home;
