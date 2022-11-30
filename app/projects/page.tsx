"use client";
import { Header } from "../components/UI/Header";
import { useGetUsersProjectsQuery } from "../generated/graphql";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Project } from "../components/Projects/Project";
import { CreateProject } from "../components/Projects/CreateProject";

export default function ProjectsPage() {
  const currentUser = useSelector((state: RootState) => state.user.value);

  const { data: teams, refetch } = useGetUsersProjectsQuery({
    variables: { id: currentUser?.id as number },
  });


const handleCreate = async () => {
  await refetch({ id: currentUser?.id as number });
};

return (
  <div>
    <Header title="Your Projects" />
    <div className="grid grid-cols-2 my-5">
      {teams?.getUsersProjects.map((project) => {
        return (
          <div>
            <Project grid={3} project={project} />
          </div>
        );
      })}
    </div>
    <section>
      <div>
        {teams?.getUsersProjects && teams?.getUsersProjects.length === 0 && (
          <div className="font-semibold ml-5 text-lg mb-10">
            You are not a part of any projects, try creating one now.
          </div>
        )}
      </div>

      <CreateProject handleRefetch={handleCreate} />
    </section>
  </div>
);
}
