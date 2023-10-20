import React from "react";

export type InfographicProps = {
  message?: React.ReactNode;
  bubbleless?: boolean;
};

export function Infographic({ message, bubbleless }: InfographicProps) {
  const defaultMessage = "Hmmm... Nothing seems to be here.";
  return bubbleless ? (
    <h1 className="mx-4 w-full font-light">{message ?? defaultMessage}</h1>
  ) : (
    <div className="flex h-window w-full items-center justify-center self-center">
      <div className="rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400 p-16 shadow-2xl">
        <h1 className="font-bold text-white text-shadow-sm">
          {message ?? defaultMessage}
        </h1>
      </div>
    </div>
  );
}
