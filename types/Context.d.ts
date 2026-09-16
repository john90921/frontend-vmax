import { ExpenceType } from "./Expence";
import { ExpencesState } from "@/hooks/expences/useExpences";

export type AppStateContextValue = {
    expencesState: ExpencesState;
    fetchExpences: () => void;
    addExpence: (expence: ExpenceType) => void;
};