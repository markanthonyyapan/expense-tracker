"use client";

import { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Expense } from "@/types/expense";
import { useBudget } from "@/context/BudgetContext";
import BudgetSettings from "./BudgetSettings";

interface AnalyticsProps {
  expenses: Expense[];
}

const COLORS = [
  "#10B981",
  "#3B82F6",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
  "#EF4444",
  "#6B7280",
];

const CATEGORY_COLORS: Record<string, string> = {
  Food: "#10B981",
  Transportation: "#3B82F6",
  Utilities: "#F59E0B",
  Entertainment: "#8B5CF6",
  Shopping: "#EC4899",
  Healthcare: "#EF4444",
  Other: "#6B7280",
};

function formatMonth(monthKey: string): string {
  const [year, month] = monthKey.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "2-digit",
  });
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(value);
}

export default function Analytics({ expenses }: AnalyticsProps) {
  // Calculate statistics first
  const stats = useMemo(() => {
    if (expenses.length === 0) {
      return { total: 0, average: 0, averageDaily: 0, highest: 0, count: 0 };
    }
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    const highest = Math.max(...expenses.map((e) => e.amount));

    // Calculate average daily expenses
    const sortedExpenses = [...expenses].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    const firstDate = new Date(sortedExpenses[0].date);
    const lastDate = new Date(sortedExpenses[sortedExpenses.length - 1].date);
    const dayDiff = Math.max(
      1,
      Math.ceil(
        (lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24),
      ),
    );
    const averageDaily = total / dayDiff;

    return {
      total,
      average: total / expenses.length,
      averageDaily,
      highest,
      count: expenses.length,
    };
  }, [expenses]);

  // Calculate category breakdown
  const categoryData = useMemo(() => {
    const categories: Record<string, number> = {};
    expenses.forEach((expense) => {
      categories[expense.category] =
        (categories[expense.category] || 0) + expense.amount;
    });
    return Object.entries(categories)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [expenses]);

  // Calculate monthly spending
  const monthlyData = useMemo(() => {
    const months: Record<string, number> = {};
    expenses.forEach((expense) => {
      const date = new Date(expense.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      months[monthKey] = (months[monthKey] || 0) + expense.amount;
    });
    return Object.entries(months)
      .map(([name, value]) => ({ name: formatMonth(name), value }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [expenses]);

  if (expenses.length === 0) {
    return (
      <div className="card text-center py-8 animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mb-2">
          No analytics available
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          Add some expenses to see your spending analytics
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Budget Progress */}
      <BudgetProgress expenses={expenses} />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card p-4 bg-gradient-to-br from-primary/20 to-primary/5">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Spent
          </p>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {formatCurrency(stats.total)}
          </p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Average</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {formatCurrency(stats.average)}
          </p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Expenses
          </p>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {stats.count}
          </p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Highest Expense
          </p>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {formatCurrency(stats.highest)}
          </p>
        </div>
        <div className="card p-4 bg-gradient-to-br from-secondary/20 to-secondary/5">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Daily Average
          </p>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {formatCurrency(stats.averageDaily)}
          </p>
        </div>
      </div>

      {/* Category Pie Chart */}
      <div className="card p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Spending by Category
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      CATEGORY_COLORS[entry.name] ||
                      COLORS[index % COLORS.length]
                    }
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number | undefined) =>
                  formatCurrency(value || 0)
                }
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Bar Chart */}
      {monthlyData.length > 0 && (
        <div className="card p-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Monthly Spending
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(value) => `₱${value}`}
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(value: number | undefined) => [
                    formatCurrency(value || 0),
                    "Spending",
                  ]}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar dataKey="value" fill="#F2BAC9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Category Breakdown List */}
      <div className="card p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Category Breakdown
        </h3>
        <div className="space-y-3">
          {categoryData.map((category) => {
            const percentage = ((category.value / stats.total) * 100).toFixed(
              1,
            );
            return (
              <div key={category.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700 dark:text-gray-300">
                    {category.name}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {formatCurrency(category.value)} ({percentage}%)
                  </span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor:
                        CATEGORY_COLORS[category.name] || "#6B7280",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Budget Progress Component
function BudgetProgress({ expenses }: { expenses: Expense[] }) {
  const { settings, getCurrentPeriodSpent, getBudgetStatus } = useBudget();
  const [showSettings, setShowSettings] = useState(false);

  const currentSpent = getCurrentPeriodSpent(expenses);
  const { percentage, isOverBudget, isWarning } = getBudgetStatus(expenses);

  const remaining = Math.max(0, settings.budgetAmount - currentSpent);

  const getProgressColor = () => {
    if (isOverBudget) return "bg-red-500";
    if (isWarning) return "bg-yellow-500";
    return "bg-primary";
  };

  const getStatusMessage = () => {
    if (isOverBudget)
      return `You've exceeded your ${settings.budgetPeriod} budget!`;
    if (isWarning) return `Warning: You've used ${percentage}% of your budget`;
    return `${percentage}% of budget used`;
  };

  return (
    <>
      <div className="card p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Monthly Budget
          </h3>
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>

        <div className="flex justify-between items-end mb-2">
          <div>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {formatCurrency(currentSpent)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              of {formatCurrency(settings.budgetAmount)} /{" "}
              {(settings.budgetPeriod || "monthly").charAt(0).toUpperCase() +
                (settings.budgetPeriod || "monthly").slice(1)}
            </p>
          </div>
          <div className="text-right">
            <p
              className={`text-sm font-medium ${
                isOverBudget
                  ? "text-red-500"
                  : isWarning
                    ? "text-yellow-500"
                    : "text-gray-500"
              }`}
            >
              {getStatusMessage()}
            </p>
            {!isOverBudget && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatCurrency(remaining)} remaining
              </p>
            )}
          </div>
        </div>

        <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${getProgressColor()}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>

        {isOverBudget && (
          <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-sm text-red-600 dark:text-red-400">
              Budget exceeded by{" "}
              {formatCurrency(currentSpent - settings.budgetAmount)}
            </p>
          </div>
        )}
      </div>

      {showSettings && (
        <BudgetSettings onClose={() => setShowSettings(false)} />
      )}
    </>
  );
}
