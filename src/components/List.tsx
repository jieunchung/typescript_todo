import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Structure } from "../structure";
import SingleList from "./SingleList";

interface Props {
  lists: Structure[];
  setLists: React.Dispatch<React.SetStateAction<Structure[]>>;
  completed: Structure[];
  setCompleted: React.Dispatch<React.SetStateAction<Structure[]>>;
}

const List: React.FC<Props> = (props: Props) => {
  return (
    <article className="lists">
      <Droppable droppableId="Active">
        {(provided, snapshot) => (
          <section
            className={`list__active ${snapshot.isDraggingOver && "drag"}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h4>Active</h4>
            {props.lists.map((list, index) => {
              return (
                <SingleList
                  key={list.id}
                  index={index}
                  list={list}
                  lists={props.lists}
                  setLists={props.setLists}
                />
              );
            })}
            {provided.placeholder}
          </section>
        )}
      </Droppable>

      <Droppable droppableId="Completed">
        {(provided, snapshot) => (
          <section
            className={`list__completed ${snapshot.isDraggingOver && "drag"}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h4>Completed</h4>
            {props.completed.map((list, index) => {
              return (
                <SingleList
                  key={list.id}
                  index={index}
                  list={list}
                  lists={props.completed}
                  setLists={props.setCompleted}
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
