"use client";
import {
  GetUsersTeamsDocument,
  Teams,
  useDeleteTeamMutation,
} from "../../generated/graphql";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import { TeamMembers } from "./TeamMembers";
import { UserCircle } from "../UI/UserCircle";

interface Props {
  team?: Teams;
}

export const Team: React.FC<Props> = ({ team }) => {
  const [deleteTeam] = useDeleteTeamMutation();

  const handleDelete = (event: any) => {
    event.stopPropagation();
    deleteTeam({
      variables: { id: team?.id as number },
      refetchQueries: () => [{ query: GetUsersTeamsDocument }],
    });
  };

  return (
    <div className=" border-[1px] bg-orange-500 rounded-md p-2 mx-5 my-5 shadow-lg text-white">
      <Link href={`/teams/${team?.id}`}>
        <header className="flex justify-between">
          <div className="flex">
            {" "}
            <h3 className="text-2xl font-bold text-white mt-1">
              {" "}
              {team?.teamName}
            </h3>
            <div className="ml-2">
              {" "}
              {team && <UserCircle id={team?.teamLead as number} />}{" "}
            </div>{" "}
          </div>

          <button
            onClick={(event) => handleDelete(event)}
            className="bg-red-500 text-white rounded-md w-8 h-8 hover:bg-red-800"
          >
            <FontAwesomeIcon icon={faTrashAlt} />{" "}
          </button>
        </header>
        <section>
          <TeamMembers members={team?.members as string} />
        </section>
        <p className="text-white text-sm">Most recent task</p>
      </Link>
    </div>
  );
};
