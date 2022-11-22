"use client";
import { Button } from "@material-ui/core";
import Link from "next/link";
import { Header } from "../components/Header";
import { useGetUsersProjectsQuery } from "../generated/graphql";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Project } from "../components/Project";

export default function ProjectsPage() {
  const currentUser = useSelector((state: RootState) => state.user.value);

  const { data: teams } = useGetUsersProjectsQuery({
    variables: { id: currentUser?.id as number },
  });
  return (
    <div>
      <Header title="Your Projects" />
      <div className="grid grid-cols-2 my-5">
        {teams?.getUsersProjects.map((project) => {
          return (
            <div>
              <Project project={project} />
            </div>
          );
        })}
      </div>
      <section className="w-full">
        <div>
          {!teams?.getUsersProjects && (
            <div className="font-semibold ml-5 text-lg mb-10">
              You are not a part of any projects, try creating one now.
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
