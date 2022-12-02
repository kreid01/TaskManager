"use client";
import { Projects } from "../../generated/graphql";
import Link from "next/link";
import { UserCircle } from "../UI/UserCircle";
import { RecentTask } from "./RecentTask";

interface Props {
  project?: Projects;
  grid: number;
}

export const Project: React.FC<Props> = ({ project, grid }) => {
  return (
    <div className=" border-[1px] rounded-md p-2 mx-5 my-5 shadow-lg text-slate-800">
      <Link href={`/projects/${project?.id}`}>
        <header className="flex justify-between">
          <div className="flex">
            {" "}
            <h3 className="text-2xl font-bold mt-1"> {project?.projectName}</h3>
            <div className="ml-2">
              {" "}
              {project && (
                <UserCircle id={project.projectLead as number} />
              )}{" "}
            </div>{" "}
          </div>
        </header>
        <h2></h2>
        {project && <RecentTask id={project?.id as number} />}
      </Link>
    </div>
  );
};
