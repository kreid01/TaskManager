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
}

export const Task: React.FC<Props> = ({ task }) => {
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  return (
    <div className=" border-[1px] border-orange-500 rounded-md p-2 m-5 shadow-lg">
      <header className="flex justify-between">
        {" "}
        <h3 className="text-lg font-bold">
          Task Name: <span className="text-orange-500">{task.taskName}</span>
        </h3>
        <div>
          {!task.isComplete && (
            <button
              onClick={() =>
                updateTask({
                  variables: {
                    id: task.id as number,
                    isComplete: true,
                  },
                })
              }
              className="bg-green-500 mr-5 text-white rounded-md w-8 h-8 hover:bg-green-800"
            >
              {" "}
              <FontAwesomeIcon icon={faCheckCircle} />{" "}
            </button>
          )}
          <button
            className="bg-red-500 text-white rounded-md w-8 h-8 hover:bg-red-800"
            onClick={() => deleteTask({ variables: { id: task.id } })}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </header>

      <h2 className="flex">
        Project <ProjectName id={task.projectId} />
      </h2>
      <h2>
        <TaskTeam id={task.teamId} />
      </h2>
      <p className="text-gray-400 text-sm">
        Date to be completed: {task.completeDate}
      </p>
    </div>
  );
};
