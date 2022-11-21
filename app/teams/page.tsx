"use client";
import { Button } from "@material-ui/core";
import Link from "next/link";
import { Header } from "../components/Header";
import { useGetUserQuery, useGetUsersTeamsQuery } from "../generated/graphql";
import { Team } from "../components/Team";

export default function teamsPage() {
  const { data: user } = useGetUserQuery();

  const { data: teams } = useGetUsersTeamsQuery({
    variables: { id: user?.getUser?.id as number },
  });
  return (
    <div>
      <Header title="Your Teams" />
      <div className="grid grid-cols-2 my-5">
        {teams?.getUsersTeams.map((team) => {
          return (
            <div>
              <Team team={team} />
            </div>
          );
        })}
      </div>
      <section className="w-full h-[87vh]">
        <div className="ml-auto">
          <Link href="/teams/create">
            <Button color="primary" type="button" variant="contained">
              Create Team
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
