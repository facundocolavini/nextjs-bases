
import { FC, useEffect, useReducer } from "react";

import { EntriesContext, entriesReducer } from "./";
import { entriesApi } from "../../apis";
import { Entry } from "../../interfaces";

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

export interface EntriesProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const EntriesProvider: FC<EntriesProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const addNewEntry = async(description: string) => {
    const { data } = await entriesApi.post<Entry>("/entries", { description });

    dispatch({ type: "[Entry] Add-Entry", payload: data });
  };

  const updateEntry = async({_id,status, description}: Entry) => {
    try{

      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {  description, status });
      dispatch({ type: "[Entry] Entry-Updated", payload: data });
    } catch (error) {
      console.log({error});
    }
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>("/entries");
    dispatch({ type: "[Entry] Refresh-Data", payload: data });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
