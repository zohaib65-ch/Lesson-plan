import React, { useState, useMemo } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import { Plus } from "lucide-react";

import Navbar from "../components/Navbar";
import SettingsBar from "../components/SettingsBar";
import WarningAlerts from "../components/WarningAlerts";
import LessonTable from "../components/LessonTable";
import TotalTimeBar from "../components/TotalTimeBar";
import ActivityDetails from "../components/ActivityDetails";
import LessonModal from "../components/LessonModal";
import type { Lesson, LessonSettings } from "../types/Lesson";
import type { DragEndEvent } from "@dnd-kit/core";

/** Default lesson data matching the screenshot exactly */
const defaultLessons: Lesson[] = [
  {
    id: uuidv4(),
    contentTopic: "Warm-Up",
    duration: 10,
    activity: "Introduction, Hello My name is",
    socialForm: "PA - Pair",
    materials: [{ type: "Audio" }, { type: "Presentation" }],
    phase: "A",
  },
  {
    id: uuidv4(),
    contentTopic: "Vocabulary Practice",
    duration: 10,
    activity: "Students ask and answer questions.\nExample questions on the board.",
    socialForm: "PL - Plenary",
    materials: [{ type: "Worksheet" }],
    phase: "B",
  },
  {
    id: uuidv4(),
    contentTopic: "Info Gap Activity",
    duration: 20,
    activity: "Students ask and answer questions in pairs. (across the circle or room).",
    socialForm: "PA - Pair",
    materials: [{ type: "E-Book", pageRef: "p.9" }],
    phase: "C",
  },
  {
    id: uuidv4(),
    contentTopic: "Discussion Task",
    duration: 10,
    activity: "Teacher introduces exercise B",
    socialForm: "PL - Plenary",
    materials: [{ type: "E-Book", pageRef: "p.9" }],
    phase: "D",
  },
];

/**
 * DashboardPage – main lesson planner interface matching the screenshot.
 * Two-column layout: left = lesson table, right = activity details sidebar.
 */
const DashboardPage: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>(defaultLessons);
  const [settings, setSettings] = useState<LessonSettings>({
    targetDuration: 45,
    level: "A2",
    focus: "Speaking",
  });
  const [selectedId, setSelectedId] = useState<string | null>(defaultLessons[0]?.id || null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);

  // Optimised total time calculation
  const totalTime = useMemo(() => lessons.reduce((sum, l) => sum + l.duration, 0), [lessons]);

  // Selected lesson for sidebar
  const selectedLesson = useMemo(() => lessons.find((l) => l.id === selectedId) || null, [lessons, selectedId]);

  // Check if any lesson is a wrap-up
  const hasWrapUp = useMemo(() => lessons.length > 0 && lessons[lessons.length - 1].contentTopic.toLowerCase().includes("wrap"), [lessons]);

  /* -------- Handlers -------- */

  const handleReorder = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setLessons((prev) => {
      const oldIndex = prev.findIndex((l) => l.id === active.id);
      const newIndex = prev.findIndex((l) => l.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const handleSelect = (lesson: Lesson) => {
    setSelectedId(lesson.id);
  };

  const handleFieldChange = (id: string, field: keyof Lesson, value: unknown) => {
    setLessons((prev) => prev.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  };

  const handleDelete = (id: string) => {
    setLessons((prev) => prev.filter((l) => l.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const handleAddClick = () => {
    setEditingLesson(null);
    setModalOpen(true);
  };

  const handleEditClick = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setModalOpen(true);
  };

  const handleSave = (data: Omit<Lesson, "id">) => {
    if (editingLesson) {
      setLessons((prev) => prev.map((l) => (l.id === editingLesson.id ? { ...l, ...data } : l)));
    } else {
      const newLesson: Lesson = { id: uuidv4(), ...data };
      setLessons((prev) => [...prev, newLesson]);
      setSelectedId(newLesson.id);
    }
  };

  const handleDurationChange = (d: number) => {
    setSettings((prev) => ({ ...prev, targetDuration: d }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <Navbar lessonTitle="New Lesson" targetDuration={settings.targetDuration} onDurationChange={handleDurationChange} />

      <div className="max-w-full mx-auto px-4 sm:px-6 py-4">
        {/* Settings Bar */}
        <SettingsBar settings={settings} onSettingsChange={setSettings} />

        {/* Warning Alerts */}
        <div className="mt-3">
          <WarningAlerts totalMinutes={totalTime} targetDuration={settings.targetDuration} lessonCount={lessons.length} hasWrapUp={hasWrapUp} />
        </div>

        {/* Main two-column layout */}
        <div className="mt-4 flex flex-col md:flex-row gap-5">
          {/* Left: Lesson Plan */}
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Lesson Plan</h2>

            {/* Table */}
            <LessonTable lessons={lessons} selectedId={selectedId} onReorder={handleReorder} onSelect={handleSelect} onFieldChange={handleFieldChange} />

            {/* Footer: Total + Add Activity */}
            <div className="mt-1">
              <TotalTimeBar totalMinutes={totalTime} targetDuration={settings.targetDuration} />
            </div>

            <div className="flex justify-center mt-2">
              <button onClick={handleAddClick} className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
                <Plus className="w-4 h-4" />
                Add Activity
              </button>
            </div>
          </div>

          {/* Right: Activity Details Sidebar */}
          <div className="w-full md:w-72 flex-shrink-0">
            <ActivityDetails lesson={selectedLesson} onFieldChange={handleFieldChange} onDelete={handleDelete} onEdit={handleEditClick} onGenerate={() => {}} />
          </div>
        </div>
      </div>

      {/* Modal */}
      <LessonModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} lesson={editingLesson} />
    </div>
  );
};

export default DashboardPage;
