import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Structure } from "../structure";
import SingleList from "./SingleList";

interface Props {
  lists: Structure[];
  setLists: React.Dispatch<React.SetStateAction<Structure[]>>;
}

const List: React.FC<Props> = (props: Props) => {
  return (
    <article className="lists">
      <Droppable droppableId="Active">
        {(provided, snapshot) => (
          <section
            className={`${snapshot.isDraggingOver && "drag"}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {props.lists.map((list, index) => {
              return (
                <SingleList
                  key={list.id}
                  index={index}
                  list={list}
                  lists={props.lists}
                  setLists={props.setLists}
                  droppableId="active"
                />
              );
            })}
            {provided.placeholder}
          </section>
        )}
      </Droppable>
    </article>
  );
};

export default List;
