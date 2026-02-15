"use client";

import { useState } from "react";
import { useBudget } from "@/context/BudgetContext";
import type { BudgetSettings } from "@/types/expense";

interface BudgetSettingsProps {
  onClose: () => void;
}

export default function BudgetSettings({ onClose }: BudgetSettingsProps) {
  const { settings, updateSettings } = useBudget();
  const [budget, setBudget] = useState(settings.budgetAmount.toString());
  const [period, setPeriod] = useState<BudgetSettings["budgetPeriod"]>(
    settings.budgetPeriod,
  );
  const [threshold, setThreshold] = useState(
    settings.alertThreshold.toString(),
  );
  const [enableAlerts, setEnableAlerts] = useState(settings.enableAlerts);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const budgetValue = parseFloat(budget) || 0;
    const thresholdValue = parseInt(threshold) || 80;

    updateSettings({
      budgetAmount: budgetValue,
      budgetPeriod: period,
      alertThreshold: Math.min(100, Math.max(0, thresholdValue)),
      enableAlerts,
    });
    onClose();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(value);
  };

  const getPeriodLabel = (p: BudgetSettings["budgetPeriod"]) => {
    switch (p) {
      case "daily":
        return "Daily";
      case "weekly":
        return "Weekly";
      case "monthly":
        return "Monthly";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="card w-full max-w-md p-6 animate-scale-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Budget Settings
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Budget Period Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Budget Period
            </label>
            <div className="flex gap-2">
              {(["daily", "weekly", "monthly"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPeriod(p)}
                  className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all ${
                    period === p
                      ? "bg-primary text-primary-foreground"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {getPeriodLabel(p)}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {getPeriodLabel(period)} Budget (PHP)
            </label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              min="0"
              step="100"
              className="input-field"
              placeholder={`Enter ${period} budget`}
            />
            <p className="text-xs text-gray-500 mt-1">
              Current: {formatCurrency(settings.budgetAmount)} /{" "}
              {getPeriodLabel(settings.budgetPeriod)}
            </p>
          </div>

          {/* Alert Threshold */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Alert Threshold (%)
            </label>
            <input
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              min="0"
              max="100"
              className="input-field"
              placeholder="80"
            />
            <p className="text-xs text-gray-500 mt-1">
              Get warned when you reach {settings.alertThreshold}% of budget
            </p>
          </div>

          {/* Enable Alerts Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setEnableAlerts(!enableAlerts)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                enableAlerts ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  enableAlerts ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Enable budget alerts
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline flex-1"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary flex-1">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
