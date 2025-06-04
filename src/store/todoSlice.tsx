import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  description: string;
  priorityLevel: string;
  startAt: Date;
  endAt: Date;
}

export const enum FilterOptions {
  ALL = "all",
  COMPLETED = "completed",
  PENDING = "pending",
}

interface TodoState {
  todos: Todo[];
  filter: FilterOptions;
}

const initialState: TodoState = {
  todos: [],
  filter: FilterOptions.ALL,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    editTodo: (state, action: PayloadAction<Todo>) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
        todo.completed = action.payload.completed;
        todo.description = action.payload.description;
        todo.priorityLevel = action.payload.priorityLevel;
        todo.startAt = action.payload.startAt;
        todo.endAt = action.payload.endAt;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    setFilter(state, action: PayloadAction<FilterOptions>) {
      state.filter = action.payload;
    },
    setTodos(state, action: PayloadAction<Todo[]>) {
      state.todos = action.payload;
    },
  },
});

export const {
  addTodo,
  toggleTodo,
  editTodo,
  deleteTodo,
  setTodos,
  setFilter,
} = todoSlice.actions;

export default todoSlice.reducer;
