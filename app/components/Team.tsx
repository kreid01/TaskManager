"use client";
import { Teams, useGetTeamMembersQuery } from "../generated/graphql";

interface Props {
  team?: Teams;
}

export const Team: React.FC<Props> = ({ team }) => {
  const { data: teamMembers } = useGetTeamMembersQuery({
    variables: { team: team?.members as string },
  });

  console.log(teamMembers?.getTeamMembers);
  return (
    <div className=" border-[1px] border-orange-500 rounded-md p-2 mx-5 shadow-lg">
      <h3 className="text-lg font-bold">Team Name: {team?.teamName}</h3>
      <h2>Members:</h2>
      <p className="text-gray-400 text-sm">Most recent task</p>
    </div>
  );
};
