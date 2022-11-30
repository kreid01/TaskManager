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
  useCreateTeamMutation,
  Users,
  useSearchUsersQuery,
} from "../../generated/graphql";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface Props {
  handleRefetch: () => void;
}

export const CreateTeam: React.FC<Props> = ({ handleRefetch }) => {
  type CreateTeam = {
    teamName: string;
    members: string;
  };

  const currentUser = useSelector((state: RootState) => state.user.value);
  const [createTeam] = useCreateTeamMutation();

  const initialState = {
    teamName: "",
    members: "",
  };

  const [newTeam, setNewTeam] = useState<CreateTeam>(initialState);
  const [newMembers, setNewMembers] = useState<String[]>([]);

  const [search, setSearch] = useState<string>();
  const { data } = useSearchUsersQuery({
    variables: { search: search as string },
  });

  const handleCreate = () => {
    createTeam({
      variables: {
        teamName: newTeam.teamName,
        teamLead: currentUser.id as number,
        members: newTeam.members,
      },
    });
    setOpen(false);
    setNewTeam(initialState);
    setNewMembers([]);
    handleRefetch();
  };

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

  const [open, setOpen] = useState(false);

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
      {!open ? (
        <div className="m-5">
          <Button
            onClick={() => setOpen(true)}
            color="primary"
            type="button"
            variant="contained"
          >
            Create Team
          </Button>
        </div>
      ) : (
        <form className="border-[1px] shadow-lg border-orange-500 m-5 w-[440px] rounded-md">
          <DialogContent>
            <div className="grid  overflow-x-hidden r">
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
                    return (
                      <div clasName="font-bold text-orange-500">{member}</div>
                    );
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
                margin: "10px 0",
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
