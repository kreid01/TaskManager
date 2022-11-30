import { useGetProjectTeamsQuery } from "../../generated/graphql";
import Link from "next/link";
import { TeamMembers } from "../Team/TeamMembers";

interface Props {
  teams: string;
  grid: number;
}

export const ProjectTeams: React.FC<Props> = ({ teams, grid }) => {
  const { data } = useGetProjectTeamsQuery({
    variables: { teams: teams.trim() as string },
  });

  return (
    <div className={`ml-5 text-slate-800 grid grid-cols-${grid} mr-5 p-1 mt-4`}>
      {data?.getProjectTeams.map((team) => (
        <div
          className="flex border-[1px] mr-4 mb-4 border-gray-300 rounded-md shadow-lg"
          key={team.id}
        >
          <Link href={`/teams/${team.id}`}>
            {" "}
            <div className="font-semibold text-lg ml-3 mt-4">
              {team.teamName}
            </div>
          </Link>

          <TeamMembers members={team.members} />
        </div>
      ))}
    </div>
  );
};
