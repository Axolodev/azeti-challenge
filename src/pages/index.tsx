import styles from "@/styles/home.module.css";
import React from "react";
import Board from "@/components/Board";
import GameControls from "@/components/GameControls";
import { GameStateProvider } from "@/components/GameStateContext";

function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <p>Buzzword Bingo</p>
      </header>
      <main className={styles.gameContainer}>
        <GameStateProvider>
          <Board />
          <GameControls />
        </GameStateProvider>
      </main>
    </div>
  );
}

export default Home;
