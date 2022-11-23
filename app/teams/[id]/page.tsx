"use client";
import { Header } from "../../components/Header";
import { LoadingSVG } from "../../components/LoadingSVG";
import {
  useGetTeamProjectQuery,
  useGetTeamQuery,
} from "../../generated/graphql";
import { UserName } from "../../components/UserName";
import Link from "next/link";
import { Button } from "@material-ui/core";
import { TeamMembers } from "../../components/TeamMembers";

export default function TeamPage({ params }: any) {
  const { data: team } = useGetTeamQuery({
    variables: { id: parseInt(params.id) as number },
  });

  const { data } = useGetTeamProjectQuery({
    variables: { id: parseInt(params.id) as number },
  });

  return team?.getTeam ? (
    <div>
      <Header title={team?.getTeam.teamName as string}></Header>
      <div className="h-[80.3vh]">
        <section className="mt-5 ml-5 text-lg mx-auto">
          <h2 className="text-blue-800 font-bold text-2xl">Team Lead</h2>

          <div className=" border-[1px] border-orange-500 rounded-md mr-5 p-2 mt-3 shadow-lg">
            <UserName id={team?.getTeam.teamLead as number} />
          </div>
        </section>
        <section className="mt-10 ml-5 text-lg mx-auto">
          <h2 className="text-blue-800 font-bold text-2xl">Members</h2>
          <TeamMembers members={team?.getTeam.members} />
        </section>

        <section className="mt-10 ml-5 text-lg mx-auto">
          <h2 className="text-blue-800 font-bold text-2xl">Current Projects</h2>

          <div className=" border-[1px] border-orange-500 rounded-md mr-5 p-2 mt-3 shadow-lg">
            {data &&
              data.getTeamProjects.map((project) => {
                return (
                  <div>
                    <Link href={`/projects/${project.id}`}>
                      <span className="font-bold text-orange-500">
                        {project.projectName}
                      </span>
                    </Link>
                  </div>
                );
              })}
          </div>
          <Link href="/projects/create">
            <Button
              color="primary"
              style={{ marginTop: "20px" }}
              type="button"
              variant="contained"
            >
              Create Project
            </Button>
          </Link>
        </section>
        <section className="mt-10 ml-5 text-lg mx-auto">
          <h2 className="text-blue-800 font-bold text-2xl">Recent Tasks</h2>

          <div className=" border-[1px] border-orange-500 rounded-md mr-5 p-2 mt-3 shadow-lg"></div>
          <Link href="/tasks/create">
            <Button
              color="primary"
              style={{ marginTop: "20px" }}
              type="button"
              variant="contained"
            >
              Create Task{" "}
            </Button>
          </Link>
        </section>
      </div>
    </div>
  ) : (
    <LoadingSVG />
  );
}
