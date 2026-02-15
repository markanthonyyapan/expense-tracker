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

export interface Budget {
  id: string;
  amount: number;
  month: string; // Format: YYYY-MM
  category?: string; // Optional: budget per category
  createdAt: string;
}

export interface BudgetSettings {
  budgetAmount: number;
  budgetPeriod: "daily" | "weekly" | "monthly";
  alertThreshold: number; // Percentage (e.g., 80 = 80%)
  enableAlerts: boolean;
}
