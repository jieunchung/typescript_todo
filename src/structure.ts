export interface Structure {
  id: number;
  input: string;
  isComplete: boolean;
}

/* type Actions =
  | { type: "add"; payload: string }
  | { type: "delete"; payload: number }
  | { type: "done"; payload: number };

const ListReducer = (state: Structure[], action: Actions) => {
  switch (action.type) {
    case "add":
      return [
        ...state,
        { id: Date.now(), input: action.payload, isComple: false },
      ];
    case "delete":
      return state.filter((list) => list.id !== action.payload);
    case "done":
      return state.map((list) =>
        action.payload === list.id
          ? { ...list, isComplete: !list.isComplete }
          : list
      );
    default:
      throw state;
  }
};

import { useReducer } from "react";

const ReducerExample = () => {
  const [state, dispatch] = useReducer(ListReducer, []);

  return <div />;
};
 */
