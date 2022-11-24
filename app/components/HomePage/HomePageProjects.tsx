import { Project } from "../Projects/Project";
import { useGetUsersProjectsQuery } from "../../generated/graphql";

interface Props {
  id: number;
}

export const HomePageProjects: React.FC<Props> = ({ id }) => {
  const { data: projects } = useGetUsersProjectsQuery({
    variables: { id: id as number },
  });

  return (
    <section>
      <h2 className="text-blue-800 mt-5 ml-5 font-bold text-2xl">
        Current Projects
      </h2>
      <div className="grid grid-cols-2">
        {projects?.getUsersProjects &&
          projects.getUsersProjects.map((project) => {
            return <Project key={project.id} project={project} />;
          })}
      </div>
    </section>
  );
};
