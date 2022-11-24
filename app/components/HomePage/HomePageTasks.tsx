import { useGetUsersTasksQuery } from "../../generated/graphql";
import { Task } from "../UI/Task";

interface Props {
  id: number;
}

export const HomePageTasks: React.FC<Props> = ({ id }) => {
  const { data: tasks } = useGetUsersTasksQuery({
    variables: { id: id as number },
  });

  return (
    <section>
      <h2 className="text-blue-800 my-5 ml-5 font-bold text-2xl">Your Tasks</h2>
      <div className=" grid grid-cols-2">
        {tasks &&
          tasks.getUsersTasks.map((task) => {
            return <Task task={task} />;
          })}
      </div>
    </section>
  );
};
