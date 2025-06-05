import { DatePicker, GetProps, Input, Modal, Select } from "antd";
import { Dayjs } from "dayjs";
import styles from "./styles.module.scss";
import dayjs from "dayjs";
import { useState } from "react";
import { getPriorityIcon, PriorityLevel } from "./list-todo-item";
import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const { RangePicker } = DatePicker;
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

interface TodoListFormProps {
  editId: string | null;
  open: boolean;
  handleSubmit: () => void;
  setEditId: (id: string | null) => void;
  setOpen: (open: boolean) => void;
  input: string;
  setInput: (input: string) => void;
  description: string;
  setDescription: (description: string) => void;
  priorityLevel: string;
  setPriorityLevel: (priority: string) => void;
  completed: boolean;
  setCompleted: (completed: boolean) => void;
  range: [Dayjs, Dayjs] | null;
  setRange: (range: [Dayjs, Dayjs] | null) => void;
}

export const TodoListForm = ({
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
}: TodoListFormProps) => {
  const [errors, setErrors] = useState<{
    input?: string;
    range?: string;
  }>({});

  const validateForm = () => {
    const newErrors: { input?: string; range?: string } = {};

    if (!input.trim()) {
      newErrors.input = "Việc cần làm không được để trống";
    }
    if (!range) {
      newErrors.range = "Vui lòng chọn khoảng thời gian";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (validateForm()) {
      handleSubmit();
    }
  };

  const onCancel = () => {
    setEditId(null);
    setOpen(false);
    setErrors({});
  };

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < dayjs().endOf("day");
  };

  return (
    <Modal
      title={editId ? "Chỉnh sửa công việc" : "Tạo Công Việc Mới"}
      open={open}
      onOk={onSubmit}
      okText={editId ? "Lưu thay đổi" : "+ Thêm công việc mới"}
      cancelText="Hủy"
      onCancel={onCancel}
    >
      <div className="space-y-4">
        <div>
          <FormLabel text="Việc cần làm" />
          <Input
            placeholder="Nhập việc cần làm ..."
            className={styles.inputTodo}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (errors.input) {
                setErrors((prev) => ({ ...prev, input: undefined }));
              }
            }}
          />
          {errors.input && (
            <p className="text-red-500 text-sm mt-1">{errors.input}</p>
          )}
        </div>
        <div>
          <FormLabel text="Mô tả công việc" />
          <TextArea
            rows={3}
            placeholder="Mô tả công việc của bạn"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <FormLabel text="Mức độ ưu tiên" />
            <Select
              defaultValue={PriorityLevel.MEDIUM}
              className="w-full"
              value={priorityLevel}
              onChange={(value) => setPriorityLevel(value)}
              options={[
                {
                  value: PriorityLevel.MEDIUM,
                  label: (
                    <>{getPriorityIcon(PriorityLevel.MEDIUM)} Trung bình</>
                  ),
                },
                {
                  value: "low",
                  label: <>{getPriorityIcon(PriorityLevel.LOW)} Thấp</>,
                },
                {
                  value: "high",
                  label: <>{getPriorityIcon(PriorityLevel.HIGH)} Cao</>,
                },
              ]}
            />
          </div>
          <div className="flex-1">
            <FormLabel text="Trạng thái" />
            <Select
              defaultValue={false}
              className="w-full"
              value={completed}
              onChange={(value) => setCompleted(value)}
              options={[
                {
                  value: false,
                  label: (
                    <>
                      <ClockCircleOutlined /> Đang chờ xử lý
                    </>
                  ),
                },
                {
                  value: true,
                  label: (
                    <>
                      <CheckCircleOutlined /> Hoàn thành
                    </>
                  ),
                },
              ]}
            />
          </div>
        </div>
        <div>
          <FormLabel text="Thời gian bắt đầu" />
          <RangePicker
            value={range}
            className="w-full"
            disabledDate={disabledDate}
            onChange={(dates) => {
              if (dates && dates[0] && dates[1]) {
                setRange([dates[0], dates[1]]);
                if (errors.range) {
                  setErrors((prev) => ({ ...prev, range: undefined }));
                }
              } else {
                setRange(null);
              }
            }}
          />
          {errors.range && (
            <p className="text-red-500 text-sm mt-1">{errors.range}</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

const FormLabel = ({ text }: { text: string }) => (
  <label className="block font-semibold text-gray-700 mb-1">{text}</label>
);

export default FormLabel;
