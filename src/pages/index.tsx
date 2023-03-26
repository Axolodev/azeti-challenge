import styles from "@/styles/home.module.css";
import React from "react";
import Board from "@/components/Board";

function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <p>Buzzword Bingo</p>
      </header>
      <Board />
    </div>
  );
}

export default Home;
