import { faCheckCircle, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TaskTeam } from "../Team/TaskTeam";
import {
  Tasks,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../../generated/graphql";
import { faCheck, faSliders, faStar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addTask, setTasks } from "../../slices/taskSlice";

interface Props {
  task: Tasks;
  handleRefetch: () => void;
}

export const PTask: React.FC<Props> = ({ task, handleRefetch }) => {
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

  const pinnedTasks = useSelector((state: RootState) => state.task.value);
  const dispatch = useDispatch();
  const pinned = {
    id: task.id,
    taskName: task.taskName,
    completeBy: task.completeDate,
  };
  const handleFavourite = () => {
    if (pinnedTasks) {
      const tasks = [...pinnedTasks];
      let filter = tasks.filter((task) => task.id !== pinned.id);
      filter = [...filter, pinned];
      dispatch(setTasks(filter));
    } else {
      dispatch(addTask(pinned));
    }
  };

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <div className="relative mx-1 md:mx-5 h-14  flex md:w-[60%] font-semibold">
      <div className="ml-5 flex w-32 my-auto">
        <p>{task.taskName}</p>
      </div>
      <div className="flex my-auto mr-12">
        <p className="mx-3 md:mx-10 w-20 my-auto">
          {task.completeDate.substring(0, 10)}
        </p>
        <p className="mx-3 md:mx-10 w-24 my-auto">
          {task.isComplete ? (
            <div className="text-white bg-green-500 rounded-md  pl-2">
              Completed
            </div>
          ) : (
            <div className="text-white bg-orange-500 rounded-md w-24 pl-2">
              In Progress
            </div>
          )}
        </p>
        <p className="hidden lg:block mx-10 w-28 my-auto">
          <TaskTeam members={task.members} />
        </p>
        <FontAwesomeIcon
          onClick={handleClick}
          className="mt-1 md:mt-5"
          icon={faSliders}
        />
        {open ? (
          <div className="absolute right-16 w-28 h-10 flex justify-center bg-gray-50 shadow-lg rounded-md">
            <button
              className="h-6 my-auto w-6 mx-2 rounded-md text-white bg-red-500"
              onClick={handleDelete}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>

            <button
              className="h-6 w-6 mx-2 my-auto rounded-md text-white bg-green-500"
              onClick={handleUpdate}
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>

            <button className="text-yellow-500 mx-2" onClick={handleFavourite}>
              <FontAwesomeIcon icon={faStar} />{" "}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
