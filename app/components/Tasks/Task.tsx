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
    <div className="text-slate-800 border-[1px rounded-md p-2 m-5 shadow-lg">
      <header className="flex justify-between">
        {" "}
        <h3 className="text-2xl font-bold">{task.taskName}</h3>
        <div>
          {!task.isComplete && (
            <button
              onClick={() => handleUpdate()}
              className="bg-green-500 mr-2 text-white rounded-md w-8 h-8 hover:bg-green-800"
            >
              {" "}
              <FontAwesomeIcon icon={faCheckCircle} />{" "}
            </button>
          )}
          <button
            className="bg-red-500 text-white rounded-md w-8 h-8 hover:bg-red-800"
            onClick={() => handleDelete()}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </header>

      <h2 className="flex font-semibold -mb-2">
        Project: <ProjectName id={task.projectId} />
      </h2>
      <h2>
        {task.teamId !== 0 ? (
          <TaskTeam id={task.teamId} />
        ) : (
          <div>This Project has no teams assigned.</div>
        )}
      </h2>
      <p className="mt-2 text-sm">
        Date to be completed: {task.completeDate.substring(0, 10)}
      </p>
    </div>
  );
};
