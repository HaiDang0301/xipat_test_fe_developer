import { Radio } from "antd";
import {
  UnorderedListOutlined,
  CheckCircleOutlined,
  HourglassOutlined,
} from "@ant-design/icons";
import { FilterOptions, setFilter } from "@/store/todoSlice";
import { ReactNode } from "react";
import styles from "./styles.module.scss";
import cls from "classnames";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
export const FilterTodoList = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Radio.Group
      block
      options={[
        {
          label: (
            <FilterLabel
              icon={<UnorderedListOutlined />}
              text="Tất cả"
              color="text-amber-500"
            />
          ),
          value: FilterOptions.ALL,
        },
        {
          label: (
            <FilterLabel
              icon={<CheckCircleOutlined />}
              text="Đã hoàn thành"
              color="text-green-600"
            />
          ),
          value: FilterOptions.COMPLETED,
        },
        {
          label: (
            <FilterLabel
              icon={<HourglassOutlined />}
              text="Đang chờ xử lý"
              color="text-orange-500"
            />
          ),
          value: FilterOptions.PENDING,
        },
      ]}
      defaultValue={FilterOptions.ALL}
      optionType="button"
      buttonStyle="solid"
      onChange={(e) => dispatch(setFilter(e.target.value))}
      className={cls("flex gap-4", styles.filter)}
    />
  );
};

const FilterLabel = ({
  icon,
  text,
  color = "text-black",
}: {
  icon: ReactNode;
  text: string;
  color?: string;
}) => {
  return (
    <span className={`flex items-center gap-2 font-bold ${color}`}>
      {icon} {text}
    </span>
  );
};
