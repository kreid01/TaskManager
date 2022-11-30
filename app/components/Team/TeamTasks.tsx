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
    <section className="mt-10  text-lg mx-auto">
      <div className="border-b-2 border-slate-800">
        {" "}
        <h2 className="title ml-2">Recent Tasks</h2>
      </div>

      <div className="mt-3 ml-5">
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

      <div className="ml-5">
        <CreateTask projectId={id as number} handleRefetch={handleRefetch} />
      </div>
      <div className="grid grid-cols-2 mt-5">
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
