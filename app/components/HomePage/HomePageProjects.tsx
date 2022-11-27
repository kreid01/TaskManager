import { Project } from "../Projects/Project";
import { useGetUsersProjectsQuery } from "../../generated/graphql";

interface Props {
  id: number;
}

export const HomePageProjects: React.FC<Props> = ({ id }) => {
  const { data: projects, refetch } = useGetUsersProjectsQuery({
    variables: { id: id as number },
  });

  const refetchData = () => {
    refetch({ id: id as number });
  };

  return (
    <section>
      <div className="border-b-2 border-blue-600">
        <h2 className="text-blue-800 mt-5 ml-5 font-bold text-4xl">
          Current Projects
        </h2>
      </div>
      <div className="grid grid-cols-2">
        {projects?.getUsersProjects &&
          projects.getUsersProjects.map((project) => {
            return <Project key={project.id} project={project} />;
          })}
      </div>
    </section>
  );
};