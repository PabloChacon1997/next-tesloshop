import { FC, useReducer, PropsWithChildren } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
 isMenuOpen: boolean,
}


const UI_INITIAL_STATE: UIState = {
 isMenuOpen: false,
}

export const UIProvider:FC<PropsWithChildren<UIState>>= ({ children }) => {
 const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

 const toogleSideMenu = () => {
  dispatch({ type: 'UI- ToogleMenu' })
 }

 return (
   <UIContext.Provider value={{
     ...state,

    //  Methods
    toogleSideMenu
   }}>
     { children }
   </UIContext.Provider>
 )
}