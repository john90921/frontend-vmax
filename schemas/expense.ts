import { z } from 'zod';

export const EXPENSE_CATEGORIES = [
  'Food',
  'Transport',
  'Shopping',
  'Bills',
  'Entertainment',
  'Health',
  'Other',
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export const expenseFormSchema = z.object({
  amount: z.preprocess(
    (value) => {
      if (value === '' || value === null || value === undefined) return undefined;
      return typeof value === 'number' ? value : Number(value);
    },
    z
      .number({ error: 'Enter a valid amount' })
      .positive('Amount must be greater than 0'),
  ),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  category: z.enum(EXPENSE_CATEGORIES, { error: 'Select a category' }),
  description: z
    .string()
    .trim()
    .max(200, 'Keep description under 200 characters')
    .optional(),
  photoUri: z.string().nullable().optional(),
});

export type ExpenseFormValues = z.infer<typeof expenseFormSchema>;

export type ExpenseFormInput = z.input<typeof expenseFormSchema>;

export function getExpenseFormDefaults(): ExpenseFormInput {
  const now = new Date();
  const date = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('-');
  const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  return {
    amount: '',
    date,
    time,
    category: 'Food',
    description: '',
    photoUri: null,
  };
}
