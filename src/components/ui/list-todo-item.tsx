import { Checkbox, Tag } from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  MinusOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { deleteTodo, FilterOptions, Todo, toggleTodo } from "@/store/todoSlice";
import cls from "classnames";
import { useDispatch, useSelector } from "react-redux";
import dayjs, { Dayjs } from "dayjs";
import { AppDispatch, RootState } from "@/store/store";
import styles from "./styles.module.scss";

interface ListTodoItemProps {
  setOpen: (open: boolean) => void;
  setInput: (input: string) => void;
  setEditId: (id: string | null) => void;
  setDescription: (description: string) => void;
  setPriorityLevel: (priority: PriorityLevel) => void;
  setRange: (range: [Dayjs, Dayjs] | null) => void;
}

export const enum PriorityLevel {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export const ListTodoItem = ({
  setOpen,
  setInput,
  setEditId,
  setDescription,
  setPriorityLevel,
  setRange,
}: ListTodoItemProps) => {
  const todos = useSelector((state: RootState) => state.todo.todos);
  const filter = useSelector((state: RootState) => state.todo.filter);
  const dispatch = useDispatch<AppDispatch>();
  const filteredTodos = todos.filter((todo: Todo) => {
    if (filter === FilterOptions.ALL) return true;
    if (filter === FilterOptions.COMPLETED) return todo.completed;
    if (filter === FilterOptions.PENDING) return !todo.completed;
    return true;
  });

  const startEdit = (todo: Todo) => {
    setEditId(todo.id);
    setInput(todo.text);
    setDescription(todo.description);
    setPriorityLevel(todo.priorityLevel as PriorityLevel);
    setRange([dayjs(todo.startAt), dayjs(todo.endAt)]);
    setOpen(true);
  };

  return (
    <div className="bg-white p-[24px]">
      <div className="flex justify-between">
        <h2 className="mb-2 text-2xl font-bold">Danh sách công việc</h2>
        <Tag color="gray" className={styles.numberTodo}>
          {filteredTodos.length} công việc
        </Tag>
      </div>
      {filteredTodos.map((todo) => {
        return (
          <li
            key={todo.id}
            className="flex items-center w-full mb-12 border-1 p-[24px] rounded-[12px] border-[#ccc]"
          >
            <Checkbox
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
            />
            <div className="flex flex-col md:flex-row w-full md:items-center justify-between gap-[12px]">
              <div className="flex flex-col ml-[12px] gap-2">
                <div className="flex gap-4 md:items-center flex-col md:flex-row">
                  <p
                    className={cls("max-w-[70%]", {
                      "line-through text-gray-400": todo.completed,
                    })}
                  >
                    {todo.text}
                  </p>
                  <Tag
                    color="orange"
                    icon={getPriorityIcon(todo.priorityLevel as PriorityLevel)}
                  >
                    {convertValuePriorityLevelToLabel(todo.priorityLevel)}
                  </Tag>
                  <Tag
                    color={todo.completed ? "green" : "yellow"}
                    icon={
                      todo.completed ? (
                        <CheckCircleOutlined />
                      ) : (
                        <ClockCircleOutlined />
                      )
                    }
                  >
                    {todo.completed ? "Hoàn thành" : "Đang chờ xử lý"}
                  </Tag>
                </div>
                <p className="text-[14px]">Mô tả: {todo.description}</p>
                <div className="flex flex-col md:flex-row gap-2 text-[14px]">
                  <p>Bắt đầu: {dayjs(todo.startAt).format("DD/MM/YYYY")}</p>
                  <p>Kết thúc: {dayjs(todo.endAt).format("DD/MM/YYYY")}</p>
                </div>
              </div>
              <div className="flex gap-4 items-center ml-[12px]">
                <div
                  onClick={() => startEdit(todo)}
                  className="text-blue-600 hover:text-blue-800 cursor-pointer flex items-center gap-1"
                >
                  <EditOutlined />
                </div>
                <div
                  onClick={() => dispatch(deleteTodo(todo.id))}
                  className="text-red-600 hover:text-red-800 cursor-pointer flex items-center gap-1"
                >
                  <DeleteOutlined />
                </div>
              </div>
            </div>
          </li>
        );
      })}
      {!filteredTodos.length && (
        <div className="w-full text-center">Không có công việc nào.</div>
      )}
    </div>
  );
};

const convertValuePriorityLevelToLabel = (priorityLevel: string) => {
  switch (priorityLevel) {
    case PriorityLevel.MEDIUM:
      return "Trung bình";
    case PriorityLevel.LOW:
      return "Thấp";
    case PriorityLevel.HIGH:
      return "Cao";
    default:
      return "Trung bình";
  }
};

export const getPriorityIcon = (priorityLevel: PriorityLevel) => {
  switch (priorityLevel) {
    case PriorityLevel.LOW:
      return <ArrowDownOutlined />;
    case PriorityLevel.MEDIUM:
      return <MinusOutlined />;
    case PriorityLevel.HIGH:
      return <ArrowUpOutlined />;
    default:
      return <MinusOutlined />;
  }
};
