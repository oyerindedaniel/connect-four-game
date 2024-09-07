"use client";

import { useGameContext } from "@/store/game/context";
import Game from "./_components/game";
import MainMenu from "./_components/menu/main-menu";

const ConnectFour: React.FC = () => {
  const {
    state: { gameMode },
  } = useGameContext();

  return gameMode ? <Game /> : <MainMenu />;
};

export default ConnectFour;
