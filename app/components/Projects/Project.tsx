"use client";
import { Projects } from "../../generated/graphql";
import Link from "next/link";
import { UserName } from "../UI/UserName";
import { ProjectTeams } from "./ProjectTeams";
import { UserCircle } from "../UI/UserCircle";
import { RecentTask } from "./RecentTask";

interface Props {
  project?: Projects;
}

export const Project: React.FC<Props> = ({ project }) => {
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
        </header>
        <h2>
          <ProjectTeams teams={project?.teams as string} />
        </h2>
        <p className="flex my-2">
          Most recent task:{" "}
          {project && <RecentTask id={project?.id as number} />}
        </p>
      </Link>
    </div>
  );
};
