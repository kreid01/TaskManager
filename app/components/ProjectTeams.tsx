import { useGetProjectTeamsQuery } from "../generated/graphql";

import Link from "next/link";
import { TeamMembers } from "./TeamMembers";

interface Props {
  teams: string;
}

export const ProjectTeams: React.FC<Props> = ({ teams }) => {
  const { data } = useGetProjectTeamsQuery({
    variables: { teams: teams.trim() as string },
  });

  return (
    <div className=" border-[1px] border-orange-500 rounded-md mr-5 p-2 mt-3 shadow-lg">
      {data?.getProjectTeams.map((team) => (
        <section key={team.id}>
          <span className="font-semibold text-blue-900">{team.teamName}</span>
          <TeamMembers members={team.members} />
        </section>
      ))}
    </div>
  );
};
