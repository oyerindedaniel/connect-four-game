import { DEFAULT_COLUMNS, DEFAULT_ROWS } from "@/config";
import { DragAction } from "@/store/drag/actions";
import { useDragContext } from "@/store/drag/context";
import { useGameContext } from "@/store/game/context";
import { Player } from "@/store/game/types";
import { getMaxDiscsPerPlayer } from "@/utils/game";
import { useEffect, useMemo, useState } from "react";
import Disc from "./disc";

interface DiscsProps {
  player: Player;
  className?: string;
}

const Discs: React.FC<DiscsProps> = ({ player, className }) => {
  const {
    state: { currentPlayer },
  } = useGameContext();

  const {
    state: {
      currentDrag: { lastAction, over },
    },
  } = useDragContext();

  const [discCount, setDiscCount] = useState(1);

  const maxDiscs = useMemo(
    () => getMaxDiscsPerPlayer(DEFAULT_COLUMNS, DEFAULT_ROWS),
    []
  );

  useEffect(() => {
    if (lastAction === DragAction.DragEnd) {
      // for cases over is null, the drag operation did not finish over a valid drop zone.
      if (over === null) {
        return;
      }

      setDiscCount((prev) => Math.min(prev + 1, maxDiscs));
    }
  }, [lastAction, maxDiscs, over]);

  const isDraggingDisabled = currentPlayer !== player;

  return (
    <div className={`absolute h-[75px] w-[70px] ${className}`}>
      <Disc id={discCount} player={player} disabled={isDraggingDisabled} />
    </div>
  );
};

export default Discs;
