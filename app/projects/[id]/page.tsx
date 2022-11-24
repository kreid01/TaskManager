"use client";
import { LoadingSVG } from "../../components/UI/LoadingSVG";
import {
  useGetProjectQuery,
  useGetProjectsTasksQuery,
} from "../../generated/graphql";
import { Button } from "@material-ui/core";
import { ProjectTeams } from "../../components//Projects/ProjectTeams";
import { Task } from "../../components/UI/Task";
import { useState } from "react";
import { CreateTask } from "../../components/UI/CreateTask";
import { UserCircle } from "../../components/UI/UserCircle";

export default function TeamPage({ params }: any) {
  const { data: project } = useGetProjectQuery({
    variables: { id: parseInt(params.id) as number },
  });

  const { data } = useGetProjectsTasksQuery({
    variables: { id: parseInt(params.id) as number },
  });

  return project?.getProject ? (
    <div>
      <header className="header ml-0 relative">
        <h1 className="title">{project.getProject.projectName}</h1>
        <div className=" flex font-bold absolute left-3 top-[15px] text-2xl">
          <div className="text-white"> Team Lead</div>{" "}
          <div className="-mt-2 ml-5">
            <UserCircle id={project?.getProject.projectLead as number} />
          </div>
        </div>
      </header>
      <div>
        <section className="mt-5 ml-5 text-lg mx-auto">
          <h2 className="text-blue-800 font-bold text-2xl">Teams</h2>
          <ProjectTeams teams={project.getProject.teams} />{" "}
        </section>
        <section className="mt-10 ml-5 text-lg mx-auto">
          <h2 className="text-blue-800 my-5 font-bold text-2xl">
            Recent Tasks
          </h2>
          <div className=" grid-cols-3 grid">
            {}
            {data?.getProjectTasks &&
              data?.getProjectTasks.map((task) => <Task task={task} />)}
          </div>

          <CreateTask projectId={params.id as number} />
        </section>
      </div>
    </div>
  ) : (
    <LoadingSVG />
  );
}
