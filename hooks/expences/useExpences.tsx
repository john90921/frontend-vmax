import { useReducer } from "react";
import { ExpenceType } from "@/types/Expence";
import { createDispatchWithLogging } from "@/utils/dispatchWithLogging";
export interface ExpencesState {
    expences: ExpenceType[];
    loading: boolean;
    error: string | null;
}
const initialExpencesState: ExpencesState = {
    expences: [],
    loading: false,
    error: null,
}

type ExpencesAction = {
    type: 'SET_EXPENCES';
    expences: ExpenceType[];
} | {
    type: 'ADD_EXPENCE';
    expence: ExpenceType;
} | {
    type: 'UPDATE_EXPENCE';
    expence: ExpenceType;
} | {
    type: 'SET_ERROR';
    error: string;
} | {
    type: 'LOADING';
    loading: boolean;
}

function expencesReducer(expencesState: ExpencesState, action: ExpencesAction): ExpencesState {
    switch (action.type) {
        case 'SET_EXPENCES':
            return{
                ...expencesState,
                expences: action.expences,
            }
        case 'ADD_EXPENCE':
            return{
                ...expencesState,
                expences: [...expencesState.expences, action.expence],
            }
        case 'SET_ERROR':
            return{
                ...expencesState,
                error: action.error,
            }
        case 'LOADING':
            return{
                ...expencesState,
                loading: action.loading,
            }
        default:
            return expencesState;
    }
}
export const useExpences = () => {
    const [expencesState, dispatch] = useReducer(expencesReducer, initialExpencesState);
    const logDispatch = createDispatchWithLogging<ExpencesAction>(dispatch,'useExpences.tsx');
    const fetchExpences = async ()=> {
        dispatch({ type: 'LOADING', loading: true });
        await new Promise(resolve => setTimeout(resolve, 1000));
        logDispatch({ type: 'SET_EXPENCES', expences: [
            { id: 1, category: 'Fod', amount: 4.5, date: '2026-09-09', time: '10:00' },
            { id: 2, category: 'Food', amount: 4.5, date: '2026-09-09', time: '10:00' },
            { id: 3, category: 'Food', amount: 4.5, date: '2026-09-07', time: '10:00' },
            { id: 4, category: 'Food', amount: 4.5, date: '2026-09-06', time: '10:00' },
            { id: 5, category: 'Food', amount: 4.5, date: '2026-09-05', time: '10:00' },
            { id: 6, category: 'Food', amount: 4.5, date: '2026-09-04', time: '10:00' },
            { id: 7, category: 'Food', amount: 4.5, date: '2026-09-03', time: '10:00' },
            { id: 8, category: 'Food', amount: 4.5, date: '2026-09-02', time: '10:00' },
            { id: 9, category: 'Food', amount: 4.5, date: '2026-09-01', time: '10:00' },
            { id: 10, category: 'Fod', amount: 4.5, date: '2026-08-31', time: '10:00' },
        ]});
        logDispatch({ type: 'LOADING', loading: false });
    }
    const addExpence = async (expence: ExpenceType)=> {
        logDispatch({ type: 'LOADING', loading: true });
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('expence', expencesState.expences);
        logDispatch({ type: 'LOADING', loading: false });
    }
    return {
        expencesState,
        fetchExpences,
        addExpence
    };
}