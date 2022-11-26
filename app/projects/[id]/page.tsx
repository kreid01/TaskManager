"use client";
import { LoadingSVG } from "../../components/UI/LoadingSVG";
import {
  GetProjectTeamsDocument,
  GetUsersProjectsDocument,
  Teams,
  useDeleteProjectMutation,
  useGetProjectQuery,
  useGetProjectsTasksQuery,
  useUpdateProjectTeamsMutation,
} from "../../generated/graphql";
import { Button } from "@material-ui/core";
import { Task } from "../../components/Tasks/Task";
import { useState } from "react";
import { UserCircle } from "../../components/UI/UserCircle";
import { CreateTask } from "../../components/Tasks/CreateTask";
import { AddTeam } from "./AddTeam";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { ProjectTeams } from "../../components/Projects/ProjectTeams";

export default function TeamPage({ params }: any) {
  const { data: project } = useGetProjectQuery({
    variables: { id: parseInt(params.id) as number },
  });

  const { data } = useGetProjectsTasksQuery({
    variables: { id: parseInt(params.id) as number },
  });

  const [updateProject] = useUpdateProjectTeamsMutation();

  const addTeamToProject = (team: Teams) => {
    updateProject({
      variables: {
        id: parseInt(params.id),
        teams: project?.getProject.teams + `${team.id}, `,
      },
      refetchQueries: [
        {
          query: GetProjectTeamsDocument,
          variables: { id: parseInt(params.id) },
        },
      ],
    });
  };

  const router = useRouter();
  const [deleteProject] = useDeleteProjectMutation();

  const handleDelete = () => {
    deleteProject({
      variables: { id: parseInt(params.id) },
      refetchQueries: () => [{ query: GetUsersProjectsDocument }],
    });
    router.push("/projects");
  };

  const [open, setOpen] = useState(false);

  return project?.getProject ? (
    <div>
      <header className="header ml-0 relative">
        <h1 className="title">{project.getProject.projectName}</h1>
        <div className=" flex font-bold absolute left-3 top-[15px] text-2xl">
          <div className="text-white"> Project Lead</div>{" "}
          <div className="-mt-2 ml-5">
            <UserCircle id={project?.getProject.projectLead as number} />
          </div>
        </div>
      </header>
      <div>
        <section className="mt-5 text-lg mx-auto">
          <div className="border-b-2 border-blue-600">
            <h2 className="text-blue-800 font-bold ml-5 mt-5 text-4xl">
              Teams
            </h2>
          </div>
          {project.getProject && project.getProject.teams.length > 2 ? (
            <ProjectTeams teams={project.getProject.teams} />
          ) : (
            <div className="m-5">
              This project does not currently have any teams.
            </div>
          )}{" "}
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
            <h2 className="text-blue-800 ml-5 mt-5 font-bold text-4xl">
              Recent Tasks
            </h2>
          </div>

          <div className=" grid-cols-3 grid">
            {data?.getProjectTasks && data.getProjectTasks.length > 0 ? (
              data?.getProjectTasks.map((task) => <Task task={task} />)
            ) : (
              <div className="m-5">
                This project does not currently have any tasks.
              </div>
            )}
          </div>
          <div className="ml-5">
            <CreateTask projectId={params.id as number} />
          </div>
        </section>
      </div>{" "}
      <Button
        onClick={() => handleDelete()}
        variant="contained"
        color="secondary"
        style={{ width: "200px", color: "white", margin: "25px" }}
      >
        <FontAwesomeIcon icon={faTrashAlt} className="mr-3" /> Delete Project
      </Button>
    </div>
  ) : (
    <LoadingSVG />
  );
}
