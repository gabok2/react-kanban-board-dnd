import { useState } from "react";
import { Column, Task } from "../types";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  useSensor,
  useSensors,
  TouchSensor,
  MouseSensor,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";

const defaultCols: Column[] = [
  {
    id: "todo",
    title: "Todo",
  },
  {
    id: "doing",
    title: "Work in progress",
  },
  {
    id: "done",
    title: "Done",
  },
];

const defaultTasks: Task[] = [
  {
    id: "1",
    columnId: "todo",
    content: "List admin APIs for dashboard",
  },
  {
    id: "2",
    columnId: "todo",
    content:
      "Develop user registration functionality with OTP delivered on SMS after email confirmation and phone number confirmation",
  },
  {
    id: "3",
    columnId: "doing",
    content: "Conduct security testing",
  },
  {
    id: "4",
    columnId: "doing",
    content: "Analyze competitors",
  },
  {
    id: "5",
    columnId: "done",
    content: "Create UI kit documentation",
  },
  {
    id: "6",
    columnId: "done",
    content: "Dev meeting",
  },
  {
    id: "7",
    columnId: "done",
    content: "Deliver dashboard prototype",
  },
  {
    id: "8",
    columnId: "todo",
    content: "Optimize application performance",
  },
  {
    id: "9",
    columnId: "todo",
    content: "Implement data validation",
  },
  {
    id: "10",
    columnId: "todo",
    content: "Design database schema",
  },
  {
    id: "11",
    columnId: "todo",
    content: "Integrate SSL web certificates into workflow",
  },
  {
    id: "12",
    columnId: "doing",
    content: "Implement error logging and monitoring",
  },
  {
    id: "13",
    columnId: "doing",
    content: "Design and implement responsive UI",
  },
  {
    id: "14",
    columnId: "doing",
    content: "Create user stories",
  },
  {
    id: "15",
    columnId: "doing",
    content: "Implement user authentication",
  },
  {
    id: "16",
    columnId: "done",
    content: "Create user stories",
  },
  {
    id: "17",
    columnId: "done",
    content: "Implement user authentication",
  },
  {
    id: "18",
    columnId: "done",
    content: "Create user stories",
  },
  {
    id: "19",
    columnId: "done",
    content: "Implement user authentication",
  },
  {
    id: "20",
    columnId: "done",
    content: "Create user stories",
  },
  {
    id: "21",
    columnId: "done",
    content: "Implement user authentication",
  },
  {
    id: "22",
    columnId: "done",
    content: "Create user stories",
  },
  {
    id: "23",
    columnId: "done",
    content: "Implement user authentication",
  },
  {
    id: "24",
    columnId: "done",
    content: "Create user stories",
  },
  {
    id: "25",
    columnId: "done",
    content: "Implement user authentication",
  },
  {
    id: "26",
    columnId: "done",
    content: "Create user stories",
  },
  {
    id: "27",
    columnId: "done",
    content: "Implement user authentication",
  },
  {
    id: "28",
    columnId: "done",
    content: "Create user stories",
  },
  {
    id: "29",
    columnId: "done",
    content: "Implement user authentication",
  },
  {
    id: "30",
    columnId: "done",
    content: "Create user stories",
  },
  {
    id: "31",
    columnId: "done",
    content: "Implement user authentication",
  },
  {
    id: "32",
    columnId: "done",
    content: "Create user stories",
  },
  {
    id: "33",
    columnId: "done",
    content: "Implement user authentication",
  },
];

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(defaultCols);

  const [tasks, setTasks] = useState<Task[]>(defaultTasks);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Require the mouse to move by 10 pixels before activating.
      // Slight distance prevents sortable logic messing with
      // interactive elements in the handler toolbar component.
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor)
  );

  return (
    <div
      className="
        flex
        min-h-screen
        w-full
        overflow-x-auto
        overflow-y-hidden
      bg-[#D3CEF0]
        px-4"
    >
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="">
          <div className="flex gap-4 pt-6">
            {columns.map((col) => (
              <ColumnContainer
                key={col.id}
                column={col}
                tasks={tasks.filter((task) => task.columnId === col.id)}
              />
            ))}
          </div>
        </div>

        {createPortal(
          <DragOverlay>
            {activeTask && <TaskCard task={activeTask} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    console.log("DRAG END");

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          // Fix introduced after video recording
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }
}

export default KanbanBoard;
