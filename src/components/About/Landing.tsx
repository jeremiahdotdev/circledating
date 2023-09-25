import React from "react";

export function Landing() {
  return (
    <div className="h-screen w-full  bg-church-sample bg-cover text-white shadow-inner-xl">
      <div className="flex h-full w-full justify-end sm:w-3/4">
        <div className="flex w-1/3 flex-col justify-center gap-8 italic">
          <h1 className="flex text-8xl">Date</h1>
          <p className="flex justify-center text-5xl">within your</p>
          <h1 className="flex justify-end text-8xl">Circle</h1>
        </div>
      </div>
    </div>
  );
}
