import { Entry } from "@/interfaces";
import { FC, useReducer } from "react";
import { v4 as uuidV4 } from "uuid";
import { EntriesContext, entriesReducer } from "./";

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidV4(),
      description: "Pendientes: Description 1",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      _id: uuidV4(),
      description: "En-Progreso: Description 2",
      status: "in-progress",
      createdAt: Date.now() - 1000000,
    },
    {
      _id: uuidV4(),
      description: "Terminadas:Description 3",
      status: "finished",
      createdAt: Date.now() - 100000,
    },
  ],
};

export interface EntriesProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const EntriesProvider: FC<EntriesProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidV4(),
      description,
      createdAt: Date.now(),
      status: "pending",
    };
    dispatch({type:"[Entry] Add-Entry", payload: newEntry});
  };
   
  const updateEntry = (entry: Entry) => {
    dispatch({type:"[Entry] Entry-Updated", payload: entry});
  }

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
