import { Team } from "../Team/Team";
import { useGetUsersTeamsQuery } from "../../generated/graphql";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";

interface Props {
  id: number;
}

export const HomePageTeams: React.FC<Props> = ({ id }) => {
  const { data: teams } = useGetUsersTeamsQuery({
    variables: { id: id as number },
  });

  return (
    <section>
      <div className="border-b-2 border-y-slate-900">
        <h2 className="title">
          Recent Teams <FontAwesomeIcon icon={faPeopleGroup} />
        </h2>
      </div>

      <div className="grid grid-cols-4 xl:grid-cols-5">
        {teams?.getUsersTeams &&
          teams?.getUsersTeams.map((team) => {
            return <Team key={team.id} team={team} />;
          })}
      </div>
    </section>
  );
};
