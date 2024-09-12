import { useDragContext } from "@/store/drag/context";
import { useGameContext } from "@/store/game/context";
import { Player } from "@/store/game/types";
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
    state: { discsByPlayer },
  } = useDragContext();

  const isDraggingDisabled = currentPlayer !== player;

  return (
    <div className={`absolute h-[75px] w-[70px] ${className}`}>
      <Disc
        id={discsByPlayer[player]}
        player={player}
        disabled={isDraggingDisabled}
      />
    </div>
  );
};

export default Discs;
