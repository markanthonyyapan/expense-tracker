export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  createdAt: string;
}

export interface ExpenseData {
  expenses: Expense[];
  categories: string[];
}

export interface ExpenseFormData {
  title: string;
  amount: string;
  category: string;
  date: string;
}
