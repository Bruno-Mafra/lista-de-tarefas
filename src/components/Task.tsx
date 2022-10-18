import React, {useState, useRef} from 'react';

import './Task.css';

interface TaskProps {
  handleRemoveTask: (id: string) => void;
  text: string;
  id: string;
};

const Task: React.FC<TaskProps> = ({ text, id, handleRemoveTask }) => {
  const [isCrossedOut, setCrossedOut] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTexto, setEditTexto] = useState<string>(text);

  const [isTaskEmpty, setTaskEmpty] = useState<boolean>(false);
  const inputRef = useRef<any>();

  function atualizar(event: any) {
    setEditTexto(event.target.value);
    setTaskEmpty(false);
  }

  const handleEnterKeyPress = (event: any) => {
    if (event.keyCode === 13) {
      editTask();
    }
  };

  const editTask = () => {
    if(editedTexto.match(/^ *$/) === null) {
      setIsEditing(!isEditing);
      setTaskEmpty(false);
    }
    else {
      setTaskEmpty(true);
      inputRef.current.focus();
    }
  }

  const removeTask = () => {
    if(isCrossedOut) {
      handleRemoveTask(id);
    }
  }

  return (
    <div className="task">
      <div className="taskInputDiv">
      {isEditing && 
      <input
        autoFocus
        ref={inputRef}
        className={isTaskEmpty ? "taskInput emptyTask" : "taskInput" } 
        value={editedTexto} 
        onChange={atualizar} 
        onBlur={() => {setTaskEmpty(false)}}
        onKeyDown={handleEnterKeyPress}/>}
      {!isEditing && <span className={isCrossedOut ? 'crossedOut': undefined}>{editedTexto}</span>}
      </div>
      <div className="buttons">
        <button className="editButton" onClick={editTask}>{!isEditing ? 'Editar' : 'Salvar'}</button>
        <button className="completeButton" onClick={() => {setCrossedOut(!isCrossedOut)}}>{isCrossedOut ? 'Desmarcar' : 'Concluir'}</button>
        <button className="removeButton" onClick={removeTask}>Remover</button>
      </div>
    </div>
  );
};

export default Task;