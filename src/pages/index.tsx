import { useRouter } from "next/router";

const examList = [
  {
    id: 1,
    title: "Bài 1: Todo List",
    href: "/results/todo",
    description:
      "Quản lý công việc với React, Redux Toolkit, Tailwind & Ant Design",
  },
  {
    id: 2,
    title: "Bài 2: Blog List",
    href: "/results/blog",
    description: "Hiển thị danh sách blog với Next.js, getStaticProps & SEO",
  },
  {
    id: 3,
    title: "Bài 3: Dropdown JS",
    href: "/results/dropdown",
    description: "Menu thả xuống tùy chỉnh bằng Vanilla JavaScript",
  },
];

export default function Home() {
  const { push } = useRouter();
  return (
    <div className="w-full mt-[24px] flex items-center justify-center">
      <div className="flex flex-col w-[90%]">
        <h1 className="text-center mb-[24px] text-[24px] md:text-[48px] text-green-600">
          Bài Test Kỹ Năng Lập Trình
        </h1>
        <div className="flex flex-col gap-[12px] mb-12">
          {examList.map(
            ({
              title,
              href,
              description,
              id,
            }: {
              title: string;
              href: string;
              description: string;
              id: number;
            }) => (
              <div
                key={id}
                className="flex flex-col gap-2 md:gap-12 border-1 p-[24px] rounded-[12px] border-[#7fffd4]"
              >
                <div>
                  <h2 className="text-[18px] md:text-[32px] font-semibold text-indigo-700 mb-3">
                    {title}
                  </h2>
                  <p className="text-gray-700 leading-[24px] text-[14px] md:text-[18px]">
                    {description}
                  </p>
                </div>
                <div className="mt-8">
                  <button
                    onClick={() => push(href)}
                    className="p-[8px] border-0 bg-[#bdbded] text-[14px] rounded-[6px] cursor-pointer"
                  >
                    Xem kết quả
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
