"use client";
import { Header } from "../components/UI/Header";
import {
  useDeleteTeamMutation,
  useGetUsersTeamsQuery,
} from "../generated/graphql";
import { Team } from "../components/Team/Team";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { CreateTeam } from "../components/Team/CreateTeam";

export default function TeamsPage() {
  const currentUser = useSelector((state: RootState) => state.user.value);

  const { data: teams, refetch } = useGetUsersTeamsQuery({
    variables: { id: currentUser?.id as number },
  });

const handleRefetch = () => {
  refetch({ id: currentUser.id as number });
};

return (
  <div>
    <Header title="Your Teams" />
    {teams?.getUsersTeams && teams?.getUsersTeams.length > 0 ? (
      <div>
        <div className="grid grid-cols-4 my-5">
          {teams?.getUsersTeams.map((team) => {
            return <Team team={team} key={team.id} />;
          })}
        </div>
        <section className="w-full ">
          <div>
            {!teams?.getUsersTeams && (
              <div className="font-semibold ml-5 text-lg mb-10">
                You are not a part of any teams, try creating one now.
              </div>
            )}
          </div>

          <CreateTeam handleRefetch={handleRefetch} />
        </section>
      </div>
    ) : (
      <CreateTeam handleRefetch={handleRefetch} />
    )}
  </div>
);
}
