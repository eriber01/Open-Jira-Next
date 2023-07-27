import { PropsWithChildren, useReducer } from 'react';
import { UiContext, uiReducer } from './';

export interface UiState {
  sideMenuOpen: boolean
  isAddingEntry: boolean
  isDragging: boolean
}


const Ui_INITIAL_STATE: UiState = {
  sideMenuOpen: false,
  isAddingEntry: false,
  isDragging: false
}

export const UiProvider = ({ children }: PropsWithChildren) => {

  const [state, dispatch] = useReducer(uiReducer, Ui_INITIAL_STATE)

  const openSideMenu = () => {
    dispatch({ type: 'UI - Open Sidebar' })
  }

  const closeSideMenu = () => {
    dispatch({ type: 'UI - Close Sidebar' })
  }

  const setIsAddingEntry = (payload: boolean) => {
    dispatch({ type: 'UI - Is Adding', payload })
  }

  const setIsDragging = (payload: boolean) => {
    dispatch({ type: 'UI - StartEnd Dragging', payload })
  }

  return (
    <UiContext.Provider value={{
      ...state,

      //methops
      openSideMenu,
      closeSideMenu,
      setIsAddingEntry,
      setIsDragging
    }}>
      {children}
    </UiContext.Provider>
  )
}