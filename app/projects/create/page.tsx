"use client";
import { Header } from "../../components/UI/Header";
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
  useCreateProjectMutation,
  useSearchTeamsQuery,
} from "../../generated/graphql";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function CreateProject() {
  type CreateProject = {
    projectName: string;
    teams: string;
  };

  const currentUser = useSelector((state: RootState) => state.user.value);
  const [createProject] = useCreateProjectMutation();

  const initalState = {
    projectName: "",
    teams: "",
  };

  const [newProject, setNewProject] = useState<CreateProject>(initalState);
  const [newTeams, setNewTeams] = useState<String[]>([]);

  const [search, setSearch] = useState<string>();
  const { data } = useSearchTeamsQuery({
    variables: { search: search as string },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(e.target.value);
  };

  const handleTeamChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewProject((prevState) => ({
      ...prevState,
      projectName: e.target.value,
    }));
  };

  const addTeamToProject = (team: Teams) => {
    setNewProject((prevState) => ({
      ...prevState,
      teams: prevState.teams + `${team.id}, `,
    }));
    setNewTeams((prevState) => [...prevState, team.teamName]);
  };

  return (
    <div>
      <Header title="Create Project" />
      <form>
        <DialogContent>
          <div className="grid">
            <FormControl
              style={{ margin: "20px 0", width: "50ch" }}
              variant="outlined"
            >
              <InputLabel htmlFor="teamName">Project Name</InputLabel>
              <OutlinedInput
                style={{ width: "380px", height: "55px" }}
                id="projectName"
                onChange={(e) => handleTeamChange(e)}
                label="Project Name"
                margin="dense"
                value={newProject.projectName}
                name="projectNName"
                type="text"
              />
            </FormControl>
            <div>
              Current Teams:
              <div>
                {" "}
                {newTeams.map((teams) => {
                  return <div>{teams}</div>;
                })}
              </div>
            </div>
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
                  <div className="border-b-[1px] border-gray-300 w-[380px] justify-between flex">
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
        <DialogActions>
          <Button
            style={{
              width: "380px",
              margin: "50px 0",
              marginRight: "auto",
              marginLeft: "20px",
            }}
            color="primary"
            type="submit"
            variant="contained"
            onClick={() =>
              createProject({
                variables: {
                  projectName: newProject.projectName,
                  projectLead: currentUser.id as number,
                  teams: newProject.teams,
                },
              })
            }
          >
            Create
          </Button>
        </DialogActions>
      </form>
    </div>
  );
}
