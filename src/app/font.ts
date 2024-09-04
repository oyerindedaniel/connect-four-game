import localFont from "next/font/local";

export const SpaceGroteskSans = localFont({
  src: [
    {
      path: "../assets/fonts/SpaceGrotesk-Bold.woff2",
      weight: "bold",
      style: "normal",
    },
    {
      path: "../assets/fonts/SpaceGrotesk-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/SpaceGrotesk-Light.woff2",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-space-grotesk-sans",
});
