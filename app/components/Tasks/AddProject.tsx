import { useState } from "react";
import { FormControl, OutlinedInput, InputLabel } from "@material-ui/core";
import { Projects, useSearchProjectsQuery } from "../../generated/graphql";
import { TaskProject } from "./CreateTask";

interface Props {
  addProjectToTask: (project: TaskProject) => void;
}

export const AddProject: React.FC<Props> = ({ addProjectToTask }) => {
  const [search, setSearch] = useState<string>();
  const { data } = useSearchProjectsQuery({
    variables: { search: search as string },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(e.target.value);
  };

  return (
    <div className="ml-6">
      <FormControl
        style={{ margin: "20px 0", width: "25ch" }}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-password">
          Add Project
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
        data.searchProjects.map((project) => {
          return (
            <div
              key={project.id}
              className="border-b-[1px] border-gray-300 w-[380px] justify-between flex"
            >
              <p>{project.projectName}</p>
              <button type="button" onClick={() => addProjectToTask(project)}>
                +
              </button>
            </div>
          );
        })}
    </div>
  );
};
