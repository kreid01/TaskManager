import { faCheckCircle, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProjectName } from "../Projects/ProjectName";
import { TaskTeam } from "../Team/TaskTeam";
import {
  Tasks,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../../generated/graphql";
import { faCheck, faSliders } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

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

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <div className="border-[1px] my-[1px] relative rounded-md mx-10 h-14 flex justify-between font-semibold">
      <div className="ml-5 flex my-auto">
        <p>{task.taskName}</p>
      </div>
      <div className="flex my-auto mr-10">
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
          {task.projectId !== 14 ? (
            <ProjectName id={task.projectId} />
          ) : (
            <div>No Project</div>
          )}
        </p>
        <p className="mx-10 w-32 my-auto">
          <TaskTeam members={task.members} />
        </p>
        <FontAwesomeIcon
          onClick={handleClick}
          className="mt-5"
          icon={faSliders}
        />
        {open ? (
          <div className="absolute right-16 wi28 h-10 flex justify-center bg-gray-50 shadow-lg rounded-md">
            <button
              className="h-6 my-auto w-6 mx-3 rounded-md text-white bg-red-500"
              onClick={handleDelete}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>

            <button
              className="h-6 w-6 mx-3 my-auto rounded-md text-white bg-green-500"
              onClick={handleUpdate}
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
