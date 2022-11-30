import {
  faMailBulk,
  faPencilAlt,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const Footer = () => {
  return (
    <footer className="text-slate-600 -ml-1 w-[80vw] border-t-2 border-gray-300 md:w-[83.3vw] h-[2vh]">
      <div className="my-auto w-[99%]">
        <div className="flex justify-between">
          <h1 className="font-bold  self-start text-gray-500 pt-1 mx-3">
            <FontAwesomeIcon icon={faPencilAlt} /> Tasker{" "}
          </h1>
          <div className="text-sm flex mt-2">
            <p className="mx-3">
              <FontAwesomeIcon icon={faMailBulk} /> tasker@tasker.com
            </p>
            <p>
              <FontAwesomeIcon icon={faPhoneAlt} /> 0774399812
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
