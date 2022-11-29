"use client";
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
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface Props {
  handleRefetch: () => void;
}

export const CreateProject: React.FC<Props> = ({ handleRefetch }) => {
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

  const [open, setOpen] = useState(false);
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
  const handleCreate = () => {
    createProject({
      variables: {
        projectName: newProject.projectName,
        projectLead: currentUser.id as number,
        teams: newProject.teams,
      },
    });
    setOpen(false);
    handleRefetch();
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
      {!open ? (
        <div className="ml-5 my-5">
          <Button
            onClick={() => setOpen(true)}
            color="primary"
            type="button"
            variant="contained"
          >
            Create Project
          </Button>
        </div>
      ) : (
        <form className="border-[0px] shadow-lg border-orange-500 m-5 w-[440px] rounded-md">
          <DialogContent>
            <div className="grid  overflow-x-hidden r">
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
              <div className="font-bold text-orange-500">
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
