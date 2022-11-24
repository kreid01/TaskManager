import {
  DialogContent,
  FormControl,
  InputLabel,
  OutlinedInput,
  DialogActions,
  Button,
} from "@material-ui/core";
import {
  Teams,
  useCreateTaskMutation,
  useSearchTeamsQuery,
} from "../../generated/graphql";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface Props {
  projectId: number;
}

export const CreateTask: React.FC<Props> = ({ projectId }) => {
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
  const [search, setSearch] = useState<string>();
  const { data } = useSearchTeamsQuery({
    variables: { search: search as string },
  });
  const [newTask, setNewTask] = useState<NewTask>(initalState);
  const [newTeam, setNewTeam] = useState({
    name: "",
    id: 0,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(e.target.value);
  };

  const handleTeamChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewTask((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreate = () => {
    setOpen(false);
    createTask({
      variables: {
        completeDate: newTask.completeDate,
        projectId: parseInt(projectId.toString()),
        taskName: newTask.taskName,
        creator: currentUser.id as number,
        teamId: newTeam.id,
      },
    });
  };

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

              <FormControl
                style={{ margin: "20px 0", width: "50ch" }}
                variant="outlined"
              >
                <InputLabel htmlFor="Completed Date">Complete Date</InputLabel>
                <OutlinedInput
                  style={{ width: "380px", height: "55px" }}
                  id="completedDate"
                  onChange={(e) => handleTeamChange(e)}
                  label="Complete Date"
                  margin="dense"
                  value={newTask.completeDate}
                  name="completeDate"
                  type="text"
                />
              </FormControl>
              <FormControl
                style={{ margin: "20px 0", width: "25ch" }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Add Teams
                </InputLabel>
                <OutlinedInput
                  style={{ width: "380px", height: "55px" }}
                  onChange={(e) => handleChange(e)}
                  id="mebmers"
                  label="Add Members"
                  margin="dense"
                  name="members"
                  type="text"
                />
              </FormControl>
              {data &&
                data.searchTeams.map((team) => {
                  return (
                    <div
                      key={team.id}
                      className="border-b-[1px] border-gray-300 w-[380px] justify-between flex"
                    >
                      <p>{team.teamName}</p>
                      <button
                        type="button"
                        onClick={() => addTeamToProject(team)}
                      >
                        +
                      </button>
                    </div>
                  );
                })}
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
