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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface Props {
  handleRefetch: () => void;
  handleClick: () => void;
}

export const CreateProject: React.FC<Props> = ({
  handleRefetch,
  handleClick,
}) => {
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
  const [value, onChange] = useState(new Date());
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
        completeDate: value.toString(),
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
      `${user.firstName} ${user.lastName}`,
    ]);
  };

  return (
    <div>
      <form className="w-[480px] bg-white  p-6 z-30 left-[35%] top-[5%] absolute border-2 border-orange-500 rounded-md flex-col justify-center">
        <DialogContent>
          <div className="grid  overflow-x-hidden r">
            <button
              onClick={() => handleClick()}
              className="h-8 w-8 absolute p-2 text-lg text-white bg-orange-400 rounded-full left-[460px] top-[-2%]"
            >
              <FontAwesomeIcon icon={faXmark} className="mb-5 -mt-1" />
            </button>
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
            <Calendar value={value} onChange={onChange} />
            <div className="font-bold mt-5 text-orange-500">
              Current Team
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
                Assign Team
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
                    {`${user.firstName} ${user.lastName}`}

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
              margin: "10px 0",
              marginRight: "auto",
              marginLeft: "20px",
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
