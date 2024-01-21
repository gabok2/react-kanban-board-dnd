import { SortableContext, useSortable } from "@dnd-kit/sortable";
import TrashIcon from "../icons/TrashIcon";
import { Column, Id, Task } from "../types";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import TaskCard from "./TaskCard";
import useWindowDimensions from "../utils";

interface Props {
  column: Column;
  tasks: Task[];
}

function ColumnContainer({ tasks, column }: Props) {
  const { width, height, isLoaded } = useWindowDimensions();

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
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

 rounded-2xl px-4 pb-4 flex-shrink-0
  "
    >
      <h1 className="text-white text-base font-bold pt-5 pb-4">
        {column.title}
      </h1>
      <div
        style={{
          height: height * 0.7,
          minHeight: "50px",
        }}
        className="flex  flex-col gap-2 mt-2 overflow-x-auto overflow-y-auto"
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
