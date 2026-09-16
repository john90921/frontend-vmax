import { createContext, useContext } from "react";
import { AppStateContextValue } from "../types/Context";
import { useExpences } from "@/hooks/expences/useExpences";
const AppStateContext =
    createContext<AppStateContextValue | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {

    const { expencesState, fetchExpences, addExpence } = useExpences();
    const contextValue: AppStateContextValue = {
        expencesState,
        fetchExpences,
        addExpence
    }
    return (
        <AppStateContext.Provider value={contextValue}>
            {children}
        </AppStateContext.Provider>
    )
}



export function useAppState() {
    const context = useContext(AppStateContext);
    if (!context) {
        throw new Error('useAppState must be used within an AppStateProvider');
    }
    return context;
}