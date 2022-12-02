import {
  DialogContent,
  FormControl,
  InputLabel,
  OutlinedInput,
  DialogActions,
  Button,
} from "@material-ui/core";
import { Teams, useCreateTaskMutation } from "../../generated/graphql";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { AddTeam } from "../Team/AddTeam";
//@ts-ignore
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  projectId: number;
  handleRefetch: () => void;
  handleClick: () => void;
}

export const CreateTask: React.FC<Props> = ({
  projectId,
  handleRefetch,
  handleClick,
}) => {
  const currentUser = useSelector((state: RootState) => state.user.value);
  const [createTask] = useCreateTaskMutation();
  const initalState = {
    taskName: "",
    completeDate: "",
  };

  type NewTask = {
    taskName: string;
    completeDate: string;
  };
  const [newTask, setNewTask] = useState<NewTask>(initalState);
  const [newTeam, setNewTeam] = useState({
    name: "",
    id: 0,
  });
  const handleTeamChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewTask((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreate = async () => {
    handleClick();
    await createTask({
      variables: {
        completeDate: value.toString(),
        projectId: parseInt(projectId.toString()),
        taskName: newTask.taskName,
        creator: currentUser.id as number,
        teamId: newTeam.id,
      },
    });
    handleRefetch();
  };

  const [value, onChange] = useState(new Date());

  const addTeamToProject = (team: Teams) => {
    setNewTeam({ name: team.teamName, id: team.id });
  };

  return (
    <div>
      <form className="w-[480px] bg-white  p-6 z-30 left-[25%] top-[20%] absolute border-2 border-orange-500 rounded-md flex-col justify-center">
        <DialogContent>
          <div className="grid overflow-x-hidden">
            <button
              onClick={() => handleClick()}
              className="h-8 w-8 absolute p-2 text-lg text-white bg-orange-400 rounded-full left-[460px] top-[-2%]"
            >
              <FontAwesomeIcon icon={faXmark} className="mb-5 -mt-1" />
            </button>
            <FormControl
              style={{ margin: "20px auto", width: "50ch" }}
              variant="outlined"
            >
              <InputLabel htmlFor="taskName">Task Name</InputLabel>
              <OutlinedInput
                style={{ width: "380px", height: "55px" }}
                id="taskName"
                onChange={(e) => handleTeamChange(e)}
                label="Task Name"
                margin="dense"
                value={newTask.taskName}
                name="taskName"
                type="text"
              />
            </FormControl>
            <Calendar value={value} onChange={onChange} />
            <AddTeam addTeamToProject={addTeamToProject} />
          </div>
        </DialogContent>
        <div className="font-bold text-orange-500 ml-6">{newTeam.name}</div>
        <DialogActions>
          <Button
            style={{
              width: "380px",
              margin: "20px 0",
              marginRight: "auto",
              marginLeft: "15px",
            }}
            color="primary"
            variant="contained"
            onClick={() => handleCreate()}
          >
            Create
          </Button>
        </DialogActions>
      </form>
    </div>
  );
};
