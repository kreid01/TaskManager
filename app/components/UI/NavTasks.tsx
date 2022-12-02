import { faCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Project, removeProject, setProjects } from "../../slices/projectSlice";
import { removeTask, setTasks, Task } from "../../slices/taskSlice";
import { RootState } from "../../store/store";

export const NavTasks: React.FC = ({}) => {
  const dispatch = useDispatch();
  const handleFav = (task: Task) => {
    dispatch(removeTask(task));
  };

  const pinnedTasks = Array.from(
    new Set(useSelector((state: RootState) => state.task.value))
  );

  useEffect(() => {
    window.localStorage.setItem("tasks", JSON.stringify(pinnedTasks));
  }, [pinnedTasks]);

  return (
    <div>
      <h1 className="text-gray-300 font-semibold text-lg ml-5 mt-5">
        Pinned Tasks
      </h1>
      {pinnedTasks &&
        pinnedTasks.map((task) => {
          return (
            <div className="text-gray-300 py-2 mx-2 border-b-[1px] border-gray-50  font-semibold text-lg">
              <header className="flex">
                <h2>{task.taskName}</h2>
                <button
                  onClick={() => handleFav(task)}
                  className="text-yellow-500 h-3 ml-auto mr-5"
                >
                  <FontAwesomeIcon icon={faStar} />
                </button>
              </header>
              <p className="text-gray-400">
                Complete by: {task.completeBy?.substring(0, 10)}
              </p>
            </div>
          );
        })}
    </div>
  );
};
