import React from "react";
import classNames from "classnames";

export type AboutColumnProps = {
  heading: string;
  body: string;
  className: string;
};

export function AboutColumn({ heading, body, className }: AboutColumnProps) {
  return (
    <div
      className={classNames(
        className,
        "border font-display flex gap-4 flex-1 flex-col items-center p-10 text-center"
      )}
    >
      <h2 className="font-semibold text-shadow-xs">{heading}</h2>
      <p className="mx-3 leading-loose">{body}</p>
    </div>
  );
}
