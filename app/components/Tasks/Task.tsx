import { faCheckCircle, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProjectName } from "../Projects/ProjectName";
import { TaskTeam } from "../Team/TaskTeam";
import {
  Tasks,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../../generated/graphql";

interface Props {
  task: Tasks;
  handleRefetch: () => void;
}

export const Task: React.FC<Props> = ({ task, handleRefetch }) => {
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const handleDelete = async () => {
    await deleteTask({
      variables: { id: task.id },
    });

    handleRefetch();
  };
  const handleUpdate = async () => {
    await updateTask({
      variables: {
        id: task.id as number,
        isComplete: true,
      },
    }),
      handleRefetch();
  };

  return (
    <div className="border-[1px] my-[1px] rounded-md mx-10 h-14 flex justify-between font-semibold">
      <div className="ml-5 flex my-auto">
        <p>{task.taskName}</p>
        <button
          className="h-6 w-6 rounded-md text-white bg-red-500"
          onClick={handleDelete}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
      <div className="flex my-auto">
        <p className="mx-10 w-24 my-auto">
          {task.completeDate.substring(0, 10)}
        </p>
        <p className="mx-10 w-24 my-auto">
          {task.isComplete ? (
            <div className="text-white bg-green-500 rounded-md">Completed</div>
          ) : (
            <div className="text-white bg-orange-500 rounded-md w-24 pl-2">
              In Progress
            </div>
          )}
        </p>
        <p className="mx-10 w-24 my-auto">
          {task.id !== 0 ? <ProjectName id={task.projectId} /> : null}
        </p>
        <p className="mx-10 w-24 my-auto">
          <TaskTeam id={task.teamId} />
        </p>
      </div>
    </div>
  );
};
