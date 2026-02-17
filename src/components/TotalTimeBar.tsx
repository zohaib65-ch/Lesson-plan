import React from "react";

interface TotalTimeBarProps {
  totalMinutes: number;
  targetDuration: number;
}

/**
 * TotalTimeBar – displays total duration and over/under target, matching screenshot.
 */
const TotalTimeBar: React.FC<TotalTimeBarProps> = ({ totalMinutes, targetDuration }) => {
  const diff = totalMinutes - targetDuration;
  const isOver = diff > 0;
  const isUnder = diff < 0;

  return (
    <div className="flex flex-col gap-1">
      {/* Inline total inside table footer area */}
      <div className="flex items-center gap-3 px-1 py-2">
        <span className="text-sm font-bold text-indigo-700">Total: {totalMinutes} min</span>
        {diff !== 0 && <span className={`text-sm font-medium ${isOver ? "text-red-500" : "text-green-600"}`}>{isOver ? `+ ${diff} min over target` : `${Math.abs(diff)} min under target`}</span>}
      </div>
      {/* Bottom center total */}
      <div className="text-center py-2">
        <span className="text-sm text-gray-600 font-medium">
          Total: <span className="font-bold text-gray-800">{totalMinutes} min</span> <span className="text-gray-400">± 5 min</span>
        </span>
      </div>
    </div>
  );
};

export default TotalTimeBar;
