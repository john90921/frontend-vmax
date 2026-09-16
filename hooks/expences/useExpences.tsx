import { useReducer } from "react";
import { ExpenceType } from "@/types/Expence";
interface ExpencesState {
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

function expencesReducer(state: ExpencesState, action: ExpencesAction): ExpencesState {
    switch (action.type) {
        case 'SET_EXPENCES':
            return{
                ...state,
                expences: action.expences,
            }
        case 'ADD_EXPENCE':
            return{
                ...state,
                expences: [...state.expences, action.expence],
            }
        case 'SET_ERROR':
            return{
                ...state,
                error: action.error,
            }
        case 'LOADING':
            return{
                ...state,
                loading: action.loading,
            }
        default:
            return state;
    }
}
export const useExpences = () => {
    const [state, dispatch] = useReducer(expencesReducer, initialExpencesState);

    const fetchExpences = async ()=> {
        dispatch({ type: 'LOADING', loading: true });
        await new Promise(resolve => setTimeout(resolve, 1000));
        dispatch({ type: 'SET_EXPENCES', expences: [
            { id: 1, name: 'Coffee', amount: 4.5, date: '2026-09-09', time: '10:00' },
            { id: 2, name: 'Coffee', amount: 4.5, date: '2026-09-09', time: '10:00' },
            { id: 3, name: 'Coffee', amount: 4.5, date: '2026-09-07', time: '10:00' },
            { id: 4, name: 'Coffee', amount: 4.5, date: '2026-09-06', time: '10:00' },
            { id: 5, name: 'Coffee', amount: 4.5, date: '2026-09-05', time: '10:00' },
            { id: 6, name: 'Coffee', amount: 4.5, date: '2026-09-04', time: '10:00' },
            { id: 7, name: 'Coffee', amount: 4.5, date: '2026-09-03', time: '10:00' },
            { id: 8, name: 'Coffee', amount: 4.5, date: '2026-09-02', time: '10:00' },
            { id: 9, name: 'Coffee', amount: 4.5, date: '2026-09-01', time: '10:00' },
            { id: 10, name: 'Coffee', amount: 4.5, date: '2026-08-31', time: '10:00' },
        ]});
        dispatch({ type: 'LOADING', loading: false });
    }
    const addExpence = async (expence: ExpenceType)=> {
        dispatch({ type: 'LOADING', loading: true });
        await new Promise(resolve => setTimeout(resolve, 1000));
        dispatch({ type: 'ADD_EXPENCE', expence: expence });
        dispatch({ type: 'LOADING', loading: false });
    }
    return {
        state,
        fetchExpences,
        addExpence
    };
}