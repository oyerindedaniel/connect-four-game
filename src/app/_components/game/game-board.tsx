"use client";

import { BoardLayerWhiteLargeSVG } from "@/assets";
import SvgWrapper from "@/components/svg-wrapper";

// 316 292
const GameBoard: React.FC = () => {
  return (
    <div className="">
      <SvgWrapper
        className="left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4"
        beforeContentClass="before:content-board-layer-black-large"
      >
        <BoardLayerWhiteLargeSVG className="z-10" />
      </SvgWrapper>
    </div>
  );
};

export default GameBoard;
