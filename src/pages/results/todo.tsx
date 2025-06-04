import { useRouter } from "next/router";
import { AppDispatch, RootState } from "@/store/store";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input, Radio } from "antd";
import {
  addTodo,
  deleteTodo,
  editTodo,
  FilterOptions,
  setFilter,
  setTodos,
  toggleTodo,
} from "@/store/todoSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles.module.scss";
import cls from "classnames";

export default function Home() {
  const { back } = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todo.todos);
  const filter = useSelector((state: RootState) => state.todo.filter);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      dispatch(setTodos(JSON.parse(saved)));
    }
  }, [dispatch]);

  const filteredTodos = todos.filter((todo) => {
    if (filter === FilterOptions.ALL) return true;
    if (filter === FilterOptions.COMPLETED) return todo.completed;
    if (filter === FilterOptions.PENDING) return !todo.completed;
    return true;
  });

  const handleAdd = () => {
    if (input.trim()) {
      dispatch(addTodo(input.trim()));
      setInput("");
    }
  };

  const startEdit = (id: string, text: string) => {
    setEditId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    if (editId && editText.trim()) {
      dispatch(editTodo({ id: editId, text: editText.trim() }));
      setEditId(null);
      setEditText("");
    }
  };
  return (
    <div className="flex items-center justify-center mt-24">
      <div className="w-[90%] md:w-2/4 flex flex-col items-center gap-4 shadow-lg rounded-xl bg-white p-8">
        <div
          className="text-left w-full flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-800"
          onClick={back}
        >
          <ArrowLeftOutlined />
          <span>Quay Lại</span>
        </div>

        <h1 className="text-[32px] font-bold">Todo List</h1>
        <div className="w-full flex gap-4">
          <Input
            placeholder="Nhập việc cần làm ..."
            className={styles.inputTodo}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="primary" className={styles.btnAdd} onClick={handleAdd}>
            Thêm
          </Button>
        </div>
        <div className="mb-4 flex justify-center w-full">
          <Radio.Group
            block
            options={[
              { label: "Tất cả", value: FilterOptions.ALL },
              { label: "Đã hoàn thành", value: FilterOptions.COMPLETED },
              { label: "Đang chờ xử lý", value: FilterOptions.PENDING },
            ]}
            defaultValue="all"
            optionType="button"
            buttonStyle="solid"
            onChange={(e) => dispatch(setFilter(e.target.value))}
            className={cls("flex gap-12", styles.filter)}
          />
        </div>
        <ul className="w-[100%]">
          {filteredTodos.map((todo) => (
            <li key={todo.id} className="flex items-center w-full mb-12">
              <Checkbox
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo(todo.id))}
              />
              {editId === todo.id ? (
                <div className="w-full justify-between flex gap-[12px]">
                  <div className="ml-[12px] w-full">
                    <Input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-grow border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  </div>
                  <div className="flex gap-4">
                    <div
                      onClick={saveEdit}
                      className="text-green-600 hover:text-green-800 cursor-pointer"
                    >
                      Lưu
                    </div>
                    <div
                      onClick={() => setEditId(null)}
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                    >
                      Hủy
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex w-full items-center justify-between gap-[12px]">
                  <p
                    className={cls("ml-[12px] max-w-[85%]", {
                      "line-through text-gray-400": todo.completed,
                    })}
                  >
                    {todo.text}
                  </p>
                  <div className="flex gap-4">
                    <div
                      onClick={() => startEdit(todo.id, todo.text)}
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                      Sửa
                    </div>
                    <div
                      onClick={() => dispatch(deleteTodo(todo.id))}
                      className="text-red-600 hover:text-red-800 border-0 cursor-pointer"
                    >
                      Xóa
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
        {!filteredTodos.length && <div>Không có công việc nào.</div>}
      </div>
    </div>
  );
}
