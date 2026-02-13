"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Expense } from "@/types/expense";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import AuthForm from "@/components/AuthForm";
import Analytics from "@/components/Analytics";
import ThemeToggle from "@/components/ThemeToggle";
import ProfileDropdown from "@/components/ProfileDropdown";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  where,
  Timestamp,
  getDoc,
  setDoc,
} from "firebase/firestore";

const CATEGORIES = [
  "Food",
  "Transportation",
  "Utilities",
  "Entertainment",
  "Shopping",
  "Healthcare",
  "Other",
];

// Loading component for Suspense fallback
function HomeLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-primary"
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
        </div>
        <p className="text-gray-600 dark:text-gray-400 font-medium">
          Loading your expenses...
        </p>
      </div>
    </div>
  );
}

function HomeContent() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const skipValentine = searchParams.get("skipValentine") === "true";
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [userName, setUserName] = useState<string>("");
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
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [view, setView] = useState<"expenses" | "analytics">("expenses");

  // Check if user is logged in and redirect to Valentine page
  useEffect(() => {
    if (!authLoading && user && !skipValentine) {
      // Check if this is the first time showing Valentine page this session
      const hasSeenValentine = sessionStorage.getItem("seenValentine");
      if (!hasSeenValentine) {
        router.push("/valentine");
      }
    }
  }, [user, authLoading, router, skipValentine]);

  // Fetch user profile
  useEffect(() => {
    if (!user) {
      setUserName("");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(userData.name || user.email?.split("@")[0] || "User");
        } else {
          setUserName(user.email?.split("@")[0] || "User");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUserName(user.email?.split("@")[0] || "User");
      }
    };

    fetchUserProfile();
  }, [user]);

  useEffect(() => {
    if (!user) {
      setExpenses([]);
      setLoading(false);
      setInitialDataLoaded(true);
      return;
    }

    setLoading(true);
    const q = query(
      collection(db, "expenses"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const expenseData: Expense[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Expense[];
        setExpenses(expenseData);
        setLoading(false);
        setInitialDataLoaded(true);
      },
      (error) => {
        console.error("Error fetching expenses:", error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [user]);

  // Filter and search expenses
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      searchQuery === "" ||
      expense.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || expense.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

  const handleAddExpense = async (expense: {
    title: string;
    amount: number;
    category: string;
    date: string;
  }) => {
    if (!user) return;

    try {
      await addDoc(collection(db, "expenses"), {
        ...expense,
        userId: user.uid,
        createdAt: Timestamp.now(),
      });
      setShowForm(false);
      setEditingExpense(null);
      setFormData(null);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const handleUpdateExpense = async (expense: {
    title: string;
    amount: number;
    category: string;
    date: string;
  }) => {
    if (!editingExpense || !user) return;

    try {
      const expenseRef = doc(db, "expenses", editingExpense.id);
      await updateDoc(expenseRef, {
        title: expense.title,
        amount: expense.amount,
        category: expense.category,
        date: expense.date,
        updatedAt: Timestamp.now(),
      });
      setShowForm(false);
      setEditingExpense(null);
      setFormData(null);
      setPendingEditData(null);
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    if (!user) return;

    try {
      await deleteDoc(doc(db, "expenses", id));
    } catch (error) {
      console.error("Error deleting expense:", error);
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
    if (editingExpense) {
      setPendingEditData({
        title: newData.title,
        amount: parseFloat(newData.amount),
        category: newData.category,
        date: newData.date,
      });
    }
  };

  const handleUpdateUserName = async (newName: string) => {
    if (!user || !newName.trim()) return;

    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          name: newName.trim(),
          email: user.email,
          updatedAt: Timestamp.now(),
        },
        { merge: true },
      );
      setUserName(newName.trim());
    } catch (error) {
      console.error("Error updating user name:", error);
    }
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary"
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
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Loading your expenses...
          </p>
        </div>
      </div>
    );
  }

  // Show login/signup if not authenticated
  if (!user) {
    return (
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
              Sign in to manage your personal finances
            </p>
          </header>

          {/* Auth Form */}
          <AuthForm />

          {/* Footer */}
          <footer className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Secure authentication with Firebase
            </p>
          </footer>
        </div>
      </div>
    );
  }

  // Show expense tracker if authenticated
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Header with user info and profile dropdown */}
          <header className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary-foreground"
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
                <div className="text-left">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {userName ? `Hi, ${userName}` : "Welcome!"}
                  </p>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate max-w-[150px]">
                    {userName || user.email?.split("@")[0]}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <ProfileDropdown
                  userName={userName || user.email?.split("@")[0] || "User"}
                  onUpdateName={handleUpdateUserName}
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                Expense Tracker
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your personal finances
              </p>
            </div>
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
              {CATEGORIES.map((cat) => (
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
                  {`&quot;${searchQuery}&quot;`}
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
            </div>
          )}

          {/* View Toggle */}
          {!loading && initialDataLoaded && (
            <>
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setView("expenses")}
                  className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                    view === "expenses"
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
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
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  Expenses
                </button>
                <button
                  onClick={() => setView("analytics")}
                  className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                    view === "analytics"
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  Analytics
                </button>
              </div>

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
            </>
          )}

          {/* Loading State */}
          {loading && !initialDataLoaded && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
              <p className="text-gray-500 dark:text-gray-400">
                Loading expenses...
              </p>
            </div>
          )}

          {/* Expense Form */}
          {showForm && (
            <div className="mb-6 animate-fade-in">
              <ExpenseForm
                categories={CATEGORIES}
                onAddExpense={
                  editingExpense ? handleUpdateExpense : handleAddExpense
                }
                onCancel={handleFormClose}
                initialData={editingExpense || undefined}
                onDataChange={editingExpense ? handleFormDataChange : undefined}
              />
            </div>
          )}

          {/* Expense List or Analytics */}
          {!loading && initialDataLoaded && view === "expenses" && (
            <ExpenseList
              expenses={filteredExpenses}
              onDelete={handleDeleteExpense}
              onEdit={handleEditClick}
            />
          )}

          {/* Analytics View */}
          {!loading && initialDataLoaded && view === "analytics" && (
            <Analytics expenses={expenses} />
          )}

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
              Data stored securely in Firebase
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
            handleUpdateExpense(pendingEditData);
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

export default function Home() {
  return (
    <Suspense fallback={<HomeLoading />}>
      <HomeContent />
    </Suspense>
  );
}
