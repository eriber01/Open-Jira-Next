import { Entry } from "@/interfaces/entries";
import { entriesProps } from "./EntriesProvider";

type entriesActionType =
  | { type: '[Entry] Add-Entry', payload: Entry }
  | { type: '[Entry] ENTRY_UPDATE', payload: Entry }
  | { type: '[Entry] Get-Entry', payload: Entry[] }

export const entriesReducer = (state: entriesProps, action: entriesActionType): entriesProps => {
  switch (action.type) {
    case '[Entry] Add-Entry':
      return {
        ...state,
        entries: [...state.entries, action.payload]
      };

    case '[Entry] Get-Entry':
      return {
        ...state,
        entries: [...action.payload]
      }
    case '[Entry] ENTRY_UPDATE':

      return {
        ...state,
        entries: state.entries.map(item => {
          if (item._id === action.payload._id) {
            return action.payload
          }

          return item
        })
      }

    default:
      return state;
  }
}