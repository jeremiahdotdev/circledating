import { AboutColumn } from "./AboutColumn";
import { Summary } from "./Summary";
import React from "react";

export function About() {
  return (
    <div className="font-display shadow-t-outter">
      <div className="grid grid-cols-2 border-b md:grid-cols-4">
        <AboutColumn
          className="bg-cyan-100"
          heading={"Marriage minded."}
          body={`Meet matches with a future. Get to know singles whose lives are already running parallel with your own.`}
        />
        <AboutColumn
          className="bg-sky-100"
          heading={"Traditionally textured."}
          body={`Circle Dating is for singles who want to build traditional, one-man-one-woman marriages.`}
        />
        <AboutColumn
          className="bg-purple-100"
          heading={"Community centered."}
          body={`Circle dating recreates real-world community in a format that makes connecting with other singles simple.`}
        />
        <AboutColumn
          className="bg-fuchsia-200"
          heading={"Always affordable."}
          body={`Meeting other singles doesn't have to break your budget. We keep our costs down so our membership can stay up.`}
        />
      </div>
      <Summary />
    </div>
  );
}
