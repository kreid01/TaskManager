import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TaskTeam } from "../Team/TaskTeam";
import { Projects, useDeleteProjectMutation } from "../../generated/graphql";
import { faSliders, faStar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setProjects,
} from "../../slices/projectSlice";
import { ProjectTask } from "./ProjectTasks";
import { RootState } from "../../store/store";

interface Props {
  project: Projects;
  handleRefetch: () => void;
}

export const Project: React.FC<Props> = ({ project, handleRefetch }) => {
  const [deleteProject] = useDeleteProjectMutation();
  const dispatch = useDispatch();
  const handleDelete = async () => {
    await deleteProject({
      variables: { id: project.id },
    });

    handleRefetch();
  };
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };
  const favProjects = useSelector((state: RootState) => state.project.value);

  const projectFav = {
    id: project.id,
    projectName: project.projectName,
  };
  const handleFavourite = () => {
    const projects = [...favProjects];
    let filter = projects.filter((project) => project.id !== projectFav.id);
    filter = [...filter, projectFav];
    dispatch(setProjects(filter));
  };
  return (
    <div className="border-[1px] my-2 relative rounded-md mx-10 max-h-64">
      <div className=" flex justify-between font-semibold border-b-[1px]">
        <div className="ml-5 flex my-auto">
          <p>{project.projectName}</p>
        </div>
        <div className="flex my-auto mr-10">
          <p className="mx-10 w-24 my-auto">
            {project.completeDate.substring(0, 10)}
          </p>
          <p className="mx-10 w-24 my-auto">
            {project.isComplete ? (
              <div className="text-white bg-green-500 rounded-md">
                Completed
              </div>
            ) : (
              <div className="text-white bg-orange-500 rounded-md w-24 pl-2">
                In Progress
              </div>
            )}
          </p>
          <p className="mx-10 w-32 my-auto">
            <TaskTeam members={project.members} />
          </p>
          <FontAwesomeIcon
            onClick={handleClick}
            className="mt-5"
            icon={faSliders}
          />
          {open ? (
            <div className="absolute right-16 w-28 h-10 flex justify-center bg-gray-50 shadow-lg rounded-md">
              <button
                className="h-6 my-auto w-6 mx-3 rounded-md text-white bg-red-500"
                onClick={handleDelete}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
              <button
                className="text-yellow-500 mr-2"
                onClick={handleFavourite}
              >
                <FontAwesomeIcon icon={faStar} />{" "}
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <h1 className="font-semibold ml-5 my-2">Project Tasks</h1>
      <ProjectTask id={project.id} />
    </div>
  );
};
