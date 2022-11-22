import React, { useState } from "react";
import "./App.css";
import Input from "./components/Input";
import List from "./components/List";
import { Structure } from "./structure";

const App: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [lists, setLists] = useState<Structure[]>([]);

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    input && setLists([...lists, { id: Date.now(), input, isComplete: false }]);
    setInput("");
  };

  console.log(lists);

  return (
    <main>
      <header>Remember</header>
      <Input input={input} setInput={setInput} handleAdd={handleAdd} />
      {/* {lists.map((list) => {
        return <li key={list.id}>{list.input}</li>;
      })} */}
      <List lists={lists} setLists={setLists} />
    </main>
  );
};

export default App;
