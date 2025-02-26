import { Alegreya as FontSerif, Poppins as FontSans } from "next/font/google";

export const fontSerif = FontSerif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
});

export const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
});
