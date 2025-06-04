import { useRouter } from "next/router";
const examList = [
  {
    id: 1,
    title: "Bài 1: Todo List",
    href: "/results/todo",
    description:
      "Quản lý công việc với React, Redux Toolkit, Tailwind & Ant Design",
    tags: ["React", "Redux", "Tailwind", "Ant Design"],
    color: "blue",
    bgGradient: "from-blue-500 to-purple-600",
    tagColors: [
      "bg-blue-100 text-blue-800",
      "bg-purple-100 text-purple-800",
      "bg-cyan-100 text-cyan-800",
      "bg-indigo-100 text-indigo-800",
    ],
  },
  {
    id: 2,
    title: "Bài 2: Blog List",
    href: "/results/blog",
    description: "Hiển thị danh sách blog với Next.js, getStaticProps & SEO",
    tags: ["Next.js", "SSG", "SEO", "Blog"],
    color: "green",
    bgGradient: "from-green-500 to-teal-600",
    tagColors: [
      "bg-green-100 text-green-800",
      "bg-emerald-100 text-emerald-800",
      "bg-teal-100 text-teal-800",
      "bg-lime-100 text-lime-800",
    ],
  },
  {
    id: 3,
    title: "Bài 3: Dropdown JS",
    href: "/dropdown/dropdown.html",
    description: "Menu thả xuống tùy chỉnh bằng Vanilla JavaScript",
    tags: ["JavaScript", "DOM", "CSS", "Vanilla JS"],
    color: "orange",
    bgGradient: "from-orange-500 to-red-600",
    tagColors: [
      "bg-yellow-100 text-yellow-800",
      "bg-orange-100 text-orange-800",
      "bg-red-100 text-red-800",
      "bg-pink-100 text-pink-800",
    ],
  },
];

export default function Home() {
  const { push } = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Bài Test Kỹ Năng Lập Trình
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-purple-500 mx-auto rounded-full mb-3" />
          <a
            href="https://github.com/HaiDang0301/xipat_test_fe_developer"
            target="_blank"
            className="text-[blue]"
          >
            Github: https://github.com/HaiDang0301/xipat_test_fe_developer
          </a>
        </div>

        <div className="grid gap-8">
          {examList.map(
            ({ title, href, description, id, tags, bgGradient, tagColors }) => (
              <div
                key={id}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:scale-[1.02]"
              >
                <div className={`h-2 bg-gradient-to-r ${bgGradient}`}></div>

                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${bgGradient} rounded-xl flex items-center justify-center shadow-lg`}
                    >
                      <span className="text-white font-bold text-lg">{id}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 ml-4">
                      {tags.map((tag, index) => (
                        <span
                          key={tag}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${tagColors[index]} shadow-sm`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
                      {title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => push(href)}
                      className={`px-6 py-3 bg-gradient-to-r ${bgGradient} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center group-hover:scale-105 cursor-pointer`}
                    >
                      Xem kết quả
                    </button>
                  </div>
                </div>
                <div className="absolute top-4 right-4 opacity-10">
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${bgGradient} rounded-full blur-xl`}
                  ></div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
