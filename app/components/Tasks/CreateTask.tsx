import {
  DialogContent,
  FormControl,
  InputLabel,
  OutlinedInput,
  DialogActions,
  Button,
} from "@material-ui/core";
import {
  Projects,
  useCreateTaskMutation,
  Users,
} from "../../generated/graphql";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { AddTeam } from "../Team/AddTeam";
//@ts-ignore
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AddProject } from "./AddProject";

interface Props {
  projectId?: number;
  handleRefetch: () => void;
  handleClick: () => void;
}

export type TaskProject = {
  projectName: string;
  id: number;
};

export const CreateTask: React.FC<Props> = ({
  projectId,
  handleRefetch,
  handleClick,
}) => {
  const initalState = {
    taskName: "",
    completeDate: "",
    members: "",
    projectId: 0,
  };
  const currentUser = useSelector((state: RootState) => state.user.value);
  const [project, setProject] = useState<String>("");
  const [newTask, setNewTask] = useState<NewTask>(initalState);
  const [newMembers, setNewMembers] = useState<String[]>([]);
  const [createTask] = useCreateTaskMutation();

  const [value, onChange] = useState(new Date());

  type NewTask = {
    taskName: string;
    completeDate: string;
    members: string;
    projectId: number;
  };

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
        projectId:
          projectId != undefined
            ? parseInt(projectId.toString())
            : newTask.projectId,
        taskName: newTask.taskName,
        creator: currentUser.id as number,
        members: newTask.members,
      },
    });
    handleRefetch();
  };

  const addProjectToTask = (project: TaskProject) => {
    setNewTask((prevState) => ({
      ...prevState,
      [prevState.projectId]: project.id,
    }));
    setProject(project.projectName);
  };

  const addUserToTeam = (user: Users) => {
    setNewTask((prevState) => ({
      ...prevState,
      members: prevState.members + `${user.id}, `,
    }));
    setNewMembers((prevState) => [
      ...prevState,
      `${user.firstName} ${user.lastName}`,
    ]);
  };

  return (
    <div>
      <form className="w-[480px] bg-white  p-6 z-30 left-[35%] top-[15%] absolute border-2 border-orange-500 rounded-md flex-col justify-center">
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
            <AddTeam addUserToTeam={addUserToTeam} />
          </div>
        </DialogContent>
        <div className="font-bold text-orange-500 ml-6">
          Current Members:
          <div>
            {" "}
            {newMembers.map((members) => {
              return <div>{members}</div>;
            })}
          </div>
        </div>
        {newTask.projectId === 0 ? (
          <AddProject addProjectToTask={addProjectToTask} />
        ) : (
          <div>{project}</div>
        )}
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
