import { createContext } from 'react';


interface ContextProps {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
    openSidemenu: () => void;
    closeSidemenu: () => void;
    setIsAddingEntry: (isAdd:boolean) => void;
    startDragging: () => void;
    endDragging: () => void;
}


export const UIContext = createContext({} as ContextProps );