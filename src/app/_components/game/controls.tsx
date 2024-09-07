"use client";

import { LogoSVG } from "@/assets";
import Button from "@/components/ui/button";

const Controls: React.FC = () => {
  return (
    <div className="flex items-center justify-between max-w-[632px] absolute top-[53px] left-2/4 -translate-x-2/4 w-full">
      <Button className="uppercase" shadowVariant="" borderVariant="">
        Menu
      </Button>
      <LogoSVG />
      <Button className="uppercase" shadowVariant="" borderVariant="">
        Restart
      </Button>
    </div>
  );
};

export default Controls;
