import { useGetProjectsTasksQuery } from "../../generated/graphql";
import { PTask } from "../Tasks/PTask";
import { Task } from "../Tasks/Task";

interface Props {
  id: number;
}

export const ProjectTask: React.FC<Props> = ({ id }) => {
  const { data, refetch } = useGetProjectsTasksQuery({ variables: { id: id } });
  const handleRefetch = () => {
    refetch({ id: id });
  };
  return data?.getProjectTasks && data.getProjectTasks.length > 0 ? (
    <div>
      <div className="relative mx-5 h-14 flex lg:w-[60%] font-semibold">
        <div className="mx-3 md:ml-5 w-32 flex my-auto">Name</div>
        <div className="flex my-auto mr-8">
          <p className="mx-3 md:mx-10 w-24 my-auto">End Date</p>
          <p className="mx-3 md:mx-10 w-24 my-auto">Status</p>
          <p className="hidden lg:block mx-10 w-28 my-auto">Assignees</p>
        </div>
      </div>
      {data &&
        data.getProjectTasks.map((task) => {
          return (
            <PTask handleRefetch={handleRefetch} key={task.id} task={task} />
          );
        })}
    </div>
  ) : (
    <div className="ml-5 mb-5">This project has no tasks assigned</div>
  );
};
