import React, { useState, useRef, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { GrEdit, GrTrash, GrCheckmark } from "react-icons/gr";
import { Structure } from "../structure";
import "./styles.css";

interface Props {
  index: number;
  lists: Structure[];
  list: Structure;
  setLists: React.Dispatch<React.SetStateAction<Structure[]>>;
}

const SingleList: React.FC<Props> = (props: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editList, setEditList] = useState<string>(props.list.input);

  //useRef to make sure the input is on focus when clicking edit
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (event: React.FormEvent, id: number) => {
    event.preventDefault();
    props.setLists(
      props.lists.map((list) =>
        list.id === id ? { ...list, input: editList } : list
      )
    );
    setEdit(false);
  };

  const handleDelete = (id: number) => {
    props.setLists(props.lists.filter((list) => id !== list.id));
  };

  const handleDone = (id: number) => {
    props.setLists(
      props.lists.map((list) =>
        list.id === id ? { ...list, isComplete: !list.isComplete } : list
      )
    );
  };

  return (
    <Draggable draggableId={props.list.id.toString()} index={props.index}>
      {(provided) => (
        <form
          className="list"
          onSubmit={(event) => {
            handleEdit(event, props.list.id);
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <time className="list__date">
            Created on: {new Date(props.list.id).toLocaleString()}
          </time>
          <div className="list__todo">
            {edit ? (
              <input
                value={editList}
                ref={inputRef}
                onChange={(event) => setEditList(event.target.value)}
              />
            ) : props.list.isComplete ? (
              <p className="list__done">{props.list.input}</p>
            ) : (
              <p className="list__input">{props.list.input}</p>
            )}

            <i className="list__icons">
              <GrEdit
                className="list__edit"
                onClick={() => {
                  !props.list.isComplete && setEdit(!edit);
                }}
              />
              <GrTrash
                className="list__delete"
                onClick={() => handleDelete(props.list.id)}
              />
              <GrCheckmark
                className="list__save"
                onClick={() => handleDone(props.list.id)}
              />
            </i>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleList;
