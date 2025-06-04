import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
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
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: Date.now().toString(),
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    editTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) todo.text = action.payload.text;
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
