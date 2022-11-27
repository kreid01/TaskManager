import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-ui/core";
import { useState } from "react";
import { Task } from "./Task";
import { Tasks } from "../../generated/graphql";

interface Props {
  tasks: Tasks[];
  handleRefetch: () => void;
}

export const CompletedTasks: React.FC<Props> = ({ tasks, handleRefetch }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{ marginLeft: "20px" }}
        color="primary"
        onClick={() => handleClick()}
      >
        See Completed Tasks
        <FontAwesomeIcon
          icon={open ? faArrowUp : faArrowDown}
          className="ml-3"
        />
      </Button>{" "}
      <div className="grid grid-cols-3">
        {open &&
          tasks.map((task) => {
            if (task.isComplete) {
              return (
                <Task handleRefetch={handleRefetch} task={task} key={task.id} />
              );
            }
          })}
      </div>
    </div>
  );
};
