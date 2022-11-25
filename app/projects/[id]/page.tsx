"use client";
import { LoadingSVG } from "../../components/UI/LoadingSVG";
import {
  GetUsersTeamsDocument,
  Teams,
  useGetProjectQuery,
  useGetProjectsTasksQuery,
  useUpdateProjectTeamsMutation,
} from "../../generated/graphql";
import { Button } from "@material-ui/core";
import { ProjectTeams } from "../../components//Projects/ProjectTeams";
import { Task } from "../../components/UI/Task";
import { useState } from "react";
import { CreateTask } from "../../components/UI/CreateTask";
import { UserCircle } from "../../components/UI/UserCircle";
import { AddTeam } from "./AddTeam";

export default function TeamPage({ params }: any) {
  const { data: project } = useGetProjectQuery({
    variables: { id: parseInt(params.id) as number },
  });

  const { data, refetch } = useGetProjectsTasksQuery({
    variables: { id: parseInt(params.id) as number },
  });

  const [updateProject] = useUpdateProjectTeamsMutation();

  const refetchData = () => {
    refetch({ id: parseInt(params.id) as number });
  };

  const addTeamToProject = (team: Teams) => {
    updateProject({
      variables: {
        id: parseInt(params.id),
        teams: project?.getProject.teams + `${team.id}, `,
      },
      refetchQueries: () => [
        {
          query: GetUsersTeamsDocument,
          variables: { id: parseInt(params.id) },
        },
      ],
    });
  };

  const [open, setOpen] = useState(false);

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
        <section className="mt-5 text-lg mx-auto">
          <div className="border-b-2 border-blue-600">
            <h2 className="text-blue-800 font-bold m-5 text-4xl">Teams</h2>
          </div>
          <ProjectTeams teams={project.getProject.teams} />{" "}
          <div className="ml-5 mt-5">
            {" "}
            {!open ? (
              <Button
                color="primary"
                variant="contained"
                onClick={() => setOpen(true)}
              >
                Add Teams
              </Button>
            ) : (
              <AddTeam addTeamToProject={addTeamToProject} />
            )}
          </div>{" "}
        </section>

        <section className="mt-10 text-lg mx-auto">
          <div className="border-b-2 border-blue-600">
            {" "}
            <h2 className="text-blue-800 ml-5 my-5 font-bold text-4xl">
              Recent Tasks
            </h2>
          </div>

          <div className=" grid-cols-3 grid">
            {}
            {data?.getProjectTasks &&
              data?.getProjectTasks.map((task) => (
                <Task refetchData={refetchData} task={task} />
              ))}
          </div>
          <div className="ml-5">
            <CreateTask
              refetchData={refetchData}
              projectId={params.id as number}
            />
          </div>
        </section>
      </div>{" "}
    </div>
  ) : (
    <LoadingSVG />
  );
}
