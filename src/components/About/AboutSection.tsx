import React from "react";
import classNames from "classnames";

export type AboutSectionProps = {
  heading: string;
  body: string;
  className?: string;
};

export function AboutSection({ heading, body, className }: AboutSectionProps) {
  return (
    <div
      className={classNames(
        className,
        "relative aspect-square rounded-lg border bg-white p-8 shadow flex-1 "
      )}
    >
      <div className="absolute -inset-2 -z-50 rounded-lg bg-cyan-100 opacity-75 blur" />
      <h2 className="flex flex-col pb-2 font-semibold text-shadow-xs">
        {heading}
      </h2>
      <p>{body}</p>
    </div>
  );
}
