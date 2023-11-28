"use client";
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
import { useEffect, useState } from "react";
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

type Project = {
  id: string;
  projectId: string;
  title: string;
  order: number;
};
type Props = {
  data: Project[];
};

const Projects = ({ data }: Props) => {
  const utils = api.useContext();
  const [items, setItems] = useState(data);
  const [edited, setEdited] = useState(false);
  const { mutate: reorder, isLoading: reordering } =
    api.project.reorder.useMutation({
      onSuccess: async () => {
        setEdited(false);
        await utils.developer.getByUser.invalidate();
        await utils.developer.getBySlug.invalidate();
      },
    });
  const { mutate: leave, isLoading: leaving } = api.project.leave.useMutation({
    onSuccess: async () => {
      await utils.developer.getByUser.invalidate();
    },
  });
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
  useEffect(() => {
    if (data.map((i) => i.id).join("") !== items.map((i) => i.id).join("")) {
      setEdited(true);
      return;
    }
    setEdited(false);
  }, [items, data]);

  useEffect(() => {
    setItems(data);
  }, [data]);

  return (
    <div className="relative flex w-full flex-col gap-1">
      {edited && (
        <div className="absolute bottom-0 z-10 flex gap-2 place-self-end p-1">
          <Button
            callToAction
            className="border"
            disabled={reordering}
            onClick={() => reorder({ projects: items })}
          >
            Save
          </Button>
          <Button className="border" onClick={() => setItems(data)}>
            Cancel
          </Button>
        </div>
      )}
      <DndContext modifiers={modifiers} onDragEnd={onDragEnd} sensors={sensors}>
        <SortableContext strategy={verticalListSortingStrategy} items={items}>
          {items.map(({ id, title, projectId }) => {
            return (
              <SortableItem key={id} id={id}>
                {({ attributes, listeners }) => (
                  <ItemContainer className="justify-between px-5">
                    <div className="flex gap-1">
                      <button {...attributes} {...listeners}>
                        <Icon
                          icon="dragVH"
                          className="h-6 cursor-grab fill-black"
                        />
                      </button>
                      <p>{title}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button disabled={leaving} onClick={() => leave({ id })}>
                        Leave
                      </Button>
                      <Link href={`/profile/project/${projectId}`}>
                        <Icon icon="edit" className="h-8" />
                      </Link>
                    </div>
                  </ItemContainer>
                )}
              </SortableItem>
            );
          })}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Projects;
