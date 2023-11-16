import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { Fragment, type ReactNode } from "react";
import Icon from "@/app/assets/icons/Icon";
import FormError from "@/app/_components/FormError";
import { formInfo, keys } from "./helpers/formPlaceholders";
import Button from "@/app/_components/Button";
import GithubForm from "./GithubForm";
import { devSchema, type tDevSchema } from "@/utils/zodSchema";

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

const onDragEnd = <T extends { id: string }>(
  event: DragEndEvent,
  arr: T[],
  move: (activeIndex: number, overIndex: number) => void,
) => {
  const { active, over } = event;
  if (over && active.id !== over.id) {
    const activeIndex = arr.map((i) => i.id).indexOf(active.id as string);
    console.log(activeIndex);
    const overIndex = arr.map((i) => i.id).indexOf(over.id as string);
    if (activeIndex !== undefined && overIndex !== undefined) {
      move(activeIndex, overIndex);
    }
  }
};
type Props = {
  data: tDevSchema;
  handleData: (data: tDevSchema) => void;
  children: ReactNode;
};

const DeveloperForm2 = ({ data, handleData, children }: Props) => {
  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm<tDevSchema>({
    resolver: zodResolver(devSchema),
    defaultValues: data,
    mode: "onBlur",
  });

  const modifiers = [restrictToParentElement];
  const {
    fields: skills,
    move: moveSkill,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control,
    name: "skills",
  });
  const {
    fields: locations,
    move: moveLocation,
    append: appendLocation,
    remove: removeLocation,
  } = useFieldArray({
    control,
    name: "locationPref",
  });
  const className = "h-10 rounded-md border-2 border-black/50 px-2 bg-black/10";
  return (
    <>
      <form
        id="developer-form"
        onSubmit={(event) =>
          void handleSubmit((values) => {
            handleData(values);
          })(event)
        }
        className="flex flex-col gap-2"
      >
        {keys.map((key) => (
          <div className="flex flex-col" key={key}>
            <label className="pt-2 font-semibold" htmlFor={`${key}-input`}>
              {formInfo[key].label}
            </label>
            {key === "description" ? (
              <textarea
                id={`${key}-input`}
                rows={6}
                {...register(key)}
                className={`${className} h-32`}
                placeholder={formInfo[key].placeholder}
              />
            ) : (
              <input
                id={`${key}-input`}
                {...register(key)}
                className={className}
                placeholder={formInfo[key].placeholder}
              />
            )}
            <FormError error={errors[key]} />
          </div>
        ))}
        <div className="flex flex-col gap-2">
          <p className="pt-2 font-semibold">Locations</p>
          <FormError error={errors.locationPref?.root} />
          <div className="flex flex-wrap gap-1">
            <DndContext
              modifiers={modifiers}
              onDragEnd={(event) => onDragEnd(event, locations, moveLocation)}
            >
              <SortableContext strategy={rectSortingStrategy} items={locations}>
                {locations.map((field, index) => {
                  return (
                    <Fragment key={field.id}>
                      <SortableItem id={field.id}>
                        {({ attributes, listeners }) => (
                          <div className="flex cursor-default select-none items-center gap-1 rounded-full bg-orange p-1 text-sm text-white">
                            <button {...attributes} {...listeners}>
                              <Icon
                                icon="dragVH"
                                className="h-6 cursor-grab fill-black"
                              />
                            </button>
                            <input
                              className="min-w-0 bg-orange text-white outline-none placeholder:text-black"
                              placeholder="New location..."
                              {...register(`locationPref.${index}.location`)}
                            />
                            <FormError
                              error={
                                errors.locationPref
                                  ? errors.locationPref[index]?.location
                                  : undefined
                              }
                            />
                            <button
                              onClick={() => removeLocation(index)}
                              type="button"
                            >
                              <Icon
                                icon="delete"
                                className="w-6 cursor-pointer fill-white hover:scale-110 hover:fill-black"
                              />
                            </button>
                          </div>
                        )}
                      </SortableItem>
                    </Fragment>
                  );
                })}
              </SortableContext>
            </DndContext>
            <Button
              type="button"
              onClick={() => appendLocation({ location: "" })}
            >
              Add
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="pt-2 font-semibold">Skills</p>
          <FormError error={errors.skills?.root} />
          <div className="flex flex-wrap gap-1">
            <DndContext
              modifiers={modifiers}
              onDragEnd={(event) => onDragEnd(event, skills, moveSkill)}
            >
              <SortableContext strategy={rectSortingStrategy} items={skills}>
                {skills.map((field, index) => {
                  return (
                    <Fragment key={field.id}>
                      <SortableItem id={field.id}>
                        {({ attributes, listeners }) => (
                          <div className="relative flex cursor-default select-none items-center gap-1 rounded-full bg-orange p-1 text-sm text-white">
                            <button {...attributes} {...listeners}>
                              <Icon
                                icon="dragVH"
                                className="h-6 cursor-grab fill-black"
                              />
                            </button>
                            <input
                              className="min-w-0 bg-orange text-white outline-none placeholder:text-black"
                              placeholder="New skill..."
                              {...register(`skills.${index}.skill`)}
                            />
                            <FormError
                              error={
                                errors.skills
                                  ? errors.skills[index]?.skill
                                  : undefined
                              }
                            />
                            <button
                              onClick={() => removeSkill(index)}
                              type="button"
                            >
                              <Icon
                                icon="delete"
                                className="w-6 cursor-pointer fill-white hover:scale-110 hover:fill-black"
                              />
                            </button>
                          </div>
                        )}
                      </SortableItem>
                    </Fragment>
                  );
                })}
              </SortableContext>
            </DndContext>
            <Button type="button" onClick={() => appendSkill({ skill: "" })}>
              Add
            </Button>
          </div>
        </div>
      </form>
      <GithubForm
        data={{ gitHubUrl: data.gitHubUrl, image: data.image }}
        setData={({ gitHubUrl, image }) => {
          setValue("gitHubUrl", gitHubUrl);
          setValue("image", image);
        }}
      />
      {children}
    </>
  );
};

export default DeveloperForm2;
