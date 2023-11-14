"use client";
import { type FormEvent, useState, useEffect } from "react";
import { skillsSchema, type tSkillsSchema } from "@/utils/zodSchema";
import toast from "react-hot-toast";
import splitSkills from "./helpers/splitSkills";
import Button from "../../../_components/Button";
import FormError from "../../../_components/FormError";
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
import Icon from "@/app/assets/icons/Icon";

type Props = {
  data: tSkillsSchema;
  setData: (data: tSkillsSchema) => void;
};

const LocationsForm = ({ data, setData }: Props) => {
  const [locations, setLocations] = useState<string[]>(data);
  const [location, setLocation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  useEffect(() => {
    const skillSafe = skillsSchema.safeParse(locations);
    if (!skillSafe.success) {
      setError("You need a preferred work location");
      return;
    }
    setError(null);
  }, [locations]);

  const handleAddLocation = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!location) {
      toast.error("Cannot add empty skill");
      return;
    }
    const validatedNewLocations: string[] = [];
    const newLocations = splitSkills(location);
    for (const newLocation of newLocations) {
      if (locations.find((i) => i.toLowerCase() === newLocation.toLowerCase())) {
        toast.error(`${newLocation} already in list`);
        continue;
      }
      validatedNewLocations.push(newLocation);
    }
    setLocations((prev) => {
      const newLocations = [...prev, ...validatedNewLocations];
      setData(newLocations);
      return newLocations;
    });
    setLocation("");
  };

  const removeLocation = (name: string) => {
    setLocations((prev) => {
      const newLocations = prev.filter((location) => location !== name);
      setData(newLocations);
      return newLocations;
    });
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      setLocations((items) => {
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
        className="flex flex-col gap-1 md:pt-6 lg:pt-4 "
        onSubmit={handleAddLocation}
      >
        <label htmlFor="locations" className="font-xs mt-4 text-center">
          Add your locations separated by whitespace.
        </label>
        <div className="flex gap-2">
          <input
            id="locations"
            type="text"
            name="locations"
            className={
              "h-10 w-3/5 grow rounded-md border-2 border-black/50 px-2 placeholder:text-sm"
            }
            placeholder={"Locations in order of importance"}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Button className="h-10">Add</Button>
        </div>
        {error && <FormError error={{ type: "required", message: error }} />}
      </form>
      <DndContext
        autoScroll={false}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={locations} strategy={rectSortingStrategy}>
          <CardsWrapper className={"flex flex-wrap gap-1"}>
            {locations.map((name, index) => (
              <SortableCard
                className="flex cursor-default select-none items-center gap-1 rounded-full bg-orange p-1 text-sm text-white"
                key={name}
                name={name}
                index={index}
              >
                <p>{name}</p>
                <Icon
                  icon="delete"
                  onClick={() => removeLocation(name)}
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

export default LocationsForm;
