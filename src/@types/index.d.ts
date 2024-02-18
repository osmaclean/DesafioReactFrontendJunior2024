import React from "react";

export interface EnterYourTasksProps{
  isFocused: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  handleChangeFocus: () => void;
}

export interface TasksProps {
  task: string;
  index: number;
  onRemove: (taskToRemove: string) => void; 
  onChange: (event: any) => void;
  isChecked?: boolean;
}