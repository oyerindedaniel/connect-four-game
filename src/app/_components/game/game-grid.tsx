"use client";

import { DEFAULT_COLUMNS, DEFAULT_ROWS } from "@/config";
import { DragAction } from "@/store/drag/actions";
import { useDragContext } from "@/store/drag/context";
import { useGameContext } from "@/store/game/context";
import { Player } from "@/store/game/types";
import { motion } from "framer-motion";
import { playerDiscs } from "./disc";

const GameGrid: React.FC = () => {
  const {
    board,
    state: { playerMap },
  } = useGameContext();

  const {
    state: {
      currentDrag: { over },
    },
    dispatch,
  } = useDragContext();

  const discHeight = 70;
  const gap = 18;
  const topOffset = 18;

  const getDropPosition = (rowIdx: number) => {
    return topOffset + rowIdx * (discHeight + gap);
  };

  const handleAnimationStart = () => {
    dispatch({ type: DragAction.DragRemove, payload: { over } });
  };

  return (
    <div className="absolute inset-0">
      <div
        className="w-[94.6%] grid mx-auto h-full gap-x-[3.01%]"
        style={{
          gridTemplateColumns: `repeat(${DEFAULT_COLUMNS}, 1fr)`,
          gridTemplateRows: `repeat(${DEFAULT_ROWS}, 1fr)`,
        }}
      >
        {board.map((row, rowIdx) =>
          row.map((value, colIdx) => (
            <div
              key={`col-${colIdx}-row-${rowIdx}`}
              id={`col-${colIdx}-row-${rowIdx}`}
            >
              {value ? (
                <motion.div
                  className="absolute top-0 -z-[1]"
                  animate={{
                    y: getDropPosition(rowIdx),
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    duration: 4,
                  }}
                  onAnimationStart={() => handleAnimationStart()}
                >
                  {playerDiscs[playerMap[value as 1 | 2] as Player]}
                </motion.div>
              ) : (
                "0"
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GameGrid;
