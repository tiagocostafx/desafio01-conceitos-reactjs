import styles from "./Task.module.css";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check, Trash } from "phosphor-react";
import { ITask } from "../App";

interface TaskProps {
  task: ITask;
  onDeleteTask: (taskId: string) => void;
  onCompleteTask: (taskId: string) => void;
}

export function Task({ task, onDeleteTask, onCompleteTask }: TaskProps) {
  function handleDeleteTask() {
    onDeleteTask(task.id);
  }

  function handleCompleteTask() {
    onCompleteTask(task.id);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.checkboxAndLabel}>
        <Checkbox.Root
          onCheckedChange={handleCompleteTask}
          className={
            task.isCompleted ? styles.checkboxCompleted : styles.checkboxRoot
          }
        >
          <Checkbox.Indicator>
            <Check className={styles.checkIcon} />
          </Checkbox.Indicator>
        </Checkbox.Root>

        <label
          className={task.isCompleted ? styles.concludedTask : styles.labelTask}
        >
          {task.title}
        </label>
      </div>

      <div>
        <Trash
          className={styles.trashIcon}
          size={20}
          onClick={handleDeleteTask}
        />
      </div>
    </div>
  );
}
