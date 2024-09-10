"use client";

import { Player } from "@/store/game/types";
import { classNames } from "@/utils/other";
import PlayerAsset from "./player-asset";

interface PlayerInfoProps {
  className?: HTMLDivElement["className"];
  player: Player;
  score: number;
}

const playerNames = {
  player1: "Player 1",
  player2: "Player 2",
  computer: "CPU",
};

const PlayerInfo: React.FC<PlayerInfoProps> = ({
  className = "",
  player,
  score,
}) => {
  return (
    <div
      className={classNames(
        "top-2/4 -translate-y-2/4 shadow-[0_10px_0_rgba(0,0,0,1)] text-center w-[141px] h-[160px] rounded-[20px] text-black bg-white border-[3px] border-black",
        className
      )}
    >
      <PlayerAsset player={player} />
      <div className="flex flex-col justify-center items-center absolute top-[46px] w-max left-2/4 -translate-x-2/4">
        <span className="text-xl uppercase font-bold">
          {playerNames[player]}
        </span>
        <span className="text-[56px] font-bold leading-none h-[71px]">
          {score}
        </span>
      </div>
    </div>
  );
};

export default PlayerInfo;
