"use client";

import { useState } from "react";
import { Expense } from "@/types/expense";
import ConfirmationModal from "./ConfirmationModal";

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
}

interface GroupedExpenses {
  [date: string]: Expense[];
}

export default function ExpenseList({
  expenses,
  onDelete,
  onEdit,
}: ExpenseListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Food: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      Transportation:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      Utilities:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      Entertainment:
        "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      Shopping:
        "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
      Healthcare:
        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
      Other: "bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-400",
    };
    return colors[category] || colors["Other"];
  };

  const getDayTotal = (dayExpenses: Expense[]) => {
    return dayExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  };

  const handleDeleteClick = (expense: Expense) => {
    setExpenseToDelete(expense);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (expenseToDelete) {
      setDeletingId(expenseToDelete.id);
      onDelete(expenseToDelete.id);
    }
    setShowDeleteModal(false);
    setExpenseToDelete(null);
    setTimeout(() => setDeletingId(null), 300);
  };

  // Group expenses by date
  const groupedExpenses: GroupedExpenses = expenses.reduce(
    (groups, expense) => {
      const date = expense.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(expense);
      return groups;
    },
    {} as GroupedExpenses,
  );

  // Sort dates (most recent first)
  const sortedDates = Object.keys(groupedExpenses).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime(),
  );

  if (expenses.length === 0) {
    return (
      <div className="card text-center py-12">
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
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mb-2">
          No expenses found
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          Try adjusting your search or filter
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            History
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {expenses.length} {expenses.length === 1 ? "item" : "items"}
          </span>
        </div>

        {sortedDates.map((date, dateIndex) => {
          const dayExpenses = groupedExpenses[date];
          const dayTotal = getDayTotal(dayExpenses);

          return (
            <div
              key={date}
              className="animate-fade-in"
              style={{ animationDelay: `${dateIndex * 100}ms` }}
            >
              {/* Day Header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {formatDate(date)}
                </h3>
                <span className="text-sm font-semibold text-primary-foreground bg-primary px-3 py-1 rounded-full">
                  {formatCurrency(dayTotal)}
                </span>
              </div>

              {/* Expenses for the day */}
              <div className="space-y-2">
                {dayExpenses.map((expense, index) => (
                  <div
                    key={expense.id}
                    className={`card flex items-center justify-between hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 ${
                      deletingId === expense.id ? "opacity-50 scale-95" : ""
                    }`}
                    style={{
                      animationDelay: `${dateIndex * 100 + index * 50}ms`,
                    }}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div
                        className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${getCategoryColor(expense.category)}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-800 dark:text-gray-200 truncate">
                          {expense.title}
                        </h4>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${getCategoryColor(expense.category)}`}
                        >
                          {expense.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 ml-3">
                      <span className="font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">
                        {formatCurrency(expense.amount)}
                      </span>
                      {/* Edit Button */}
                      <button
                        onClick={() => onEdit(expense)}
                        className="flex-shrink-0 p-1.5 rounded-lg text-blue-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 group"
                        aria-label="Edit expense"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 transition-transform group-hover:scale-110"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteClick(expense)}
                        className="flex-shrink-0 p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 group"
                        aria-label="Delete expense"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 transition-transform group-hover:scale-110"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Delete Expense"
        message={`Are you sure you want to delete "${expenseToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        confirmVariant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setShowDeleteModal(false);
          setExpenseToDelete(null);
        }}
      />
    </>
  );
}
