import React from "react";

export type PageNotFoundProps = {
  error?: string;
};
export function PageNotFound({ error }: PageNotFoundProps) {
  return (
    <div className="flex h-window w-full items-center justify-center self-center">
      {error ? (
        <div className="rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400 p-16 shadow-2xl">
          <h1 className="font-bold text-white text-shadow-sm">{error}</h1>
        </div>
      ) : (
        <h1 className="font-bold">Hmmm... Nothing seems to be here.</h1>
      )}
    </div>
  );
}
