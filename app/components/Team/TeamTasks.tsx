import { Tasks, useGetTeamTasksQuery } from "../../generated/graphql";
import { CompletedTasks } from "../Tasks/CompletedTasks";
import { CreateTask } from "../Tasks/CreateTask";
import { Task } from "../Tasks/Task";

interface Props {
  id: number;
}

export const TeamTasks: React.FC<Props> = ({ id }) => {
  const { data: tasks, refetch } = useGetTeamTasksQuery({
    variables: { getTeamTasksId: id as number },
  });

  const handleRefetch = async () => {
    await refetch({ getTeamTasksId: id });
  };

  return (
    <section className="mt-10 ml-5 text-lg mx-auto">
      <h2 className="text-blue-800 font-bold text-2xl">Recent Tasks</h2>
      <div className="mt-3">
        {tasks?.getTeamTasks && tasks?.getTeamTasks.length > 5 ? (
          <div className="grid grid-cols-3">
            {tasks.getTeamTasks.map((task) => {
              if (!task.isComplete) {
                return (
                  <Task
                    handleRefetch={handleRefetch}
                    key={task.id}
                    task={task}
                  />
                );
              }
            })}
          </div>
        ) : (
          <div>Your team currently does not have any incomplete tasks.</div>
        )}
      </div>

      <div>
        <CreateTask projectId={id as number} handleRefetch={handleRefetch} />
      </div>
      <div className="grid grid-cols-3 mt-5 -ml-5">
        {tasks?.getTeamTasks && (
          <CompletedTasks
            handleRefetch={handleRefetch}
            tasks={tasks?.getTeamTasks as Tasks[]}
          />
        )}
      </div>
    </section>
  );
};
