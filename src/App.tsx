import { Header } from "./components/Header";
import styles from "./App.module.css";
import { Input } from "./components/Input";
import { Task } from "./components/Task";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import "./global.css";
import clipboard from "./assets/clipboard.svg";

export interface ITask {
  id: string;
  title: string;
  isCompleted: boolean;
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const tasksQuantity = tasks.length;
  const completedTasks = tasks.filter((task) => task.isCompleted).length;

  useEffect(() => {
    loadSavedTasks();
  });

  function createNewTask(taskTitle: string) {
    setTasksAndSave([
      ...tasks,
      {
        id: uuidv4(),
        title: taskTitle,
        isCompleted: false,
      },
    ]);
  }

  function deleteTask(taskId: string) {
    const newTasks = tasks.filter((task) => task.id !== taskId);

    setTasksAndSave(newTasks);
  }

  function toggleTaskCompleted(taskId: string) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
      return task;
    });
    setTasksAndSave(newTasks);
  }

  function setTasksAndSave(newTasks: ITask[]) {
    setTasks(newTasks);
    if (newTasks.length > 0) {
      localStorage.setItem("todo:savedTasks", JSON.stringify(newTasks));
    } else {
      localStorage.clear();
    }
  }

  function loadSavedTasks() {
    const saved = localStorage.getItem("todo:savedTasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Input onCreateNewTask={createNewTask} />

        <header className={styles.taskHeader}>
          <div>
            <span className={styles.createdTasks}>Tarefas criadas</span>
            <label>{tasksQuantity}</label>
          </div>
          <div>
            <span className={styles.concludedTasks}>Concluídas</span>
            <label>
              {completedTasks} de {tasksQuantity}
            </label>
          </div>
        </header>

        <main>
          {tasks.map((task) => {
            return (
              <Task
                key={task.id}
                task={task}
                onDeleteTask={deleteTask}
                onCompleteTask={toggleTaskCompleted}
              />
            );
          })}

          {tasks.length === 0 && (
            <section className={styles.noTasks}>
              <img src={clipboard} alt="Clipboard Image" />
              <p>Você ainda não tem tarefas cadastradas</p>
              <span>Crie tarefas e organize seus itens a fazer</span>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
