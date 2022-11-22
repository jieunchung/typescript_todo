import React from "react";
import { GrEdit, GrTrash, GrSave } from "react-icons/gr";
import { Structure } from "../structure";
import "./styles.css";

interface Props {
  lists: Structure[];
  list: Structure;
  setLists: React.Dispatch<React.SetStateAction<Structure[]>>;
}

const SingleList: React.FC<Props> = (props: Props) => {
  return (
    <form className="list">
      <time className="list__date">
        Created on: {new Date(props.list.id).toLocaleString()}
      </time>
      <div className="list__todo">
        <p className="list__input">{props.list.input}</p>
        <i className="list__icons">
          <GrEdit className="list__edit" />
          <GrTrash className="list__delete" />
          <GrSave className="list__save" />
        </i>
      </div>
    </form>
  );
};

export default SingleList;
