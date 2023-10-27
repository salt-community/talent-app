import DragIcon from "@/app/assets/icons/DragIcon";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ReactNode } from "react";

type Props = {
  key: string;
  name: string;
  index: number;
  children: ReactNode;
  className?: string;
};
const SortableCard = (props: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.name });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      className={props.className}
      ref={setNodeRef}
      style={style}
      {...props}
      {...attributes}
    >
      <div ref={setActivatorNodeRef} {...listeners}>
        <DragIcon className="h-6 fill-black cursor-grab" />
      </div>
      {props.children}
    </li>
  );
};

export default SortableCard;
