"use client";
import {
  Projects,
  useDeleteProjectMutation,
  useDeleteTeamMutation,
} from "../generated/graphql";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import { UserName } from "./UserName";

interface Props {
  project?: Projects;
}

export const Project: React.FC<Props> = ({ project }) => {
  const [deleteProject] = useDeleteProjectMutation();

  return (
    <div className=" border-[1px] border-orange-500 rounded-md p-2 mx-5 my-5 shadow-lg">
      <Link href={`/teams/${project?.id}`}>
        <header className="flex justify-between">
          <h3 className="text-lg font-bold">
            Project Name: {project?.projectName}
          </h3>
          <button
            onClick={() =>
              deleteProject({ variables: { id: project?.id as number } })
            }
            className="bg-red-500 text-white rounded-md w-8 h-8 hover:bg-red-800"
          >
            <FontAwesomeIcon icon={faTrashAlt} />{" "}
          </button>
        </header>
        <div className="flex">
          <h4 className="mr-2">Project Lead:</h4>{" "}
          {project && <UserName id={project?.projectLead as number} />}{" "}
        </div>
        <h2>Teams:</h2>
        <p className="text-gray-400 text-sm">Most recent task</p>
      </Link>
    </div>
  );
};
