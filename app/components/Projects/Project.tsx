"use client";
import {
  Projects,
  useDeleteProjectMutation,
  useDeleteTeamMutation,
} from "../../generated/graphql";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import { UserName } from "../UI/UserName";
import { ProjectTeams } from "./ProjectTeams";
import { UserCircle } from "../UI/UserCircle";

interface Props {
  project?: Projects;
  refetchData: () => void;
}

export const Project: React.FC<Props> = ({ project, refetchData }) => {
  const [deleteProject] = useDeleteProjectMutation();

  const handleDelete = () => {
    deleteProject({ variables: { id: project?.id as number } });
    refetchData();
  };

  return (
    <div className=" border-[1px] bg-orange-500 rounded-md p-2 mx-5 my-5 shadow-lg text-white">
      <Link href={`/projects/${project?.id}`}>
        <header className="flex justify-between">
          <div className="flex">
            {" "}
            <h3 className="text-2xl font-bold text-white mt-1">
              {" "}
              {project?.projectName}
            </h3>
            <div className="ml-2">
              {" "}
              {project && (
                <UserCircle id={project.projectLead as number} />
              )}{" "}
            </div>{" "}
          </div>
          <button
            onClick={() => handleDelete()}
            className="bg-red-500 text-white rounded-md w-8 h-8 hover:bg-red-800"
          >
            <FontAwesomeIcon icon={faTrashAlt} />{" "}
          </button>
        </header>
        <h2>
          <ProjectTeams teams={project?.teams as string} />
        </h2>
        <p className=" text-sm">Most recent task</p>
      </Link>
    </div>
  );
};
