import { PropsWithChildren, useReducer, useEffect } from "react";
import { EntriesContext } from "./";
import { entriesReducer } from './';
import { Entry } from "@/interfaces/entries";
import { entriesApi } from "@/apis";
import { onMessage } from "@/utils/onMessage";
export interface entriesProps {
  entries: Entry[]
}

const ENTRIES_INITIAL_STATE: entriesProps = {
  entries: []
}

export const EntriesProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)
  const addNewEntry = async (description: string) => {

    try {
      const { data } = await entriesApi.post<Entry>('/entries', { description })
      dispatch({ type: '[Entry] Add-Entry', payload: data })
      onMessage({ message: 'Entrada Agregada', type: 'success' })
    } catch (error) {

    }
  }

  const updateEntry = async ({ _id, description, status }: Entry) => {
    try {

      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status })

      dispatch({
        type: '[Entry] ENTRY_UPDATE',
        payload: data
      })


    } catch (error) {

    }
  }

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries')
    dispatch({ type: '[Entry] Get-Entry', payload: data })
  }

  useEffect(() => {
    refreshEntries()
  }, [])


  return (
    <EntriesContext.Provider
      value={{
        ...state,
        //methops
        addNewEntry,
        updateEntry,
        refreshEntries
      }}>
      {children}
    </EntriesContext.Provider>
  )
}