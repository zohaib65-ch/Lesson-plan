import React from "react";
import { AlertTriangle } from "lucide-react";

interface WarningAlertsProps {
  totalMinutes: number;
  targetDuration: number;
  lessonCount: number;
  hasWrapUp: boolean;
}

/**
 * WarningAlerts – yellow warning banners matching the screenshot.
 * Shows warnings for: no wrap-up phase, too many transitions, over target.
 */
const WarningAlerts: React.FC<WarningAlertsProps> = ({ totalMinutes, targetDuration, lessonCount, hasWrapUp }) => {
  const warnings: { message: string; detail?: string }[] = [];

  // No wrap-up phase warning
  if (!hasWrapUp) {
    warnings.push({ message: "No wrap-up phase at the end.", detail: "Why?" });
  }

  // Too many transitions (>8 for 60 min, scale for others)
  const maxTransitions = Math.round((targetDuration / 60) * 8);
  if (lessonCount > maxTransitions) {
    warnings.push({
      message: `Too many transitions (>${maxTransitions} for ${targetDuration} min).`,
      detail: "Why?",
    });
  }

  // Over target
  if (totalMinutes > targetDuration + 5) {
    warnings.push({
      message: `Total time (${totalMinutes} min) exceeds target by ${totalMinutes - targetDuration} min.`,
    });
  }

  if (warnings.length === 0) return null;

  return (
    <div className="space-y-2">
      {warnings.map((w, i) => (
        <div key={i} className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5 text-sm text-amber-800">
          <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
          <span>{w.message}</span>
          {w.detail && <button className="text-indigo-600 hover:text-indigo-800 font-medium underline ml-1">{w.detail}</button>}
        </div>
      ))}
    </div>
  );
};

export default WarningAlerts;
