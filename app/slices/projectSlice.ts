import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IProject {
  value: Project[];
}

export type Project = {
  id: number | null;
  projectName: string | null;
};

export const initialState: IProject = {
  value: [] as Array<Project>,
};

export const projectSlice = createSlice({
  name: "Project",
  initialState,
  reducers: {
    removeProject: (state, action: PayloadAction<Project>) => {
      const index = state.value.indexOf(action.payload);
      state.value.splice(index, 1);
    },
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.value = action.payload;
    },
  },
});

export const { removeProject, setProjects } = projectSlice.actions;

export default projectSlice.reducer;
