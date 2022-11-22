"use client";
import {
  Teams,
  useDeleteTeamMutation,
  useGetTeamMembersQuery,
} from "../generated/graphql";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
interface Props {
  team?: Teams;
}

export const Team: React.FC<Props> = ({ team }) => {
  const { data: teamMembers } = useGetTeamMembersQuery({
    variables: { team: team?.members.trim() as string },
  });
  const [deleteTeam] = useDeleteTeamMutation();

  return (
    <div className=" border-[1px] border-orange-500 rounded-md p-2 mx-5 shadow-lg">
      <header className="flex justify-between">
        <h3 className="text-lg font-bold">Team Name: {team?.teamName}</h3>
        <button
          onClick={() => deleteTeam({ variables: { id: team?.id as number } })}
          className="bg-red-500 text-white rounded-md w-8 h-8 hover:bg-red-800"
        >
          <FontAwesomeIcon icon={faTrashAlt} />{" "}
        </button>
      </header>
      <h2>
        Members:
        <div className="flex">
          {teamMembers?.getTeamMembers.map((member) => (
            <div key={member.id} className="mr-1">
              {member.firstName}
            </div>
          ))}
        </div>
      </h2>
      <p className="text-gray-400 text-sm">Most recent task</p>
    </div>
  );
};