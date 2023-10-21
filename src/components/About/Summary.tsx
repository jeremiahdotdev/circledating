import { AboutSection } from "./AboutSection";
import React from "react";

export function Summary() {
  return (
    <div className="flex flex-col gap-6 px-2 py-12 leading-relaxed sm:px-12">
      <AboutSection
        heading="What makes Circle Dating different?"
        body="Circle Dating is a relationship service that connects singles based on
          shared communities -- shared Circles. These Circles can be based
          around a church, school, organization, location, and more."
      />
      <AboutSection
        heading="Is my organization on Circle Dating?"
        body="While Circle Dating was created and is owned by Christians, it is not
			a Christian dating service. At Circle, we believe that marriage is a
			good thing, regardless of your religion."
      />
      <AboutSection
        heading="Is Circle Dating a Christian dating service?"
        body="Circle Dating is a relationship service that connects singles based on
          shared communities -- shared Circles. These Circles can be based
          around a church, school, organization, location, and more."
      />
    </div>
  );
}
