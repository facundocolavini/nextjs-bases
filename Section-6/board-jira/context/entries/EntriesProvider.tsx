import { FC, useEffect, useReducer } from "react";

import { useSnackbar } from "notistack";
import { entriesApi } from "../../apis";
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";

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
  const { enqueueSnackbar } = useSnackbar();

  const addNewEntry = async (description: string) => {
    try {
      const { data } = await entriesApi.post<Entry>("/entries", {
        description,
      });
      enqueueSnackbar("Entrada creada", {
        variant: "success",
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
      dispatch({ type: "[Entry] Add-Entry", payload: data });
    } catch (error) {
      console.log({ error });
    }
  };

  const updateEntry = async (
    { _id, status, description }: Entry,
    showSnackbar = false
  ) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status,
      });
      dispatch({ type: "[Entry] Entry-Updated", payload: data });
      // TODO: MOSTRAR SNACKBAR
      if (showSnackbar) {
        enqueueSnackbar("Entrada Actualizada", {
          variant: "info",
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const deleteEntry = async (entryId: string) => {
    try {
      await entriesApi.delete(`/entries/${entryId}`);
      dispatch({ type: "[Entry] Delete-Entry", payload: entryId });
      enqueueSnackbar("Entrada Eliminada", {
        variant: "success",
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    } catch (error) {
      console.log({ error });
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
        deleteEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
