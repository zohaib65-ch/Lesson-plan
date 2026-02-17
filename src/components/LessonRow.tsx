import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Volume2, BookOpen, FileText, Headphones, Video, BookMarked } from "lucide-react";
import type { Lesson, MaterialType } from "../types/Lesson";

interface LessonRowProps {
  lesson: Lesson;
  isSelected: boolean;
  onSelect: (lesson: Lesson) => void;
  onFieldChange: (id: string, field: keyof Lesson, value: unknown) => void;
}

/** Icon lookup for material types */
const materialIcon: Record<MaterialType, React.ReactNode> = {
  Presentation: <Volume2 className="w-3.5 h-3.5" />,
  Worksheet: <FileText className="w-3.5 h-3.5" />,
  "E-Book": <BookOpen className="w-3.5 h-3.5" />,
  Audio: <Headphones className="w-3.5 h-3.5" />,
  Video: <Video className="w-3.5 h-3.5" />,
  Textbook: <BookMarked className="w-3.5 h-3.5" />,
};

/** Color classes for material badges */
const materialColor: Record<MaterialType, string> = {
  Presentation: "bg-teal-100 text-teal-800",
  Worksheet: "bg-teal-100 text-teal-800",
  "E-Book": "bg-teal-100 text-teal-800",
  Audio: "bg-blue-100 text-blue-800",
  Video: "bg-purple-100 text-purple-800",
  Textbook: "bg-amber-100 text-amber-800",
};

/**
 * LessonRow – a single draggable row matching the screenshot layout.
 * Columns: Drag | Content/Topic | Time(min) | Activity | Social Form | Materials | Phase
 */
const LessonRow: React.FC<LessonRowProps> = ({ lesson, isSelected, onSelect, onFieldChange }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: lesson.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      onClick={() => onSelect(lesson)}
      className={`border-b border-gray-200 cursor-pointer transition-colors ${
        isDragging ? "bg-indigo-50 shadow-lg" : ""
      } ${isSelected ? "bg-blue-50 border-l-4 border-l-indigo-500" : "hover:bg-gray-50"}`}
    >
      {/* Drag handle */}
      <td className="px-2 py-3 w-8">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-indigo-500 transition-colors"
          title="Drag to reorder"
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical className="w-4 h-4" />
        </button>
      </td>

      {/* Content / Topic */}
      <td className="px-3 py-3 text-sm font-medium text-gray-800 max-w-[140px] sm:max-w-none overflow-hidden truncate">
        {lesson.contentTopic || <span className="text-gray-400 italic">Untitled</span>}
      </td>

      {/* Time (min) */}
      <td className="px-3 py-3 w-24">
        <div className="flex items-center gap-1">
          <input
            type="number"
            min={0}
            value={lesson.duration}
            onChange={(e) => {
              e.stopPropagation();
              onFieldChange(lesson.id, "duration", Math.max(0, Number(e.target.value)));
            }}
            onClick={(e) => e.stopPropagation()}
            className="w-14 border border-gray-300 rounded-md px-2 py-1 text-sm text-center focus:outline-none focus:ring-1 focus:ring-indigo-400"
          />
          <span className="text-xs text-gray-400">▾</span>
        </div>
      </td>

      {/* Activity */}
      <td className="px-3 py-3 text-sm text-gray-600 max-w-[160px] sm:max-w-[220px] overflow-hidden">
        <p className="line-clamp-2">{lesson.activity || <span className="text-gray-400 italic">No activity</span>}</p>
      </td>

      {/* Social Form */}
      <td className="px-3 py-3 w-32 hidden sm:table-cell">
        <select
          value={lesson.socialForm}
          onChange={(e) => {
            e.stopPropagation();
            onFieldChange(lesson.id, "socialForm", e.target.value);
          }}
          onClick={(e) => e.stopPropagation()}
          className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-400 bg-white"
        >
          <option value="PA - Pair">PA - Pair</option>
          <option value="PL - Plenary">PL - Plenary</option>
          <option value="GA - Group">GA - Group</option>
          <option value="IA - Individual">IA - Individual</option>
        </select>
      </td>

      {/* Materials */}
      <td className="px-3 py-3 w-44 hidden md:table-cell">
        <div className="flex flex-col gap-1">
          {lesson.materials.map((mat, i) => (
            <div key={i} className="flex flex-col gap-0.5">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${materialColor[mat.type]}`}>
                {materialIcon[mat.type]}
                {mat.type}
              </span>
              {mat.pageRef && <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">Textbook, {mat.pageRef}</span>}
            </div>
          ))}
        </div>
      </td>

      {/* Phase */}
      <td className="px-3 py-3 w-14 text-center hidden sm:table-cell">
        <span className="text-sm font-semibold text-gray-700">{lesson.phase}</span>
      </td>
    </tr>
  );
};

export default LessonRow;
