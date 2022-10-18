import {useState} from "react";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import './App.css';

export default function App() {
  const [texts, setText] = useState<{text:string, id:string}[]>([]);

  function addNewText(newText: {text:string, id:string}) {
    setText([...texts, newText]);
  }

  function handleRemoveTask(id: string) {
    setText((texts) => texts.filter((index) => index.id !== id));
  }

  return (
    <div className="App">
      <h1>Lista de Tarefas</h1>
      <div className="main">
        <TaskForm addNewText={addNewText} />
        <TaskList textList={texts} handleRemoveTask={handleRemoveTask} />
      </div>
    </div>
  );
};