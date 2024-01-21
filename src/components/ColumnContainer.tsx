import { SortableContext, useSortable } from "@dnd-kit/sortable";

import { Column, Task } from "../types";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";

import TaskCard from "./TaskCard";
import useWindowDimensions from "../utils";

interface Props {
  column: Column;
  tasks: Task[];
}

function ColumnContainer({ tasks, column }: Props) {
  const { width, height } = useWindowDimensions();

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const { setNodeRef, transform, transition } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={{ width: width * 0.75, ...style }}
      className="
  bg-[#403A64]

 rounded-2xl px-4 pb-4 flex-shrink-0 noselect
  "
    >
      <h1 className="text-white text-base font-bold pt-5 pb-4 ">
        {column.title}
      </h1>
      <div
        style={{
          height: height * 0.7,
          minHeight: "50px",
        }}
        className="flex  flex-col gap-2 mt-2 overflow-x-auto overflow-y-auto noselect"
      >
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
      {/* Column footer */}
    </div>
  );
}

export default ColumnContainer;
