import { useEffect, useState } from "react";

// Preset of colors from coolors.co
export const colorDarkerGreen = "#0d2818";
export const colorDarkGreen = "#04471c";
export const colorGreen = "#058c42";
export const colorLightGreen = "#16db65"; // Dark Text

interface TaskProps {
  title: string;
  description: string;
  status: "done" | "pending";
}

function App() {
  
  // Loading Task
  const [tasks, setTasks] = useState<TaskProps[]>(() => {
    const savedTasks = localStorage.getItem("ToDoTasks"); 
    return savedTasks ? JSON.parse(savedTasks) : []; // Parse if exists, else empty array
  });

  // Saving Task
  useEffect(() => {
    localStorage.setItem("ToDoTasks", JSON.stringify(tasks));
  }, [tasks]);
  
  // Adding New Task
  const [taskName, setTaskName] = useState<string>("");
  const [taskDesc, setTaskDesc] = useState<string>("");
  const handleAddNewTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page refresh
    setTasks(prev => [...prev, {title: taskName, description: taskDesc, status: "pending"}]);
    setTaskName("");
    setTaskDesc("");
  }

  // Modifying Task
  const handleDeleteTask = (taskToDelete: TaskProps) => {
    setTasks(tasks.filter(task => task !== taskToDelete));
  };
  const handleMarkTaskDone = (taskToUpdate: TaskProps) => {
    setTasks(tasks.map(task => 
      task === taskToUpdate ? { ...task, status: "done" } : task
    ));
  };
  const handleMarkTaskUnDone = (taskToUpdate: TaskProps) => {
    setTasks(tasks.map(task => 
      task === taskToUpdate ? { ...task, status: "pending" } : task
    ));
  };

  // Task Deletion
  const handleDeleteAllTasks = () => {
    confirm("Are you sure you want to delete all tasks?") 
    ? setTasks([]) 
    : null;
  }
  const handleDeleteAllPendingTasks = () => {
    confirm("Are you sure you want to delete all pending tasks?")
    ? setTasks(tasks.filter(task => task.status !== "pending"))
    : null;
  }
  const handleDeleteAllFinishedTasks = () => {
    confirm("Are you sure you want to delete all completed tasks?")
    ? setTasks(tasks.filter(task => task.status !== "done"))
    : null;
  }

  return (
    <>
      <div 
        className="hero-section animShow animDuration1s"
        >
        <div className="text-center">
          <h2 className="animSlideLeftToRight animDuration1s">ToDo List</h2>
          <div className="animSlideLeftToRight animDuration1P5s">by <a href="https://khian.netlify.app/" target="_blank">Khian Victory D. Calderon</a></div>
          <br/>
          <div className="animSlideLeftToRight animDuration2s">A WebDev task by <a href="https://github.com/itzzmerov" target="_blank">Sir Rov</a></div>
          <hr/>
        </div>
        <div className="animSlideUpToDown animDuration2P25s">Features: </div>
        <ul>
          <li className="animSlideLeftToRight animDuration2P25s">Tasks persists even after browser refresh. (I used local storage)</li>
          <li className="animSlideLeftToRight animDuration2P5s">User interface</li>
          <li className="animSlideLeftToRight animDuration2P75s">Mobile responsive</li>
          <li className="animSlideLeftToRight animDuration3s">Easy to use</li>
          <li className="animSlideLeftToRight animDuration3P25s">Uses bootstrap</li>
        </ul>
      </div>
      <div className="main-content animShow animDuration3P5s">
        <h4>Add Task:</h4>
        <form className="task-adder" onSubmit={handleAddNewTask}>
          <input value={taskName} onChange={(e) => setTaskName(e.target.value)} className="form-control task-title-input" type="text" placeholder="Enter new task name..." />
          <textarea value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)} className="form-control task-description-input" placeholder="Enter new task description..." rows={10}/>
          <input className="form-control btn btn-primary" type="submit" value="Add Task" />
        </form>
      </div>
      <div className="task-done animShow animDuration3P5s">
        <h4>Task Finished</h4>
        <div className="task-list-wrapper">
          {tasks.filter(item => item.status === "done").length > 0 ? (
              <>
                {tasks.filter(item => item.status === "done").map((item,index) => (
                  <div className="task-card" key={index}>
                    <h4>{item.title}</h4>
                    <span>{item.description}</span>
                    <hr/>
                    <div className="task-card-buttons">
                      <button className="btn btn-secondary"
                        onClick={() => handleMarkTaskUnDone(item)}
                      >Mark as UnDone</button>
                      <button className="btn btn-danger"
                        onClick={() => handleDeleteTask(item)}
                      >Delete</button>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p className="text-center">No finished tasks yet...</p>
            )}
        </div>
      </div>
      <div className="task-list animShow animDuration3P5s">
        <h4>Task Lists</h4>
        <div className="task-list-wrapper">
          {tasks.filter(item => item.status === "pending").length > 0 ? (
            <>
              {tasks.filter(item => item.status === "pending").map((item,index) => (
                <div className="task-card" key={index}>
                  <h4>{item.title}</h4>
                  <span>{item.description}</span>
                  <hr/>
                  <div className="task-card-buttons">
                    <button className="btn btn-primary"
                      onClick={() => handleMarkTaskDone(item)}
                    >Mark as Done</button>
                    <button className="btn btn-danger"
                      onClick={() => handleDeleteTask(item)}
                    >Delete</button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="text-center">No task yet, create one!</p>
          )}
        </div>
      </div>
      <div className="task-clear animShow animDuration3P5s text-center">
        <h4>Task Deletion:</h4>
        <button className="btn btn-danger m-2" onClick={handleDeleteAllTasks}>Delete All Task</button>
        <button className="btn btn-danger m-2" onClick={handleDeleteAllPendingTasks}>Delete All Pending Tasks</button>
        <button className="btn btn-danger m-2" onClick={handleDeleteAllFinishedTasks}>Delete All Finished Tasks</button>
      </div>
    </>
  )
}

export default App
