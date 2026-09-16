export type ExpenceType = {
    id?: number;
    amount: number;
    date: string;
    time: string;
    category?: ExpenseCategory|null;
    description?: string|null;
}