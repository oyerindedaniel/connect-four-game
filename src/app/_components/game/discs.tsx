import { DEFAULT_COLUMNS, DEFAULT_ROWS } from "@/config";
import { useDragContext } from "@/store/drag/context";
import { useGameContext } from "@/store/game/context";
import { Player } from "@/store/game/types";
import { getMaxDiscsPerPlayer } from "@/utils/game";
import { classNames } from "@/utils/other";
import { AnimatePresence, motion } from "framer-motion";
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

  //REFACT
  const isDraggingDisabled =
    currentPlayer !== player ||
    discsByPlayer[player] ===
      getMaxDiscsPerPlayer(DEFAULT_COLUMNS, DEFAULT_ROWS);

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={discsByPlayer[player]}
        className={classNames("h-[75px] w-[70px] z-20", classNames)}
        initial={{ y: 50, rotate: 45, scale: 0.5 }}
        animate={{
          y: 0,
          rotate: 0,
          scale: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 15,
          duration: 0.85,
        }}
      >
        <Disc
          id={discsByPlayer[player]}
          player={player}
          disabled={isDraggingDisabled}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default Discs;
