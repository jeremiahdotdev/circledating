import { AboutImage } from "./AboutImage";
import { AboutSection } from "./AboutSection";
import { banners } from "@/globals/banners";
import React from "react";

export function Summary() {
  const content = {
    top: {
      heading: "What makes Circle Dating different?",
      body: "Circle Dating is a relationship service that connects singles based on shared communities -- shared Circles. Each Circle represents a church, religious denomination, political affiliation, club, location, or hobby.",
    },
    middle: {
      heading: "Is my organization on Circle Dating?",
      body: "You can search and join Circles in our database, or you can create your own! Join Circles that capture your interest and define your personality. The more Circles you join, the more opportunity to connect with like-minded matches.",
    },
    bottom: {
      heading: "Is Circle Dating a Christian dating service?",
      body: "While Circle Dating was created and is owned by Christians, it is not a Christian dating service. At Circle, we believe that marriage is a good thing  -- regardless of your religious beliefs.",
    },
  };
  return (
    <div className="grid w-full grid-cols-1 gap-6 px-2 py-12 leading-relaxed sm:px-12 md:grid-cols-2 lg:grid-cols-3">
      <AboutSection {...content.top} />
      <AboutImage image={banners[5]} className={"bg-center"} />
      <div className="block h-fit w-fit md:hidden lg:block">
        <AboutSection {...content.middle} />
      </div>
      <AboutImage image={banners[1]} />
      <div className="hidden h-fit w-fit md:block lg:hidden">
        <AboutSection {...content.middle} />
      </div>
      <AboutSection {...content.bottom} />
      <AboutImage image={banners[4]} className={"bg-center"} />
    </div>
  );
}
