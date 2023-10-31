"use client";
import { type FormEvent, useState, useEffect } from "react";
import { skillsSchema, type tSkillsSchema } from "@/utils/zodSchema";
import toast from "react-hot-toast";
import TrashIcon from "@/app/assets/icons/TrashIcon";
import splitSkills from "./helpers/splitSkills";
import Button from "../../Button";
import FormError from "../../FormError";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import CardsWrapper from "./dnd/CardsWrapper";
import SortableCard from "./dnd/SortableCard";

type Props = {
  data: tSkillsSchema;
  setData: (data: tSkillsSchema) => void;
};

const SkillsForm = ({ data, setData }: Props) => {
  const [skills, setSkills] = useState<string[]>(data);
  const [skill, setSkill] = useState("");
  const [error, setError] = useState<string | null>(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  useEffect(() => {
    const skillSafe = skillsSchema.safeParse(skills);
    if (!skillSafe.success) {
      setError("You need some skills!");
      return;
    }
    setError(null);
  }, [skills]);

  const handleAddSkill = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!skill) {
      toast.error("Cannot add empty skill");
      return;
    }
    const validatedNewSkills: string[] = [];
    const newSkills = splitSkills(skill);
    for (const newSkill of newSkills) {
      if (skills.find((i) => i.toLowerCase() === newSkill.toLowerCase())) {
        toast.error(`${newSkill} already in list`);
        continue;
      }
      validatedNewSkills.push(newSkill);
    }
    setSkills((prev) => {
      const newSkills = [...prev, ...validatedNewSkills];
      setData(newSkills);
      return newSkills;
    });
    setSkill("");
  };

  const removeSkill = (name: string) => {
    setSkills((prev) => {
      const newSkills = prev.filter((skill) => skill !== name);
      setData(newSkills);
      return newSkills;
    });
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      setSkills((items) => {
        const oldIndex = items.indexOf(active.id.toString());
        const newIndex = items.indexOf(over.id.toString());
        const newOrder = arrayMove(items, oldIndex, newIndex);
        setData(newOrder);
        return newOrder;
      });
    }
  };
  return (
    <>
      <form
        className="flex flex-col gap-1 pt-12 md:pt-6 lg:pt-4 "
        onSubmit={handleAddSkill}
      >
        <label htmlFor="skills" className="font-medium text-center">
          Add your skills separated by whitespace. Compound words should be
          joined with a dash (-).
          <br />
          Example: React-Native.
        </label>
        <div className="flex gap-2">
          <input
            id="skills"
            type="text"
            name="skills"
            className={
              "h-10 w-3/5 grow rounded-md border-2 border-black/50 px-2 placeholder:text-sm"
            }
            placeholder={"Skills in order of importance"}
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          />
          <Button className="h-10">Add skill</Button>
        </div>
        {error && <FormError error={{ type: "required", message: error }} />}
      </form>
      <DndContext
        autoScroll={false}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={skills} strategy={rectSortingStrategy}>
          <CardsWrapper className={"flex flex-wrap gap-1"}>
            {skills.map((name, index) => (
              <SortableCard
                className="flex cursor-default select-none items-center gap-1 rounded-full bg-orange p-1 text-sm text-white"
                key={name}
                name={name}
                index={index}
              >
                <p>{name}</p>
                <TrashIcon
                  onClick={() => removeSkill(name)}
                  className="w-6 cursor-pointer fill-white hover:scale-110 hover:fill-black"
                />
              </SortableCard>
            ))}
          </CardsWrapper>
        </SortableContext>
      </DndContext>
    </>
  );
};

export default SkillsForm;
