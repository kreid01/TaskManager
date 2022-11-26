"use client";
import { LoadingSVG } from "../../components/UI/LoadingSVG";
import {
  GetUsersTeamsDocument,
  useDeleteTeamFromProjectsMutation,
  useDeleteTeamMutation,
  useDeleteTeamTasksMutation,
  useGetTeamProjectQuery,
  useGetTeamQuery,
} from "../../generated/graphql";
import Link from "next/link";
import { Button } from "@material-ui/core";
import { TeamMembers } from "../../components/Team/TeamMembers";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { UserCircle } from "../../components/UI/UserCircle";
import { CreateProject } from "../../components/Projects/CreateProject";

export default function TeamPage({ params }: any) {
  const { data: team } = useGetTeamQuery({
    variables: { id: parseInt(params.id) as number },
  });

  const router = useRouter();

  const [deleteTeam] = useDeleteTeamMutation();
  const [deleteTeamFromProjects] = useDeleteTeamFromProjectsMutation();
  const [deleteTeamTasks] = useDeleteTeamTasksMutation()

  const handleDelete = () => {
    deleteTeam({
      variables: { id: parseInt(params.id) as number },
      refetchQueries: () => [{ query: GetUsersTeamsDocument }],
    });
    deleteTeamFromProjects({
      variables: { id: parseInt(params.id) as number },
    });
    router.push("/teams");
    deleteTeamTasks({variables: {id: parseInt(params.id) as number}})
  };

  const { data } = useGetTeamProjectQuery({
    variables: { id: parseInt(params.id) as number },
  });

  return team?.getTeam ? (
    <div>
      <header className="header ml-0 relative">
        <h1 className="title">{team?.getTeam.teamName}</h1>
        <div className=" flex font-bold absolute left-3 top-[15px] text-2xl">
          <div className="text-white"> Team Lead</div>{" "}
          <div className="-mt-2 ml-5">
            <UserCircle id={team?.getTeam.teamLead as number} />
          </div>
        </div>
      </header>
      <div className="h-[80.3vh]">
        <section className="border-b-2 flex border-blue-600">
          {" "}
          <h2 className=" ml-5 mt-4 text-blue-800 font-bold text-4xl">
            Members
          </h2>
          <TeamMembers members={team?.getTeam.members} />
        </section>
        <section className="mt-5 ml-5 text-lg mx-auto">
          <h2 className="text-blue-800 font-bold text-2xl">Current Projects</h2>
          {!(data?.getTeamProjects && data.getTeamProjects.length > 1) ? (
            <div className="mt-5">
              This team currently has no running projects. Try creating one now.
            </div>
          ) : (
            <div className=" border-[1px] border-orange-500 rounded-md mr-5 p-2 mt-3 shadow-lg">
              {data &&
                data.getTeamProjects.map((project) => {
                  return (
                    <div>
                      <Link href={`/projects/${project.id}`}>
                        <span className="font-bold text-orange-500">
                          {project.projectName}
                        </span>
                      </Link>
                    </div>
                  );
                })}
            </div>
          )}
        </section>
        <CreateProject />
        <section className="mt-10 ml-5 text-lg mx-auto">
          <h2 className="text-blue-800 font-bold text-2xl">Recent Tasks</h2>
          <div className=" border-[1px] border-orange-500 rounded-md mr-5 p-2 mt-3 shadow-lg"></div>
        </section>
      </div>

      <Button
        onClick={() => handleDelete()}
        variant="contained"
        color="secondary"
        style={{ width: "200px", color: "white", margin: "25px" }}
      >
        <FontAwesomeIcon icon={faTrashAlt} className="mr-3" /> Delete Team
      </Button>
    </div>
  ) : (
    <LoadingSVG />
  );
}
