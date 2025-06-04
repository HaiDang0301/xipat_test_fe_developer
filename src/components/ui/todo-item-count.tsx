export const TodoItemCount = ({
  number,
  completed,
  color,
}: {
  number: number;
  completed: string;
  color: string;
}) => {
  return (
    <div className="flex flex-col items-center bg-white shadow-2xl justify-center h-[100px]">
      <p style={{ color }} className="text-[24px]">
        {number}
      </p>
      <p className="capitalize text-[16px]">{completed}</p>
    </div>
  );
};
