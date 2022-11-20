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
import { useForm } from "react-hook-form";
import { useSearchUsersQuery } from "../../generated/graphql";
import { useState } from "react";

export default function CreateTeam() {
  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });

  type CreateTeam = {
    teamName: string;
    members: string;
  };
  const [search, setSearch] = useState<string>();
  const { data } = useSearchUsersQuery({
    variables: { search: search as string },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(e.target.value);
  };

  console.log(data);

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
              <InputLabel htmlFor="outlined-adornment-password">
                Team Name
              </InputLabel>
              <OutlinedInput
                {...register("teamName")}
                style={{ width: "380px", height: "55px" }}
                id="teamName"
                label="Team Name"
                margin="dense"
                name="teamName"
                type="text"
              />
            </FormControl>
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
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ width: "410px" }}
            color="primary"
            type="button"
            variant="contained"
          >
            Create
          </Button>
        </DialogActions>
      </form>
    </div>
  );
}
