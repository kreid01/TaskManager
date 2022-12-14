import { useState } from "react";
import { FormControl, OutlinedInput, InputLabel } from "@material-ui/core";
import { Users, useSearchUsersQuery } from "../../generated/graphql";

interface Props {
  addUserToTeam: (user: Users) => void;
}

export const AddTeam: React.FC<Props> = ({ addUserToTeam }) => {
  const [search, setSearch] = useState<string>();
  const { data } = useSearchUsersQuery({
    variables: { search: search as string },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <FormControl
        style={{ margin: "20px 0", width: "25ch" }}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-password">
          Assign Members
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
            <div
              key={user.id}
              className="border-b-[1px] border-gray-300 w-[380px] justify-between flex"
            >
              <p>{user.firstName}</p>
              <button type="button" onClick={() => addUserToTeam(user)}>
                +
              </button>
            </div>
          );
        })}
    </div>
  );
};
