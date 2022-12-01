import styles from "./Input.module.css";
import { PlusCircle } from "phosphor-react";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";

interface InputProps {
  onCreateNewTask: (taskTitle: string) => void;
}

export function Input({ onCreateNewTask }: InputProps) {
  const [newTaskText, setNewTaskText] = useState("");

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    onCreateNewTask(newTaskText);
    setNewTaskText("");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("");
    setNewTaskText(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  return (
    <div>
      <form onSubmit={handleCreateNewTask} className={styles.inputForm}>
        <textarea
          placeholder="Adicione uma nova tarefa"
          value={newTaskText}
          onChange={handleNewTaskChange}
          onInvalid={handleNewTaskInvalid}
          required
        />

        <button type="submit">
          <span>Criar</span> <PlusCircle size={16} />
        </button>
      </form>
    </div>
  );
}
