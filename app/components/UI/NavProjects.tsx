import { faCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Project, removeProject, setProjects } from "../../slices/projectSlice";
import { RootState } from "../../store/store";

export const NavProjects: React.FC = ({}) => {
  const dispatch = useDispatch();
  const handleFav = (project: Project) => {
    dispatch(removeProject(project));
  };

  const favProjects = Array.from(
    new Set(useSelector((state: RootState) => state.project.value))
  );
  useEffect(() => {
    window.localStorage.setItem("projects", JSON.stringify(favProjects));
  }, [favProjects]);

  return (
    <div>
      <h1 className="text-gray-300 mb-1 mt-[40vh] font-semibold text-lg ml-5">
        Favourite Projects
      </h1>
      {favProjects &&
        favProjects.map((project) => {
          return (
            <div className="text-gray-300 py-2 hover:bg-slate-600 flex font-semibold text-lg">
              <FontAwesomeIcon className="h-2 mr-4 mt-2 ml-5" icon={faCircle} />{" "}
              <h2>{project.projectName}</h2>
              <button
                onClick={() => handleFav(project)}
                className="text-yellow-500 h-3 ml-auto mr-5"
              >
                <FontAwesomeIcon icon={faStar} />
              </button>
            </div>
          );
        })}
    </div>
  );
};
