"use client";

import { BoardLayerWhiteLargeSVG } from "@/assets";

const GameBoard: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      {/* <div className="h-[80vh]"> */}
      <BoardLayerWhiteLargeSVG className="" />
      {/* </div> */}
    </div>
  );
};

export default GameBoard;
