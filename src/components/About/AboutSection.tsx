import React from "react";

export type AboutSectionProps = {
  heading: string;
  body: string;
};

export function AboutSection({ heading, body }: AboutSectionProps) {
  return (
    <div className="rounded-lg border bg-gradient-to-b from-cyan-50 to-fuchsia-50 p-10 shadow">
      <h2 className="flex flex-col items-center pb-2 font-semibold text-shadow-xs">
        {heading}
      </h2>
      <p>{body}</p>
    </div>
  );
}
