import { useGetProjectTeamsQuery } from "../../generated/graphql";

import { TeamMembers } from "../Team/TeamMembers";

interface Props {
  teams: string;
}

export const ProjectTeams: React.FC<Props> = ({ teams }) => {
  const { data } = useGetProjectTeamsQuery({
    variables: { teams: teams.trim() as string },
  });

  return (
    <div className="ml-5 border-[1px] bg-orange-500 rounded-md mr-5 p-1 mt-4 shadow-lg">
      {data?.getProjectTeams.map((team) => (
        <section className="flex" key={team.id}>
          <span className="font-semibold text-white text-lg mt-4 ml-3">
            {team.teamName}
          </span>
          <TeamMembers members={team.members} />
        </section>
      ))}
    </div>
  );
};
