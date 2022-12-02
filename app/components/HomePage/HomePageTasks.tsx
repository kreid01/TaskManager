import { faPlus, faTasksAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useGetUsersTasksQuery } from "../../generated/graphql";
import { CreateTask } from "../Tasks/CreateTask";
import { Task } from "../Tasks/Task";

interface Props {
  id: number;
}

export const HomePageTasks: React.FC<Props> = ({ id }) => {
  const { data: tasks, refetch } = useGetUsersTasksQuery({
    variables: { id: id as number },
  });
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(false);
  };
  const handleRefetch = () => {
    refetch({ id: id });
  };

  const isOpenStyle = open
    ? "brightness-[60%] bg-white"
    : "relative bg-gray-50";

  return (
    <section className="relative -mt-2">
      <div className="grid relative">
        {open && (
          <CreateTask
            handleClick={handleClick}
            projectId={14}
            handleRefetch={handleRefetch}
          />
        )}
        <div className={isOpenStyle}>
          <h2 className="title ml-5 mt-5">Task Board</h2>
          <div className=" mx-10 flex justify-between font-semibold my-5">
            <p className="ml-5">Task</p>
            <div className="flex">
              <p className="mx-10 w-24">End Date</p>
              <p className="mx-10 w-24">Status</p>
              <p className="mx-10 w-24">Project</p>
              <p className="mx-10 w-24">Assignees</p>
            </div>
          </div>

          <div
            onClick={() => setOpen(true)}
            className="border-[1px] my-[1px] text-orange-500 cursor-pointer hover:shadow-lg border-orange-500 border-dashed rounded-md mx-10 h-14 flex font-semibold"
          >
            <div className="ml-5 my-auto">
              <FontAwesomeIcon className="mr-3" icon={faPlus} />
              Add New Task
            </div>
          </div>
          {tasks &&
            tasks.getUsersTasks.map((task) => {
              if (!task.isComplete) {
                return <Task handleRefetch={handleRefetch} task={task} />;
              }
            })}
        </div>
      </div>
    </section>
  );
};
