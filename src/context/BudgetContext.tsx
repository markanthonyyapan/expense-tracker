"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { BudgetSettings, Expense } from "@/types/expense";

interface BudgetContextType {
  settings: BudgetSettings;
  updateSettings: (newSettings: Partial<BudgetSettings>) => void;
  getCurrentPeriodSpent: (expenses: Expense[]) => number;
  getBudgetStatus: (expenses: Expense[]) => {
    percentage: number;
    isOverBudget: boolean;
    isWarning: boolean;
  };
}

const defaultSettings: BudgetSettings = {
  budgetAmount: 10000,
  budgetPeriod: "monthly",
  alertThreshold: 80,
  enableAlerts: true,
};

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export function BudgetProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<BudgetSettings>(defaultSettings);

  // Load settings from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("budgetSettings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Handle migration from old format
        if (
          parsed.monthlyBudget !== undefined &&
          parsed.budgetAmount === undefined
        ) {
          parsed.budgetAmount = parsed.monthlyBudget;
          parsed.budgetPeriod = "monthly";
        }
        setSettings(parsed);
      } catch (e) {
        console.error("Failed to parse budget settings:", e);
      }
    }
  }, []);

  const updateSettings = useCallback((newSettings: Partial<BudgetSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem("budgetSettings", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getCurrentPeriodSpent = useCallback(
    (expenses: Expense[]) => {
      const now = new Date();

      return expenses
        .filter((expense) => {
          const expenseDate = new Date(expense.date);

          switch (settings.budgetPeriod) {
            case "daily":
              // Today's expenses
              return expenseDate.toDateString() === now.toDateString();
            case "weekly":
              // This week's expenses (starting from Sunday)
              const weekStart = new Date(now);
              weekStart.setDate(now.getDate() - now.getDay());
              weekStart.setHours(0, 0, 0, 0);
              return expenseDate >= weekStart;
            case "monthly":
            default:
              // This month's expenses
              const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
              const expenseMonth = expense.date.substring(0, 7);
              return expenseMonth === currentMonth;
          }
        })
        .reduce((sum, expense) => sum + expense.amount, 0);
    },
    [settings.budgetPeriod],
  );

  const getBudgetStatus = useCallback(
    (expenses: Expense[]) => {
      const spent = getCurrentPeriodSpent(expenses);
      const percentage =
        settings.budgetAmount > 0
          ? Math.round((spent / settings.budgetAmount) * 100)
          : 0;

      return {
        percentage,
        isOverBudget: percentage >= 100,
        isWarning: percentage >= settings.alertThreshold && percentage < 100,
      };
    },
    [settings.budgetAmount, settings.alertThreshold, getCurrentPeriodSpent],
  );

  return (
    <BudgetContext.Provider
      value={{
        settings,
        updateSettings,
        getCurrentPeriodSpent,
        getBudgetStatus,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }
  return context;
}
