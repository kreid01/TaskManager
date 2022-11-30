import { useGetProjectsTasksQuery } from "../../generated/graphql";

interface Props {
  id: number;
}

export const RecentTask: React.FC<Props> = ({ id }) => {
  const { data } = useGetProjectsTasksQuery({ variables: { id: id } });

  const incompleteTasks = data?.getProjectTasks.filter(
    (task) => !task.isComplete
  );

  return (
    <div>
      {incompleteTasks &&
        incompleteTasks.length > 0 &&
        incompleteTasks.map((task, i) => {
          if (!task.isComplete && i < 1)
            return (
              <div className="flex justify-between mt-3 font-semibold">
                <p>Recent Task:</p>
                <p className="mx-1">{task.taskName}</p>
                <p className="ml-auto ">
                  Complete by: {task.completeDate.substring(0, 10)}
                </p>
              </div>
            );
        })}
    </div>
  );
};
