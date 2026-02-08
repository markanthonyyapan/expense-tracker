"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import ConfirmationModal from "./ConfirmationModal";

interface ProfileDropdownProps {
  userName: string;
  onUpdateName: (newName: string) => Promise<void>;
}

export default function ProfileDropdown({
  userName,
  onUpdateName,
}: ProfileDropdownProps) {
  const { signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editName, setEditName] = useState(userName);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [hasNameChanged, setHasNameChanged] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setShowEditProfile(false);
        setShowSignOutConfirm(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setHasNameChanged(editName.trim() !== userName);
  }, [editName, userName]);

  const handleSignOut = () => {
    setShowSignOutConfirm(true);
  };

  const handleConfirmSignOut = async () => {
    await signOut();
    setIsOpen(false);
    setShowSignOutConfirm(false);
  };

  const handleEditProfile = () => {
    setEditName(userName);
    setShowEditProfile(true);
  };

  const handleSaveName = async () => {
    if (editName.trim()) {
      await onUpdateName(editName);
    }
    setShowEditProfile(false);
    setIsOpen(false);
    setHasNameChanged(false);
  };

  const handleCancelEdit = () => {
    setEditName(userName);
    setShowEditProfile(false);
    setHasNameChanged(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-primary-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 animate-fade-in">
          {showEditProfile ? (
            <div className="p-4">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Edit Profile
              </p>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="input-field w-full mb-3"
                placeholder="Your name"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSaveName}
                  disabled={!hasNameChanged}
                  className={`flex-1 py-2 text-sm rounded-lg transition-colors ${
                    hasNameChanged
                      ? "bg-primary text-primary-foreground hover:opacity-90"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex-1 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Signed in as
                </p>
                <p className="font-medium text-gray-800 dark:text-gray-200 truncate">
                  {userName}
                </p>
              </div>
              <div className="py-2">
                <button
                  onClick={handleEditProfile}
                  className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit Profile
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400"
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
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Sign Out Confirmation Modal */}
      <ConfirmationModal
        isOpen={showSignOutConfirm}
        title="Sign Out"
        message="Are you sure you want to sign out?"
        confirmText="Sign Out"
        cancelText="Cancel"
        confirmVariant="danger"
        onConfirm={handleConfirmSignOut}
        onCancel={() => setShowSignOutConfirm(false)}
      />
    </div>
  );
}
