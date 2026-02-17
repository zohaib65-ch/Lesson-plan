import React from "react";
import { Trash2, Pencil, Sparkles } from "lucide-react";
import type { Lesson, MaterialType } from "../types/Lesson";

const allMaterials: MaterialType[] = ["Audio", "Worksheet", "Presentation", "E-Book", "Video", "Textbook"];

interface ActivityDetailsProps {
  lesson: Lesson | null;
  onFieldChange: (id: string, field: keyof Lesson, value: unknown) => void;
  onDelete: (id: string) => void;
  onEdit: (lesson: Lesson) => void;
  onGenerate: () => void;
}

/**
 * ActivityDetails – right sidebar panel showing details of the selected activity.
 * Matches the "Activity Details" panel from the screenshot.
 */
const ActivityDetails: React.FC<ActivityDetailsProps> = ({ lesson, onFieldChange, onDelete, onEdit, onGenerate }) => {
  if (!lesson) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h3 className="text-sm font-bold text-gray-800 mb-3">Activity Details</h3>
        <p className="text-sm text-gray-400 italic">Select an activity to view details</p>
      </div>
    );
  }

  const handleMaterialToggle = (matType: MaterialType) => {
    const current = lesson.materials.map((m) => m.type);
    let newMaterials;
    if (current.includes(matType)) {
      newMaterials = lesson.materials.filter((m) => m.type !== matType);
    } else {
      newMaterials = [...lesson.materials, { type: matType }];
    }
    onFieldChange(lesson.id, "materials", newMaterials);
  };

  const activeMats = lesson.materials.map((m) => m.type);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-800">Activity Details</h3>
        <div className="flex items-center gap-1">
          <button onClick={() => onEdit(lesson)} className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors" title="Edit activity">
            <Pencil className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete(lesson.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Delete activity">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Duration */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Duration</label>
        <select
          value={lesson.duration}
          onChange={(e) => onFieldChange(lesson.id, "duration", Number(e.target.value))}
          className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-400 bg-white"
        >
          {[5, 10, 15, 20, 25, 30, 45, 60].map((d) => (
            <option key={d} value={d}>
              {d} min
            </option>
          ))}
        </select>
      </div>

      {/* Social Form */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Social Form</label>
        <select
          value={lesson.socialForm}
          onChange={(e) => onFieldChange(lesson.id, "socialForm", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-400 bg-white"
        >
          <option value="PA - Pair">Pairs</option>
          <option value="PL - Plenary">Plenary</option>
          <option value="GA - Group">Group</option>
          <option value="IA - Individual">Individual</option>
        </select>
      </div>

      {/* Materials */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1.5">Materials:</label>
        <div className="flex flex-wrap gap-2">
          {allMaterials.map((mat) => {
            const isActive = activeMats.includes(mat);
            return (
              <label key={mat} className={`flex items-center gap-1.5 text-xs cursor-pointer select-none ${isActive ? "text-indigo-700 font-semibold" : "text-gray-500"}`}>
                <input type="checkbox" checked={isActive} onChange={() => handleMaterialToggle(mat)} className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5" />
                {mat}
              </label>
            );
          })}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Notes:</label>
        <textarea
          value={lesson.activity}
          onChange={(e) => onFieldChange(lesson.id, "activity", e.target.value)}
          rows={3}
          placeholder="Activity notes..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-400 resize-none"
        />
      </div>

      {/* Generate Activity Button */}
      <button
        onClick={onGenerate}
        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors shadow-sm"
      >
        <Sparkles className="w-4 h-4" />
        Generate Activity
      </button>
    </div>
  );
};

export default ActivityDetails;
