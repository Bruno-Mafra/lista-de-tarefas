import Task from "./Task";

interface TaskListProps {
  handleRemoveTask: (id: string) => void;
  textList: {text:string, id:string}[];
};

const TaskList: React.FC<TaskListProps>= ({ textList, handleRemoveTask }) => {

  return (
    <div>
      {textList.map((item) => (
        <Task key={item.id} id={item.id} text={item.text} handleRemoveTask={handleRemoveTask} />
      ))}
    </div>
  )
};

export default TaskList;