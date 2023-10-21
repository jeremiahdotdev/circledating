import { AboutImage } from "./AboutImage";
import { AboutSection } from "./AboutSection";
import { banners } from "@/globals/banners";
import React from "react";

export function Summary() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 px-2 py-12 leading-relaxed sm:px-12 md:grid-cols-2 lg:grid-cols-3">
      <AboutSection
        heading="What makes Circle Dating different?"
        body="Circle Dating is a relationship service that connects singles based on
          shared communities -- shared Circles. These Circles can be based
          around a church, school, organization, location, and more."
      />
      <AboutImage image={banners[5]} className={"bg-center"} />
      <div className="block h-fit w-fit md:hidden lg:block">
        <AboutSection
          heading="Is my organization on Circle Dating?"
          body="While Circle Dating was created and is owned by Christians, it is not
		  a Christian dating service. At Circle, we believe that marriage is a
		  good thing, regardless of your religion."
        />
      </div>
      <AboutImage image={banners[1]} />
      <div className="hidden h-fit w-fit md:block lg:hidden">
        <AboutSection
          heading="Is my organization on Circle Dating?"
          body="While Circle Dating was created and is owned by Christians, it is not
			a Christian dating service. At Circle, we believe that marriage is a
			good thing, regardless of your religion."
        />
      </div>
      <AboutSection
        heading="Is Circle Dating a Christian dating service?"
        body="Circle Dating is a relationship service that connects singles based on
          shared communities -- shared Circles. These Circles can be based
          around a church, school, organization, location, and more."
      />
      <AboutImage image={banners[4]} className={"bg-center"} />
    </div>
  );
}
