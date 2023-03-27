import styles from "@/styles/gameControls.module.css";
import { Button } from "@mui/material";
import { useGameStateContext } from "./GameStateContext";

function GameControls() {
  const { clearCurrentlySelectedWords, generateNewBoard } =
    useGameStateContext();
  return (
    <div className={styles.container}>
      <Button
        onClick={clearCurrentlySelectedWords}
        variant="contained"
        color="secondary"
      >
        Clear board
      </Button>

      <Button onClick={generateNewBoard} variant="contained" color="secondary">
        Clear and get new board
      </Button>
    </div>
  );
}

export default GameControls;
