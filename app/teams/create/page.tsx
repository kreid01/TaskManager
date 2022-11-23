"use client";
import { Header } from "../../components/Header";
import {
  DialogContent,
  FormControl,
  InputLabel,
  OutlinedInput,
  DialogActions,
  Button,
} from "@material-ui/core";
import {
  useCreateTeamMutation,
  Users,
  useSearchUsersQuery,
} from "../../generated/graphql";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function CreateTeam() {
  type CreateTeam = {
    teamName: string;
    members: string;
  };

  const currentUser = useSelector((state: RootState) => state.user.value);
  const [createTeam] = useCreateTeamMutation();

  const initalState = {
    teamName: "",
    members: "",
  };

  const [newTeam, setNewTeam] = useState<CreateTeam>(initalState);
  const [newMembers, setNewMembers] = useState<String[]>([]);

  const [search, setSearch] = useState<string>();
  const { data } = useSearchUsersQuery({
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
    setNewTeam((prevState) => ({
      ...prevState,
      teamName: e.target.value,
    }));
  };

  const addUserToTeam = (user: Users) => {
    setNewTeam((prevState) => ({
      ...prevState,
      members: prevState.members + `${user.id}, `,
    }));
    setNewMembers((prevState) => [
      ...prevState,
      user.firstName + " " + user.lastName,
    ]);
  };

  return (
    <div>
      <Header title="Create Team" />
      <form className="h-[80.3vh]">
        <DialogContent>
          <div className="grid">
            <FormControl
              style={{ margin: "20px 0", width: "50ch" }}
              variant="outlined"
            >
              <InputLabel htmlFor="teamName">Team Name</InputLabel>
              <OutlinedInput
                style={{ width: "380px", height: "55px" }}
                id="teamName"
                onChange={(e) => handleTeamChange(e)}
                label="Team Name"
                margin="dense"
                value={newTeam.teamName}
                name="teamName"
                type="text"
              />
            </FormControl>
            <div>
              Current members:
              <div>
                {" "}
                {newMembers.map((member) => {
                  return <div>{member}</div>;
                })}
              </div>
            </div>
            <FormControl
              style={{ margin: "20px 0", width: "25ch" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Add Members
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
                    <button type="button" onClick={() => addUserToTeam(user)}>
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
              createTeam({
                variables: {
                  teamName: newTeam.teamName,
                  teamLead: currentUser.id as number,
                  members: newTeam.members,
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
