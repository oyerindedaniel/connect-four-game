"use client";

import { BoardLayerWhiteLargeSVG } from "@/assets";
import SvgWrapper from "@/components/svg-wrapper";
import { DEFAULT_COLUMNS } from "@/config";
import { useGameContext } from "@/store/game/context";
import GameDroppable from "./game-droppable";
import GameGrid from "./game-grid";

const GameBoard: React.FC = () => {
  const { board } = useGameContext();

  // droppable Ids not columnIdx
  const droppableIds = Array.from(
    { length: DEFAULT_COLUMNS },
    (_, colIdx) => colIdx + 1
  );

  //REFACT
  //O(n)
  function isColumnFull(colIdx: number): boolean {
    return board.every((row) => row[colIdx] !== 0);
  }

  return (
    <SvgWrapper beforeContentClass="before:content-board-layer-black-large">
      <div className="relative">
        <div className="flex w-[94.6%] h-[75px] -top-[75px] gap-x-[3.01%] absolute left-2/4 -translate-x-2/4">
          {droppableIds.map((id, colIdx) => (
            <GameDroppable key={id} id={id} columnIdx={colIdx} disabled={isColumnFull(colIdx)} />
          ))}
        </div>
        <BoardLayerWhiteLargeSVG className="z-10" />
        {/* <div className="bg-amber-800/15 w-20 h-[70px] absolute top-[18px]" /> */}
        <GameGrid />
      </div>
    </SvgWrapper>
  );
};

export default GameBoard;
