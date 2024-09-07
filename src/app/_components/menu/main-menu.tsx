"use client";

import { LogoSVG, PlayerVsCPUSVG, PlayerVsPlayerSVG } from "@/assets";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { useDisclosure } from "@/hooks/utils";
import { useLayoutEffect } from "react";

const MainMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useLayoutEffect(() => {
    onOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <LogoSVG className="mx-auto mb-[79px]" />
      <div className="flex flex-col space-y-[30px] w-[400px]">
        <Button
          variant="playCpu"
          className="uppercase w-full h-[72px] rounded-[20px] text-2xl text-left"
          rightElement={<PlayerVsCPUSVG />}
        >
          PLAY VS CPU
        </Button>
        <Button
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
