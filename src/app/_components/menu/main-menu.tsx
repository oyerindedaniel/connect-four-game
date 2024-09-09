"use client";

import { LogoSVG, PlayerVsCPUSVG, PlayerVsPlayerSVG } from "@/assets";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { useDisclosure } from "@/hooks/utils";
import { useGameContext } from "@/store/game/context";
import { GameMode } from "@/store/game/types";
import { useLayoutEffect } from "react";

const MainMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { startGame } = useGameContext();

  useLayoutEffect(() => {
    onOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <LogoSVG className="mx-auto mb-[79px]" />
      <div className="flex flex-col space-y-[30px] w-[400px]">
        <Button
          onClick={() => startGame(GameMode.Computer)}
          variant="playCpu"
          className="uppercase w-full h-[72px] rounded-[20px] text-2xl text-left"
          rightElement={<PlayerVsCPUSVG />}
        >
          PLAY VS CPU
        </Button>
        <Button
          onClick={() => startGame(GameMode.Local)}
          variant="playPlayer"
          className="uppercase w-full h-[72px] rounded-[20px] text-2xl text-left"
          rightElement={<PlayerVsPlayerSVG />}
        >
          PLAY VS PLAYER
        </Button>
        <Button
          variant="continueGame"
          className="uppercase w-full h-[72px] rounded-[20px] text-2xl text-left"
        >
          GAME RULES
        </Button>
      </div>
    </Modal>
  );
};

export default MainMenu;
