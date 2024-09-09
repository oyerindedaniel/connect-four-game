"use client";

import { BoardLayerWhiteLargeSVG } from "@/assets";
import SvgWrapper from "@/components/svg-wrapper";
import { useNodeRef, useUniqueId } from "@/hooks/utils";
import { useCallback, useState } from "react";
import GameDroppable from "./game-droppable";

const GameBoard: React.FC = () => {
  const [boardRect, setBoardRect] = useState<DOMRect | null>(null);

  const handleNodeChange = useCallback(
    (newElement: HTMLElement | null, previousElement: HTMLElement | null) => {
      if (newElement) {
        const rect = newElement.getBoundingClientRect();
        console.log(rect);
        setBoardRect(rect);
      }
    },
    []
  );

  const [node, setNodeRef] = useNodeRef(handleNodeChange);

  const uniqueId = useUniqueId(`droppable`);

  const droppableIds = Array.from({ length: 5 }, () => uniqueId);

  return (
    <div className="">
      <SvgWrapper
        className="left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4"
        beforeContentClass="before:content-board-layer-black-large"
      >
        <div ref={setNodeRef} className="relative">
          {boardRect && (
            <div className="flex w-full absolute top-0">
              {droppableIds.map((id) => (
                <GameDroppable key={id} id={id} />
              ))}
            </div>
          )}
          <BoardLayerWhiteLargeSVG className="z-10" />
        </div>
      </SvgWrapper>
    </div>
  );
};

export default GameBoard;
