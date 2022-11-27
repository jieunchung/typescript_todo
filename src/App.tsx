import React, { useState, useEffect } from "react";
import "./App.css";
import Input from "./components/Input";
import List from "./components/List";
import { Structure } from "./structure";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { BsEraserFill } from "react-icons/bs";

const App: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [lists, setLists] = useState<Structure[]>(() => {
    const storedValues = localStorage.getItem("lists");
    return storedValues ? JSON.parse(storedValues) : [];
  });

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    input && setLists([...lists, { id: Date.now(), input, isComplete: false }]);
    setInput("");
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newLists = [...lists];
    const [removed] = newLists.splice(result.source.index, 1);
    newLists.splice(result.destination?.index, 0, removed);
    setLists(newLists);
  };

  const clearCompleted = () => {
    setLists(
      lists.filter((list) => {
        return !list.isComplete;
      })
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main>
        <header>todo</header>
        <Input input={input} setInput={setInput} handleAdd={handleAdd} />
        <List lists={lists} setLists={setLists} />
        <section className="lists__filter">
          <button className="lists__filter_button" onClick={clearCompleted}>
            erase all completed tasks&nbsp;
            <BsEraserFill />
          </button>
        </section>
      </main>
    </DragDropContext>
  );
};

export default App;
