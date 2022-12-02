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
import {
  faPeopleGroup,
  faProjectDiagram,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { UserCircle } from "../../components/UI/UserCircle";
import { CreateProject } from "../../components/Projects/CreateProject";
import { TeamTasks } from "../../components/Team/TeamTasks";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function TeamPage({ params }: any) {
  const { data: team } = useGetTeamQuery({
    variables: { id: parseInt(params.id) as number },
  });

  const currentUser = useSelector((state: RootState) => state.user.value);

  const router = useRouter();

  const [deleteTeam] = useDeleteTeamMutation();
  const [deleteTeamFromProjects] = useDeleteTeamFromProjectsMutation();
  const [deleteTeamTasks] = useDeleteTeamTasksMutation();

  const handleDelete = () => {
    deleteTeam({
      variables: { id: parseInt(params.id) as number },
      refetchQueries: () => [{ query: GetUsersTeamsDocument }],
    });
    deleteTeamFromProjects({
      variables: { id: parseInt(params.id) as number },
    });
    router.push("/teams");
    deleteTeamTasks({ variables: { id: parseInt(params.id) as number } });
  };

  const { data, refetch } = useGetTeamProjectQuery({
    variables: { id: parseInt(params.id) as number },
  });

  const handleRefetch = async () => {
    await refetch({ id: parseInt(params.id) as number });
  };

  return team?.getTeam && currentUser ? (
    <div>
      <header className="header ml-0 relative">
        <h1 className="title text-slate-800">
          {team?.getTeam.teamName} <FontAwesomeIcon icon={faPeopleGroup} />
        </h1>
        <div className=" flex font-bold absolute right-3 top-[5vh] text-2xl">
          <div className="text-slate-800"> Team Lead</div>{" "}
          <div className="-mt-2 ml-5">
            <UserCircle id={team?.getTeam.teamLead as number} />
          </div>
        </div>
      </header>
      <div className="min-h-[80.3vh]">
        <section className="border-b-2 flex border-slate-800">
          {" "}
          <h2 className=" ml-2 mt-4 font-bold text-2xl">Members</h2>
          <TeamMembers members={team?.getTeam.members} />
        </section>
        <section className="mt-5 text-lg mx-auto">
          <div className="border-b-2 border-slate-800">
            <h2 className="title">
              Current Projects <FontAwesomeIcon icon={faProjectDiagram} />
            </h2>
          </div>
          {!(data?.getTeamProjects && data.getTeamProjects.length > 1) ? (
            <div className="mt-5 ml-5">
              This team currently has no running projects. Try creating one now.
            </div>
          ) : (
            <div className="grid grid-cols-7 p-2 ml-3 mt-3">
              {data &&
                data.getTeamProjects.map((project) => {
                  return (
                    <div>
                      <Link href={`/projects/${project.id}`}>
                        <div className="mr-5  border-[1px] border-orange-500 p-4 rounded-md shadow-lg font-bold text-orange-500">
                          {project.projectName}
                        </div>
                      </Link>
                    </div>
                  );
                })}
            </div>
          )}
        </section>
        <CreateProject handleRefetch={handleRefetch} />
        <TeamTasks id={parseInt(params.id)} />
      </div>

      {currentUser.id === team.getTeam.teamLead && (
        <Button
          onClick={() => handleDelete()}
          variant="contained"
          color="secondary"
          style={{ width: "200px", color: "white", margin: "25px" }}
        >
          <FontAwesomeIcon icon={faTrashAlt} className="mr-3" /> Delete Team
        </Button>
      )}
    </div>
  ) : (
    <LoadingSVG />
  );
}
