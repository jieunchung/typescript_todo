import React, { useRef } from "react";
import "./styles.css";

interface Props {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (event: React.FormEvent) => void;
}

const Input: React.FC<Props> = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <section>
      <form
        onSubmit={(event) => {
          props.handleAdd(event);
          inputRef.current?.blur();
        }}
      >
        <input
          ref={inputRef}
          type="text"
          onChange={(event) => {
            props.setInput(event.target.value);
          }}
          placeholder="Type something..."
          className="input__text"
          value={props.input}
        />
        <input type="submit" value="Add" className="input__submit" />
      </form>
    </section>
  );
};

export default Input;
