import { useState } from "react";
import { FormControl, OutlinedInput, InputLabel } from "@material-ui/core";
import { useSearchTeamsQuery } from "../../generated/graphql";

interface Props {
  addTeamToProject: (team: Teams) => void;
}

export const AddTeam: React.FC<Props> = ({ addTeamToProject }) => {
  const [search, setSearch] = useState<string>();
  const { data } = useSearchTeamsQuery({
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
        <InputLabel htmlFor="outlined-adornment-password">Add Teams</InputLabel>
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
              <button type="button" onClick={() => addTeamToProject(team)}>
                +
              </button>
            </div>
          );
        })}
    </div>
  );
};
