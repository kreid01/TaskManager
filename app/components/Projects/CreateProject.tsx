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
  useCreateProjectMutation,
  Users,
  useSearchUsersQuery,
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
    members: string;
  };

  const currentUser = useSelector((state: RootState) => state.user.value);
  const [createProject] = useCreateProjectMutation();

  const initalState = {
    projectName: "",
    members: "",
  };

  const [newProject, setNewProject] = useState<CreateProject>(initalState);
  const [newMembers, setNewMembers] = useState<String[]>([]);

  const [search, setSearch] = useState<string>();
  const { data } = useSearchUsersQuery({
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
        members: newProject.members,
      },
    });
    setOpen(false);
    handleRefetch();
  };

  const addUserToProject = (user: Users) => {
    setNewProject((prevState) => ({
      ...prevState,
      members: prevState.members + `${user.id}, `,
    }));
    setNewMembers((prevState) => [
      ...prevState,
      `${(user.firstName, user.lastName)}`,
    ]);
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
                  {newMembers.map((members) => {
                    return <div>{members}</div>;
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
                data.searchUsers.map((user) => {
                  return (
                    <div className="border-b-[1px] border-gray-300 w-[380px] justify-between flex">
                      <p>
                        {user.firstName} {user.lastName}
                      </p>
                      <button
                        type="button"
                        onClick={() => addUserToProject(user)}
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
