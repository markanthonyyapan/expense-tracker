"use client";

import { useState, useEffect } from "react";
import { Expense, ExpenseData } from "@/types/expense";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import ConfirmationModal from "@/components/ConfirmationModal";

export default function Home() {
  const [data, setData] = useState<ExpenseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [formData, setFormData] = useState<{
    title: string;
    amount: string;
    category: string;
    date: string;
  } | null>(null);
  const [showEditConfirmModal, setShowEditConfirmModal] = useState(false);
  const [pendingEditData, setPendingEditData] = useState<{
    title: string;
    amount: number;
    category: string;
    date: string;
  } | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/expenses");
      const expenseData = await response.json();
      setData(expenseData);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddExpense = async (expense: {
    title: string;
    amount: number;
    category: string;
    date: string;
  }) => {
    try {
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense),
      });
      if (response.ok) {
        fetchData();
        setShowForm(false);
        setEditingExpense(null);
        setFormData(null);
      }
    } catch (error) {
      console.error("Failed to add expense:", error);
    }
  };

  const handleUpdateExpense = (expense: {
    title: string;
    amount: number;
    category: string;
    date: string;
  }) => {
    if (!editingExpense) return;
    setPendingEditData(expense);
    setShowEditConfirmModal(true);
  };

  const confirmUpdateExpense = async () => {
    if (!pendingEditData || !editingExpense) return;
    try {
      const response = await fetch(`/api/expenses/${editingExpense.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pendingEditData),
      });
      if (response.ok) {
        fetchData();
        setShowForm(false);
        setEditingExpense(null);
        setFormData(null);
      }
    } catch (error) {
      console.error("Failed to update expense:", error);
    } finally {
      setShowEditConfirmModal(false);
      setPendingEditData(null);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      const response = await fetch(`/api/expenses/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };

  const handleEditClick = (expense: Expense) => {
    setEditingExpense(expense);
    setFormData({
      title: expense.title,
      amount: expense.amount.toString(),
      category: expense.category,
      date: expense.date,
    });
    setShowForm(true);
  };

  const handleFormClose = () => {
    if (formData && editingExpense) {
      // Check if there are unsaved changes
      const hasChanges =
        formData.title !== editingExpense.title ||
        parseFloat(formData.amount) !== editingExpense.amount ||
        formData.category !== editingExpense.category ||
        formData.date !== editingExpense.date;

      if (hasChanges) {
        setShowEditConfirmModal(true);
        return;
      }
    }
    setShowForm(false);
    setEditingExpense(null);
    setFormData(null);
  };

  const handleFormDataChange = (newData: {
    title: string;
    amount: string;
    category: string;
    date: string;
  }) => {
    setFormData(newData);
  };

  // Filter and search expenses
  const filteredExpenses =
    data?.expenses.filter((expense) => {
      const matchesSearch =
        searchQuery === "" ||
        expense.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || expense.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }) || [];

  const totalExpenses = filteredExpenses.reduce(
    (sum, exp) => sum + exp.amount,
    0,
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading your expenses...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <header className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-4 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-primary-foreground"
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
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Expense Tracker
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your personal finances
            </p>
          </header>

          {/* Total Card */}
          <div className="mb-6 relative overflow-hidden card bg-gradient-to-r from-primary to-primary-light shadow-lg">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white opacity-10 rounded-full"></div>
            <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
            <div className="text-center relative z-10">
              <p className="text-sm font-medium text-primary-foreground opacity-90 mb-1 flex items-center justify-center gap-2">
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
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                Total Expenses
              </p>
              <p className="text-4xl font-bold text-primary-foreground">
                {formatCurrency(totalExpenses)}
              </p>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="mb-4 flex gap-2">
            {/* Search Input */}
            <div className="relative flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search expenses..."
                className="input-field pl-10"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field w-auto min-w-[120px]"
            >
              <option value="all">All</option>
              {data?.categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Active Filters Badge */}
          {(searchQuery || selectedCategory !== "all") && (
            <div className="mb-4 flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Showing results for:
              </span>
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/20 text-primary-foreground rounded-full text-sm">
                  &quot;{searchQuery}&quot;
                  <button
                    onClick={() => setSearchQuery("")}
                    className="hover:text-primary-foreground/80"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
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
                </span>
              )}
              {selectedCategory !== "all" && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/20 text-primary-foreground rounded-full text-sm">
                  {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className="hover:text-primary-foreground/80"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
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
                </span>
              )}
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="text-sm text-primary hover:underline ml-auto"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Add Expense Button */}
          {!showForm && (
            <button
              onClick={() => {
                setEditingExpense(null);
                setFormData(null);
                setShowForm(true);
              }}
              className="w-full mb-6 btn-primary py-3 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add New Expense
            </button>
          )}

          {/* Expense Form */}
          {showForm && (
            <div className="mb-6 animate-fade-in">
              <ExpenseForm
                categories={data?.categories || []}
                onAddExpense={
                  editingExpense ? handleUpdateExpense : handleAddExpense
                }
                onCancel={handleFormClose}
                initialData={editingExpense || undefined}
                onDataChange={editingExpense ? handleFormDataChange : undefined}
              />
            </div>
          )}

          {/* Expense List */}
          <ExpenseList
            expenses={filteredExpenses}
            onDelete={handleDeleteExpense}
            onEdit={handleEditClick}
          />

          {/* Footer */}
          <footer className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-500 flex items-center justify-center gap-1">
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Data stored locally
            </p>
          </footer>
        </div>
      </div>

      {/* Edit Confirmation Modal */}
      <ConfirmationModal
        isOpen={showEditConfirmModal}
        title="Unsaved Changes"
        message="You have unsaved changes. Do you want to save them?"
        confirmText="Save"
        cancelText="Discard"
        confirmVariant="primary"
        onConfirm={() => {
          if (pendingEditData) {
            confirmUpdateExpense();
          } else {
            setShowForm(false);
            setEditingExpense(null);
            setFormData(null);
            setShowEditConfirmModal(false);
          }
        }}
        onCancel={() => {
          setShowEditConfirmModal(false);
          setPendingEditData(null);
          setShowForm(false);
          setEditingExpense(null);
          setFormData(null);
        }}
      />
    </>
  );
}
