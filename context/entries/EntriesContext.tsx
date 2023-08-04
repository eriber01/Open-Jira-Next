import { Entry, EntryStatus } from "@/interfaces/entries";
import { createContext } from "react";

interface ContextProps {
  entries: Entry[],
  addNewEntry: (description: string) => void
  updateEntry: (entry: Entry) => void
  refreshEntries: () => void
}

export const EntriesContext = createContext({} as ContextProps)