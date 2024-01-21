import { Task } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  task: Task;
}

function TaskCard({ task }: Props) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="rounded-lg border border-[#403A64]"
      >
        <p className="text-[#403A64] text-sm font-normal text-center truncate  pt-2 pb-4 px-4  whitespace-nowrap ">
          {task.content}
        </p>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="rounded-lg bg-[#625A96] "
    >
      <p className="text-[#D5D6FA] text-sm font-normal text-center truncate  pt-2 pb-4 px-4  whitespace-nowrap ">
        {task.content}
      </p>
    </div>
  );
}

export default TaskCard;
