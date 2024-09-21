"use client";

import { LogoSVG } from "@/assets";
import Button from "@/components/ui/button";
import { useGameContext } from "@/store/game/context";

const Controls: React.FC = () => {
  const { restartGame } = useGameContext();

  return (
    <div className="flex items-center justify-between max-w-[632px] absolute top-[53px] left-2/4 -translate-x-2/4 w-full">
      <Button className="uppercase">Menu</Button>
      <LogoSVG />
      <Button className="uppercase">Restart</Button>
    </div>
  );
};

export default Controls;
