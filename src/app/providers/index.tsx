"use client";

import { GameProvider } from "@/store/game/context";
import { PropsWithChildren } from "react";

export default function Providers({ children }: PropsWithChildren<{}>) {
  return <GameProvider>{children}</GameProvider>;
}
