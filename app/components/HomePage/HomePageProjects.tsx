import { faPlus, faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetUsersProjectsQuery } from "../../generated/graphql";
import { CreateProject } from "../Projects/CreateProject";
import { Project } from "../Projects/Project";

interface Props {
  id: number;
  open: boolean;
  handleClick: () => void;
}

export const HomePageProjects: React.FC<Props> = ({
  id,
  handleClick,
  open,
}) => {
  const { data: tasks, refetch } = useGetUsersProjectsQuery({
    variables: { id: id as number },
  });
  const handleRefetch = () => {
    refetch({ id: id });
  };

  const isOpenStyle = open
    ? "brightness-[60%] bg-white h-[90vh]"
    : "relative bg-gray-50 h-[90vh]";

  return (
    <section className="relative -mt-1">
      <div className="grid relative">
        {open && (
          <CreateProject
            handleClick={handleClick}
            handleRefetch={handleRefetch}
          />
        )}
        <div className={isOpenStyle}>
          <h2 className="title ml-5 mt-5">Project Board</h2>
          <div className=" md:mx-10 flex justify-between font-semibold my-5">
            <p className="ml-5">Project</p>
            <div className="flex mr-10">
              <p className="md:mx-10 w-24">End Date</p>
              <p className="md:mx-10 w-24">Status</p>
              <p className="hidden lg:block mx-10 w-32">Assignees</p>

              <FontAwesomeIcon className="mt-1" icon={faSliders} />
            </div>
          </div>

          <div
            onClick={() => handleClick()}
            className="border-[1px] my-[1px] text-orange-500 cursor-pointer hover:shadow-lg border-orange-500 border-dashed rounded-md mx-1 md:mx-10 h-14 flex font-semibold"
          >
            <div className="ml-5 my-auto">
              <FontAwesomeIcon className="mr-3" icon={faPlus} />
              Add New Project
            </div>
          </div>
          {tasks &&
            tasks?.getUsersProjects.length > 0 &&
            tasks.getUsersProjects.map((project) => {
              return (
                <Project
                  handleRefetch={handleRefetch}
                  key={project.id}
                  project={project}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
};
