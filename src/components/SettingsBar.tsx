import React from "react";
import type { LessonSettings } from "../types/Lesson";

interface SettingsBarProps {
  settings: LessonSettings;
  onSettingsChange: (settings: LessonSettings) => void;
}

const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
const focuses = ["Speaking", "Writing", "Reading", "Listening", "Grammar", "Vocabulary"];
const durations = [30, 45, 60, 75, 90, 120];

/**
 * SettingsBar – row of dropdowns for Duration, Level, Focus.
 * Matches the second bar in the screenshot.
 */
const SettingsBar: React.FC<SettingsBarProps> = ({ settings, onSettingsChange }) => {
  const update = (field: keyof LessonSettings, value: string | number) => {
    onSettingsChange({ ...settings, [field]: field === "targetDuration" ? Number(value) : value });
  };

  return (
    <div className="flex flex-wrap items-center gap-4 px-1 py-2">
      {/* Duration */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 font-medium">Duration:</span>
        <select
          value={settings.targetDuration}
          onChange={(e) => update("targetDuration", e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-400"
        >
          {durations.map((d) => (
            <option key={d} value={d}>
              {d} min
            </option>
          ))}
        </select>
      </div>

      {/* Level */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 font-medium">Level:</span>
        <select
          value={settings.level}
          onChange={(e) => update("level", e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-400"
        >
          {levels.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      {/* Focus */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 font-medium">Focus:</span>
        <select
          value={settings.focus}
          onChange={(e) => update("focus", e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-400"
        >
          {focuses.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SettingsBar;
