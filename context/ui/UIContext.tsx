import { createContext } from 'react';

export interface ContextProps {
  sideMenuOpen: boolean,
  isAddingEntry: boolean
  isDragging: boolean

  //methops
  openSideMenu: () => void
  closeSideMenu: () => void
  setIsAddingEntry: (payload: boolean) => void
  setIsDragging: (payload: boolean) => void
}


export const UiContext = createContext({} as ContextProps)