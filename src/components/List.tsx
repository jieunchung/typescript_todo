import React from "react";
import { Structure } from "../structure";
import SingleList from "./SingleList";

interface Props {
  lists: Structure[];
  setLists: React.Dispatch<React.SetStateAction<Structure[]>>;
}

const List: React.FC<Props> = (props: Props) => {
  return (
    <section>
      {props.lists.map((list) => {
        return <SingleList key={list.id} list={list} lists={props.lists} setLists={props.setLists} />;
      })}
    </section>
  );
};

export default List;
