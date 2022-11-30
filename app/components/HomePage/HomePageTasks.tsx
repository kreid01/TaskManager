import { faTasksAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetUsersTasksQuery } from "../../generated/graphql";
import { Task } from "../Tasks/Task";

interface Props {
  id: number;
}

export const HomePageTasks: React.FC<Props> = ({ id }) => {
  const { data: tasks, refetch } = useGetUsersTasksQuery({
    variables: { id: id as number },
  });

  const handleRefetch = () => {
    refetch({ id: id });
  };

  return (
    <section>
      <div className="border-b-2 border-y-slate-900">
        <h2 className="title">
          Your Tasks <FontAwesomeIcon icon={faTasksAlt} />
        </h2>
      </div>
      <div className=" grid grid-cols-3">
        {tasks &&
          tasks.getUsersTasks.map((task) => {
            if (!task.isComplete) {
              return <Task handleRefetch={handleRefetch} task={task} />;
            }
          })}
      </div>
    </section>
  );
};
