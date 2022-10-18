import React, {useState, useRef} from "react";

import { v4 as uuidv4 } from 'uuid';

import './TaskForm.css';

interface TaskFormProps {
  addNewText: (newText: {text:string, id:string}) => void;
};

const TaskForm: React.FC<TaskFormProps> = ({ addNewText }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const [isInputEmpty, setInputEmpty] = useState<boolean>(false);
  const inputRef = useRef<any>();

  function atualizar(event: any) {
    setInputValue(event.target.value);
    setInputEmpty(false);
  }

  function passarParaCima() {
    if(inputValue.match(/^\s*$/) === null) { // verifica se a string é uma string vazia ou só com espaços, se diferente de null é pq ta vazia
      addNewText({text: inputValue, id:uuidv4()}); //gera um id unico, aleatorio e trackeavel (não altera)
      setInputValue('');
    }
    else {
      setInputEmpty(true);
      inputRef.current.focus(); //trigga o foco
    }
  }

  const handleEnterKeyPress = (event: any) => {
    if (event.keyCode === 13) { // 13 é o número do enter
      passarParaCima();
    }
  };

  return (
    <div className="taskForm">
      <input
        className={isInputEmpty ? "taskFormEmpty" : undefined}
        ref={inputRef}
        autoFocus // aparece com foco quando é renderizado
        onChange={atualizar}
        onBlur={() => {setInputEmpty(false)}} // tira o vermelho se o input perder foco
        onKeyDown={handleEnterKeyPress}
        //onKeyPress={handleKeypress} @deprecated
        value={inputValue}
        id="input"
        placeholder="Informe a tarefa"
      />
      <button className="createTaskButton" onClick={passarParaCima}>Criar tarefa</button>
    </div>
  );
};

export default TaskForm;