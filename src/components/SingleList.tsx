import React, { useState, useRef, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { GrEdit, GrTrash, GrCheckmark, GrSave } from "react-icons/gr";
import { listType } from "../listType";
import "./styles.css";

interface Props {
  index: number;
  lists: listType[];
  list: listType;
  setLists: React.Dispatch<React.SetStateAction<listType[]>>;
  droppableId: string;
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

  const handleClickEdit = (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    id: number
  ) => {
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

  const handleComplete = (id: number) => {
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
          className="form"
          onSubmit={(event) => {
            handleEdit(event, props.list.id);
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <time className="list__date">
            Created: {new Date(props.list.id).toLocaleString()}
          </time>
          <div className="list__todo">
            {edit ? (
              <input
                value={editList}
                ref={inputRef}
                onChange={(event) => setEditList(event.target.value)}
                className="list__input"
              />
            ) : (
              <li
                className={props.list.isComplete ? "list__done" : "list__input"}
              >
                {props.list.input}
              </li>
            )}

            <i className="list__icons">
              {props.droppableId === "active" &&
                (!edit ? (
                  <GrEdit
                    className="list__edit"
                    onClick={() => {
                      !props.list.isComplete && setEdit(!edit);
                    }}
                  />
                ) : (
                  <GrSave
                    className="list__edit"
                    onClick={(event) => {
                      handleClickEdit(event, props.list.id);
                    }}
                  />
                ))}
              <GrTrash
                className="list__delete"
                onClick={() => handleDelete(props.list.id)}
              />
              <GrCheckmark onClick={() => handleComplete(props.list.id)} />
            </i>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleList;
