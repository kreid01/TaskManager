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

interface Props {
  projectId: number;
  handleRefetch: () => void;
}

export const CreateTask: React.FC<Props> = ({ projectId, handleRefetch }) => {
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
    setOpen(false);
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

  const [open, setOpen] = useState(false);

  return (
    <div>
      {!open ? (
        <Button
          onClick={() => setOpen(true)}
          color="primary"
          style={{ marginTop: "20px", marginBottom: "40px" }}
          type="button"
          variant="contained"
        >
          Create Task{" "}
        </Button>
      ) : (
        <form className="border-[1px] shadow-lg border-orange-500 m-5 w-[440px] overflow-x-hidden rounded-md">
          <DialogContent>
            <div className="grid overflow-x-hidden">
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
      )}
    </div>
  );
};
