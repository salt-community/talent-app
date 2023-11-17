import {
  DndContext,
  useSensor,
  type DragEndEvent,
  TouchSensor,
  MouseSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import Icon from "@/app/assets/icons/Icon";
import type { RouterOutputs } from "@/trpc/shared";
import { useState } from "react";
import Link from "next/link";
import ItemContainer from "@/app/_components/ItemContainer";
import Button from "@/app/_components/Button";
import { api } from "@/trpc/react";

type UseSortableReturn = Omit<
  ReturnType<typeof useSortable>,
  "setNodeRef" | "transform" | "transition"
>;

type SortableItemProps = {
  id: string;
  children: (args: UseSortableReturn) => React.ReactNode;
};

const SortableItem = (props: SortableItemProps) => {
  const { setNodeRef, transform, transition, ...rest } = useSortable({
    id: props.id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style}>
      {props.children({ ...rest })}
    </div>
  );
};

type Project = RouterOutputs["project"]["getByDev"][number];
type Props = {
  data: Project[];
};

const Projects = ({ data }: Props) => {
  const [items, setItems] = useState(data);
  const {mutate: reorder} = api.project.reorder.useMutation()
  const modifiers = [restrictToParentElement];
  const touchSensor = useSensor(TouchSensor);
  const mouseSensor = useSensor(MouseSensor);
  const sensors = useSensors(mouseSensor, touchSensor);
  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const activeIndex = items.map((i) => i.id).indexOf(active.id as string);
      const overIndex = items.map((i) => i.id).indexOf(over.id as string);
      if (activeIndex !== undefined && overIndex !== undefined) {
        const newOrder = arrayMove(items, activeIndex, overIndex);
        setItems(newOrder);
      }
    }
  };
  return (
    <div className="flex w-full flex-col gap-1">
      <DndContext modifiers={modifiers} onDragEnd={onDragEnd} sensors={sensors}>
        <SortableContext strategy={verticalListSortingStrategy} items={items}>
          {items.map(({ id, title, projectId }) => {
            return (
              <SortableItem key={id} id={id}>
                {({ attributes, listeners }) => (
                  <Link href={`/profile/project/${projectId}`}>
                    <ItemContainer className="px-5">
                      <button {...attributes} {...listeners}>
                        <Icon
                          icon="dragVH"
                          className="h-6 cursor-grab fill-black"
                        />
                      </button>
                      <p>{title}</p>
                    </ItemContainer>
                  </Link>
                )}
              </SortableItem>
            );
          })}
        </SortableContext>
      </DndContext>
      <Button onClick={() => reorder({projects: items})}>Save new order</Button>
    </div>
  );
};

export default Projects;
