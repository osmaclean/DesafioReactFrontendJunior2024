import React from "react";

export interface EnterYourTasksProps{
  isFocused: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  handleChangeFocus: () => void;
}