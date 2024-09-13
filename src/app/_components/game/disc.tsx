import { CounterRedLargeSVG, CounterYellowLargeSVG } from "@/assets";
import { DragAction } from "@/store/drag/actions";
import { useDragContext } from "@/store/drag/context";
import { AnimatePresence, motion } from "framer-motion";
import { Player } from "@/store/game/types";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";

interface DiscProps {
  id: number;
  player: Player;
  disabled: boolean;
}

export const playerDiscs = {
  player1: <CounterRedLargeSVG />,
  player2: <CounterYellowLargeSVG />,
  computer: <CounterRedLargeSVG />,
};

const Disc: React.FC<DiscProps> = ({ player, id, disabled }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${player}-${id}`,
    data: { id, player },
    disabled,
  });

  const {
    state: {
      currentDrag: { over, lastAction, active },
    },
  } = useDragContext();

  const style = useMemo(
    () => ({ transform: CSS.Translate.toString(transform) }),
    [transform]
  );

  const isDragEnd = lastAction === DragAction.DragEnd;
  const isActiveDisc = `${player}-${id}` === active?.id;
  const isSameDisc = id === active?.data?.current?.id;
  const isOver = Boolean(over); // For cases when the drag operation did not finish over a valid drop zone.

  const isValidDropped = isOver && isDragEnd && isActiveDisc && isSameDisc;

  if (isValidDropped) return null;

  return (
    <span
      className="absolute"
      ref={setNodeRef}
      style={{ ...style }}
      {...listeners}
      {...attributes}
    >
      {playerDiscs[player]}
    </span>
  );
};

export default Disc;
