import React from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import LessonRow from "./LessonRow";
import type { Lesson } from "../types/Lesson";

interface LessonTableProps {
  lessons: Lesson[];
  selectedId: string | null;
  onReorder: (event: DragEndEvent) => void;
  onSelect: (lesson: Lesson) => void;
  onFieldChange: (id: string, field: keyof Lesson, value: unknown) => void;
}

/**
 * LessonTable – renders the sortable lesson table matching the screenshot.
 * Columns: Drag | Content/Topic | Time(min) | Activity | Social Form | Materials | Phase
 */
const LessonTable: React.FC<LessonTableProps> = ({ lessons, selectedId, onReorder, onSelect, onFieldChange }) => {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onReorder} modifiers={[restrictToVerticalAxis]}>
        <SortableContext items={lessons.map((l) => l.id)} strategy={verticalListSortingStrategy}>
          <table className="w-full min-w-[880px] text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider">
                <th className="px-2 py-2.5 w-8"></th>
                <th className="px-3 py-2.5 font-semibold">Content / Topic</th>
                <th className="px-3 py-2.5 font-semibold w-24">Time (min)</th>
                <th className="px-3 py-2.5 font-semibold">Activity</th>
                <th className="px-3 py-2.5 font-semibold w-32 hidden sm:table-cell">Social Form</th>
                <th className="px-3 py-2.5 font-semibold w-44 hidden md:table-cell">Materials</th>
                <th className="px-3 py-2.5 font-semibold w-14 text-center hidden sm:table-cell">Phase</th>
              </tr>
            </thead>
            <tbody>
              {lessons.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400 text-sm">
                    No activities yet. Click <span className="font-semibold text-indigo-500">"+ Add Activity"</span> to get started.
                  </td>
                </tr>
              ) : (
                lessons.map((lesson) => <LessonRow key={lesson.id} lesson={lesson} isSelected={selectedId === lesson.id} onSelect={onSelect} onFieldChange={onFieldChange} />)
              )}
            </tbody>
          </table>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default LessonTable;
