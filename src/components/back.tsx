import { useRouter } from "next/router";
import { ArrowLeftOutlined } from "@ant-design/icons";
export const BackButton = () => {
  const { back } = useRouter();
  return (
    <div
      className="text-left flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-800"
      onClick={back}
    >
      <ArrowLeftOutlined />
      <span>Quay Lại</span>
    </div>
  );
};
