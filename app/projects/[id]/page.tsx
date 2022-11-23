"use client";
import { Header } from "../../components/Header";
import { LoadingSVG } from "../../components/LoadingSVG";
import { useGetProjectQuery } from "../../generated/graphql";
import { UserName } from "../../components/UserName";
import Link from "next/link";
import { Button } from "@material-ui/core";
import { ProjectTeams } from "../../components/ProjectTeams";

export default function TeamPage({ params }: any) {
  const { data: project } = useGetProjectQuery({
    variables: { id: parseInt(params.id) as number },
  });

  return project?.getProject ? (
    <div>
      <Header title={project?.getProject.projectName as string}></Header>
      <div className="h-[80.3vh]">
        <section className="mt-5 ml-5 text-lg mx-auto">
          <h2 className="text-blue-800 font-bold text-2xl">Team Lead</h2>

          <div className=" border-[1px] border-orange-500 rounded-md mr-5 p-2 mt-3 shadow-lg">
            <UserName id={project?.getProject.projectLead as number} />
          </div>
        </section>
        <section className="mt-10 ml-5 text-lg mx-auto">
          <h2 className="text-blue-800 font-bold text-2xl">Teams</h2>
          <ProjectTeams teams={project.getProject.teams} />{" "}
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
