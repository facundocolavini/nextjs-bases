import { FC, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';
import { v4 as uuidV4 } from 'uuid';

export interface EntriesState {
    entries: Entry[];
}


const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidV4(),
            description: 'Description 1',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            _id: uuidV4(),
            description: 'Description 2',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            _id: uuidV4(),
            description: 'Description 3',
            status: 'finished',
            createdAt: Date.now() - 100000,
        },
        
    ],
}

export interface EntriesProviderProps {
    children: JSX.Element | JSX.Element[]
}

export const EntriesProvider:FC<EntriesProviderProps> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer , Entries_INITIAL_STATE );

    return (
        <EntriesContext.Provider value={{
            ...state
        }}>
            { children }
        </EntriesContext.Provider>
    )
};