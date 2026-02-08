"use client";

import { useState, useEffect } from "react";
import { Expense, ExpenseFormData } from "@/types/expense";

interface ExpenseFormProps {
  categories: string[];
  onAddExpense: (expense: {
    title: string;
    amount: number;
    category: string;
    date: string;
  }) => void;
  onCancel?: () => void;
  initialData?: Expense;
  onDataChange?: (data: {
    title: string;
    amount: string;
    category: string;
    date: string;
  }) => void;
}

export default function ExpenseForm({
  categories,
  onAddExpense,
  onCancel,
  initialData,
  onDataChange,
}: ExpenseFormProps) {
  const [formData, setFormData] = useState<ExpenseFormData>({
    title: "",
    amount: "",
    category: categories[0] || "Other",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (initialData) {
      const data = {
        title: initialData.title,
        amount: initialData.amount.toString(),
        category: initialData.category,
        date: initialData.date,
      };
      setFormData(data);
      onDataChange?.(data);
    }
  }, [initialData, onDataChange]);

  const handleChange = (data: ExpenseFormData) => {
    setFormData(data);
    onDataChange?.(data);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;

    onAddExpense({
      title: formData.title,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
    });

    if (!initialData) {
      const resetData = {
        title: "",
        amount: "",
        category: categories[0] || "Other",
        date: new Date().toISOString().split("T")[0],
      };
      setFormData(resetData);
      onDataChange?.(resetData);
    }
  };

  const formTitle = initialData ? "Edit Expense" : "Add New Expense";
  const buttonText = initialData ? "Save Changes" : "Add Expense";

  return (
    <form onSubmit={handleSubmit} className="card space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          {formTitle}
        </h2>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          <span className="flex items-center gap-1.5">
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
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            Title
          </span>
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleChange({ ...formData, title: e.target.value })}
          className="input-field"
          placeholder="e.g., Grocery Shopping"
          required
          autoFocus
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            <span className="flex items-center gap-1.5">
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Amount
            </span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              ₱
            </span>
            <input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) =>
                handleChange({ ...formData, amount: e.target.value })
              }
              className="input-field pl-8"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            <span className="flex items-center gap-1.5">
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Date
            </span>
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) =>
              handleChange({ ...formData, date: e.target.value })
            }
            className="input-field"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          <span className="flex items-center gap-1.5">
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
            Category
          </span>
        </label>
        <select
          value={formData.category}
          onChange={(e) =>
            handleChange({ ...formData, category: e.target.value })
          }
          className="input-field"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 btn-secondary py-2.5"
          >
            Cancel
          </button>
        )}
        <button type="submit" className="flex-1 btn-primary py-2.5">
          <span className="flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={initialData ? "M5 13l4 4L19 7" : "M12 4v16m8-8H4"}
              />
            </svg>
            {buttonText}
          </span>
        </button>
      </div>
    </form>
  );
}
