import React, { useState } from "react";
import "./App.css";
import Input from "./components/Input";
import List from "./components/List";
import { Structure } from "./structure";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [lists, setLists] = useState<Structure[]>([]);
  const [completed, setCompleted] = useState<Structure[]>([]);

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    input && setLists([...lists, { id: Date.now(), input, isComplete: false }]);
    setInput("");
  };

  const onDragEnd = (result: DropResult) => {
    let add,
      newLists = [...lists],
      newCompleted = [...completed];

    if (!result.destination) return;

    if (result.source.droppableId === "Active") {
      add = newLists[result.source.index];
      newLists.splice(result.source.index, 1);
    } else {
      add = newCompleted[result.source.index];
      newCompleted.splice(result.source.index, 1);
    }

    if (result.destination.droppableId === "Active") {
      newLists.splice(result.destination.index, 0, add);
    } else {
      newCompleted.splice(result.destination.index, 0, add);
    }
    setCompleted(newCompleted);
    setLists(newLists);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main>
        <header>Remember</header>
        <Input input={input} setInput={setInput} handleAdd={handleAdd} />
        <List
          lists={lists}
          setLists={setLists}
          completed={completed}
          setCompleted={setCompleted}
        />
      </main>
    </DragDropContext>
  );
};

export default App;
