import { createContext } from 'react';

interface ContextProps {
 isMenuOpen: boolean;
 toogleSideMenu: () => void;
}

export const UIContext = createContext({} as ContextProps);