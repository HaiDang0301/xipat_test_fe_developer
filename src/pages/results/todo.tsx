import { AppDispatch, RootState } from "@/store/store";
import { Button } from "antd";
import { addTodo, editTodo, setTodos, Todo } from "@/store/todoSlice";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import cls from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { BackButton } from "@/components/back";
import dayjs from "dayjs";
import { TodoItemCount } from "@/components/ui/todo-item-count";
import { FilterTodoList } from "@/components/ui/filter-todo-list";
import { ListTodoItem, PriorityLevel } from "@/components/ui/list-todo-item";
import { TodoListForm } from "@/components/ui/todo-list-form";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todo.todos);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [priorityLevel, setPriorityLevel] = useState("medium");
  const [completed, setCompleted] = useState("false");
  const [range, setRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      dispatch(setTodos(JSON.parse(saved)));
    }
  }, [dispatch]);
  const handleSubmit = () => {
    if (input.trim() && range) {
      const todoData: Todo = {
        id: editId ?? Date.now().toString(),
        text: input.trim(),
        completed: completed === "true",
        description,
        priorityLevel,
        startAt: range[0].toDate(),
        endAt: range[1].toDate(),
      };

      if (editId) {
        dispatch(editTodo(todoData));
      } else {
        dispatch(addTodo(todoData));
      }

      setInput("");
      setDescription("");
      setPriorityLevel(PriorityLevel.MEDIUM);
      setCompleted("false");
      setRange(null);
      setEditId(null);
      setOpen(false);
    }
  };
  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = todos.filter((t) => !t.completed).length;

  return (
    <div className="flex items-center justify-center my-24">
      <div className="w-[90%] lg:w-2/4 flex flex-col items-center gap-4 shadow-lg rounded-xl bg-indigo-100 p-8">
        <BackButton />
        <div className="text-center mb-1">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📝 Danh Sách Công Việc
          </h1>
          <p className="text-gray-600">Quản lý công việc hàng ngày của bạn</p>
        </div>
        <div className="w-full flex gap-4 shadow-lg p-[24px] bg-white">
          <Button
            className={cls(styles.btnAdd, "w-full")}
            onClick={() => {
              setEditId(null);
              setInput("");
              setDescription("");
              setPriorityLevel(PriorityLevel.MEDIUM);
              setCompleted("false");
              setRange(null);
              setOpen(true);
            }}
          >
            + Thêm Công Việc Mới
          </Button>
          <TodoListForm
            {...{
              editId,
              open,
              handleSubmit,
              setEditId,
              setOpen,
              input,
              setInput,
              description,
              setDescription,
              priorityLevel,
              setPriorityLevel,
              completed,
              setCompleted,
              range,
              setRange,
            }}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <TodoItemCount
            number={totalCount}
            completed="Tổng công việc"
            color="black"
          />
          <TodoItemCount
            number={completedCount}
            completed="Đã hoàn thành"
            color="green"
          />
          <TodoItemCount
            number={pendingCount}
            completed="Đang chờ xử lý"
            color="orange"
          />
        </div>
        <div className="mb-4 flex justify-center w-full bg-white py-[24px] shadow-2xl">
          <FilterTodoList />
        </div>
        <ul className="w-[100%]">
          <ListTodoItem
            {...{
              setOpen,
              setInput,
              setEditId,
              setDescription,
              setPriorityLevel,
              setRange,
            }}
          />
        </ul>
      </div>
    </div>
  );
}
