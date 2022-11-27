import { Team } from "../Team/Team";
import { useGetUsersTeamsQuery } from "../../generated/graphql";

interface Props {
  id: number;
}

export const HomePageTeams: React.FC<Props> = ({ id }) => {
  const { data: teams } = useGetUsersTeamsQuery({
    variables: { id: id as number },
  });

  return (
    <section>
      <div className="border-b-2 border-y-blue-600">
        {" "}
        <h2 className="text-blue-800 mt-5 ml-5 font-bold text-4xl">
          Recent Teams
        </h2>
      </div>

      <div className="grid grid-cols-6">
        {teams?.getUsersTeams &&
          teams?.getUsersTeams.map((team) => {
            return <Team key={team.id} team={team} />;
          })}
      </div>
    </section>
  );
};
