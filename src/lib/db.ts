"use client";

import { Expense, ExpenseData } from "@/types/expense";

const STORAGE_KEY = "expense-tracker-data";

export function readExpenses(): ExpenseData {
  if (typeof window === "undefined") {
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

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Failed to read expenses:", error);
  }

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

export function writeExpenses(data: ExpenseData): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save expenses:", error);
  }
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
