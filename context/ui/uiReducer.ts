import { UiState } from "./";

type UIActionType =
  | { type: 'UI - Open Sidebar' }
  | { type: 'UI - Close Sidebar' }
  | { type: 'UI - Is Adding', payload: boolean }
  | { type: 'UI - StartEnd Dragging', payload: boolean }

export const uiReducer = (state: UiState, action: UIActionType): UiState => {

  switch (action.type) {
    case 'UI - Open Sidebar':

      return {
        ...state,
        sideMenuOpen: true
      };
    case 'UI - Close Sidebar':
      return {
        ...state,
        sideMenuOpen: false
      };
    case 'UI - Is Adding':

      return {
        ...state,
        isAddingEntry: action.payload
      }
    case 'UI - StartEnd Dragging':
      return {
        ...state,
        isDragging: action.payload
      }
    default:
      return state;
  }
}