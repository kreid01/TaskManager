"use client";
import { Button } from "@material-ui/core";
import Link from "next/link";
import { Header } from "../components/Header";
import { useGetUsersTeamsQuery } from "../generated/graphql";
import { Team } from "../components/Team";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function ProjectsPage() {
  const currentUser = useSelector((state: RootState) => state.user.value);

  const { data: teams } = useGetUsersTeamsQuery({
    variables: { id: currentUser?.id as number },
  });
  return (
    <div>
      <Header title="Your Projects" />
      <div className="grid grid-cols-2 my-5">
        {teams?.getUsersTeams.map((team) => {
          return (
            <div>
              <Team team={team} key={team.id} />
            </div>
          );
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
        <div className="ml-5">
          <Link href="/projects/create">
            <Button color="primary" type="button" variant="contained">
              Create Project
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
