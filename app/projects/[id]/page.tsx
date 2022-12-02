"use client";
import { LoadingSVG } from "../../components/UI/LoadingSVG";
import {
  GetProjectTeamsDocument,
  GetUsersProjectsDocument,
  Tasks,
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
import { AddTeam } from "../../components/Team/AddTeam";
import {
  faPeopleGroup,
  faProjectDiagram,
  faTasksAlt,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { ProjectTeams } from "../../components/Projects/ProjectTeams";
import { CompletedTasks } from "../../components/Tasks/CompletedTasks";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function TeamPage({ params }: any) {
  const { data: project } = useGetProjectQuery({
    variables: { id: parseInt(params.id) as number },
  });

  const { data, refetch } = useGetProjectsTasksQuery({
    variables: { id: parseInt(params.id) as number },
  });

  const [updateProject] = useUpdateProjectTeamsMutation();

  const addTeamToProject = (team: Teams) => {
    updateProject({
      variables: {
        id: parseInt(params.id),
        teams: project?.getProject.teams + `${team.id}, `,
      },
    }),
      refetch({ id: parseInt(params.id) as number });
  };

  const handleRefetch = async () => {
    await refetch({ id: parseInt(params.id) });
  };

  const currentUser = useSelector((state: RootState) => state.user.value);
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

  return project?.getProject && currentUser ? (
    <div>
      <header className="header relative">
        <h1 className="title text-slate-900">
          {project.getProject.projectName}{" "}
          <FontAwesomeIcon icon={faProjectDiagram} />
        </h1>
        <div className=" flex font-bold absolute right-3 top-[5vh] text-2xl">
          <div className="text-slate-800"> Project Lead</div>{" "}
          <div className="-mt-2 ml-5">
            <UserCircle id={project?.getProject.projectLead as number} />
          </div>
        </div>
      </header>
      <div className="min-h-[82vh]">
        <section className="mt-5 text-lg mx-auto">
          <div className="border-b-2 border-slate-800">
            <h2 className="title pt-3">
              Teams
              <FontAwesomeIcon className="ml-1" icon={faPeopleGroup} />
            </h2>
          </div>
          {project.getProject && project.getProject.teams.length > 2 ? (
            <ProjectTeams grid={5} teams={project.getProject.teams} />
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
          <div className="border-b-2 border-slate-800">
            {" "}
            <h2 className="title">
              Recent Tasks <FontAwesomeIcon icon={faTasksAlt} />
            </h2>
          </div>

          <div className=" grid-cols-3 grid">
            {data?.getProjectTasks && data.getProjectTasks.length > 0 ? (
              data?.getProjectTasks.map(
                (task) =>
                  !task.isComplete && (
                    <Task handleRefetch={handleRefetch} task={task} />
                  )
              )
            ) : (
              <div className="m-5">
                This project does not currently have any tasks.
              </div>
            )}
          </div>
          <div className="ml-5">
            <CreateTask
              projectId={params.id as number}
              handleRefetch={handleRefetch}
            />
          </div>
          {data?.getProjectTasks && (
            <CompletedTasks
              tasks={data?.getProjectTasks as Tasks[]}
              handleRefetch={handleRefetch}
            />
          )}
        </section>
      </div>{" "}
      {currentUser.id === project.getProject.projectLead && (
        <Button
          onClick={() => handleDelete()}
          variant="contained"
          color="secondary"
          style={{
            width: "200px",
            color: "white",
            margin: "25px",
          }}
        >
          <FontAwesomeIcon icon={faTrashAlt} className="mr-3" /> Delete Project
        </Button>
      )}
    </div>
  ) : (
    <LoadingSVG />
  );
}
