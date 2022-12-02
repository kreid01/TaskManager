import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ITask {
  value: Task[];
}

export type Task = {
  id: number | null;
  taskName: string | null;
  completeBy: string | null;
};

export const initialState: ITask = {
  value: [] as Array<Task>,
};

export const taskSlice = createSlice({
  name: "Task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.value = [action.payload];
    },
    removeTask: (state, action: PayloadAction<Task>) => {
      const index = state.value.indexOf(action.payload);
      state.value.splice(index, 1);
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.value = action.payload;
    },
  },
});

export const { addTask, removeTask, setTasks } = taskSlice.actions;

export default taskSlice.reducer;
