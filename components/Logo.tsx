"use client";
import * as React from "react";

const yogaEmojis = [
  "🧘",
  "🧘🏻",
  "🧘🏼",
  "🧘🏽",
  "🧘🏾",
  "🧘🏿",
  "🧘‍♀️",
  "🧘🏻‍♀️",
  "🧘🏼‍♀️",
  "🧘🏽‍♀️",
  "🧘🏾‍♀️",
  "🧘🏿‍♀️",
  "🧘‍♂️",
  "🧘🏻‍♂️",
  "🧘🏼‍♂️",
  "🧘🏽‍♂️",
  "🧘🏾‍♂️",
  "🧘🏿‍♂️",
];

interface LogoProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function Logo({ size = 36, className, style }: LogoProps) {
  // Use useEffect to ensure random selection only happens client-side after hydration
  const [emoji, setEmoji] = React.useState(yogaEmojis[0]); // Default to first emoji for server render

  React.useEffect(() => {
    const randomIndex = Math.floor(Math.random() * yogaEmojis.length);

    setEmoji(yogaEmojis[randomIndex]);
  }, []);

  return (
    <div
      className={className}
      style={{
        fontSize: size,
        lineHeight: 1,
        ...style,
      }}
    >
      {emoji}
    </div>
  );
}
