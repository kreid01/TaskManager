import { Project } from "../Projects/Project";
import { useGetUsersProjectsQuery } from "../../generated/graphql";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faProjectDiagram } from "@fortawesome/free-solid-svg-icons";

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
      <div className="border-b-2 border-y-slate-900">
        <h2 className="title">
          Current Projects
          <FontAwesomeIcon className="ml-2" icon={faProjectDiagram} />
        </h2>
      </div>
      <div className="grid grid-cols-3">
        {projects?.getUsersProjects &&
          projects.getUsersProjects.map((project) => {
            return <Project grid={2} key={project.id} project={project} />;
          })}
      </div>
    </section>
  );
};