"use client";
import { Header } from "../components/UI/Header";
import { useGetUsersTeamsQuery } from "../generated/graphql";
import { Team } from "../components/Team/Team";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { CreateTeam } from "../components/Team/CreateTeam";

export default function TeamsPage() {
  const currentUser = useSelector((state: RootState) => state.user.value);

  const { data: teams, refetch } = useGetUsersTeamsQuery({
    variables: { id: currentUser?.id as number },
  });

  const refetchData = () => {
    refetch({ id: currentUser?.id as number });
  };

  return (
    <div>
      <Header title="Your Teams" />
      {teams?.getUsersTeams && teams?.getUsersTeams.length > 0 ? (
        <div>
          <div className="grid grid-cols-2 my-5">
            {teams?.getUsersTeams.map((team) => {
              return <Team team={team} key={team.id} />;
            })}
          </div>
          <section className="w-full h-[78vh]">
            <div>
              {!teams?.getUsersTeams && (
                <div className="font-semibold ml-5 text-lg mb-10">
                  You are not a part of any teams, try creating one now.
                </div>
              )}
            </div>

            <CreateTeam refetchData={refetchData} />
          </section>
        </div>
      ) : (
        <CreateTeam refetchData={refetchData} />
      )}
    </div>
  );
}
