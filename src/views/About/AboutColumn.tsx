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
        "flex flex-1 flex-col items-center p-4 text-center"
      )}
    >
      <h2 className="p-4 font-semibold">{heading}</h2>
      <p className="mx-3 leading-loose">{body}</p>
    </div>
  );
}
