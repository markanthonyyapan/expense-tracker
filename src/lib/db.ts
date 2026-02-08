import fs from "fs";
import path from "path";
import { Expense, ExpenseData } from "@/types/expense";

const DATA_FILE = path.join(process.cwd(), "data", "expenses.json");

export function readExpenses(): ExpenseData {
  try {
    const fileContents = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(fileContents);
  } catch (error) {
    return {
      expenses: [],
      categories: [
        "Food",
        "Transportation",
        "Utilities",
        "Entertainment",
        "Shopping",
        "Healthcare",
        "Other",
      ],
    };
  }
}

export function writeExpenses(data: ExpenseData): void {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

export function addExpense(
  expense: Omit<Expense, "id" | "createdAt">,
): Expense {
  const data = readExpenses();
  const newExpense: Expense = {
    ...expense,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  data.expenses.unshift(newExpense);
  writeExpenses(data);
  return newExpense;
}

export function updateExpense(
  id: string,
  updates: Partial<Expense>,
): Expense | null {
  const data = readExpenses();
  const index = data.expenses.findIndex((e) => e.id === id);
  if (index === -1) return null;

  data.expenses[index] = { ...data.expenses[index], ...updates };
  writeExpenses(data);
  return data.expenses[index];
}

export function deleteExpense(id: string): boolean {
  const data = readExpenses();
  const index = data.expenses.findIndex((e) => e.id === id);
  if (index === -1) return false;

  data.expenses.splice(index, 1);
  writeExpenses(data);
  return true;
}

export function getExpenseById(id: string): Expense | null {
  const data = readExpenses();
  return data.expenses.find((e) => e.id === id) || null;
}
