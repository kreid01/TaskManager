import React from "react";

export const Footer = () => {
  return (
    <footer className="text-white   bg-gradient-to-r from-blue-500 -ml-1 to-blue-600 w-[80vw] md:w-[83.3vw] h-[140px]">
      <div className="my-auto w-[60%] mx-auto">
        <div className="flex justify-between">
          <h1 className="font-bold text-3xl text-amber-400 underline pt-12 mx-3">
            Tasker{" "}
          </h1>
          <div className="text-sm mt-10">
            <h2 className="font-bold text-base">Contact us</h2>
            <p>tasker@tasker.com</p>
            <p>0774399812</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
