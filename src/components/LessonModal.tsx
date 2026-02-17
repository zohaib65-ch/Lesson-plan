import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { Lesson, SocialForm, Phase, MaterialType, Material } from "../types/Lesson";

interface LessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Lesson, "id">) => void;
  /** If provided, the modal is in "edit" mode; otherwise "add" mode. */
  lesson?: Lesson | null;
}

const socialForms: SocialForm[] = ["PA - Pair", "PL - Plenary", "GA - Group", "IA - Individual"];
const phases: Phase[] = ["A", "B", "C", "D", "E", "F"];
const allMaterials: MaterialType[] = ["Audio", "Worksheet", "Presentation", "E-Book", "Video", "Textbook"];

/**
 * LessonModal – modal dialog for adding or editing a lesson with ALL fields.
 */
const LessonModal: React.FC<LessonModalProps> = ({ isOpen, onClose, onSave, lesson }) => {
  const [contentTopic, setContentTopic] = useState("");
  const [duration, setDuration] = useState<number>(10);
  const [activity, setActivity] = useState("");
  const [socialForm, setSocialForm] = useState<SocialForm>("PA - Pair");
  const [selectedMaterials, setSelectedMaterials] = useState<MaterialType[]>([]);
  const [pageRef, setPageRef] = useState("");
  const [phase, setPhase] = useState<Phase>("A");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEditing = !!lesson;

  // Populate fields when editing
  useEffect(() => {
    if (lesson) {
      setContentTopic(lesson.contentTopic);
      setDuration(lesson.duration);
      setActivity(lesson.activity);
      setSocialForm(lesson.socialForm);
      setSelectedMaterials(lesson.materials.map((m) => m.type));
      setPageRef(lesson.materials.find((m) => m.pageRef)?.pageRef || "");
      setPhase(lesson.phase);
    } else {
      setContentTopic("");
      setDuration(10);
      setActivity("");
      setSocialForm("PA - Pair");
      setSelectedMaterials([]);
      setPageRef("");
      setPhase("A");
    }
    setErrors({});
  }, [lesson, isOpen]);

  const toggleMaterial = (mat: MaterialType) => {
    setSelectedMaterials((prev) => (prev.includes(mat) ? prev.filter((m) => m !== mat) : [...prev, mat]));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!contentTopic.trim()) newErrors.contentTopic = "Content/Topic is required.";
    if (duration < 0 || isNaN(duration)) newErrors.duration = "Duration must be 0 or greater.";
    if (!activity.trim()) newErrors.activity = "Activity description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const materials: Material[] = selectedMaterials.map((type) => ({
      type,
      ...(pageRef && (type === "E-Book" || type === "Textbook") ? { pageRef } : {}),
    }));

    onSave({
      contentTopic: contentTopic.trim(),
      duration,
      activity: activity.trim(),
      socialForm,
      materials,
      phase,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6 space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">{isEditing ? "Edit Activity" : "Add New Activity"}</h2>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Content / Topic */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content / Topic</label>
            <input
              type="text"
              value={contentTopic}
              onChange={(e) => {
                setContentTopic(e.target.value);
                setErrors((p) => ({ ...p, contentTopic: "" }));
              }}
              placeholder="e.g. Warm-Up, Vocabulary Practice"
              className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${errors.contentTopic ? "border-red-400" : "border-gray-300"}`}
              autoFocus
            />
            {errors.contentTopic && <p className="text-xs text-red-500 mt-1">{errors.contentTopic}</p>}
          </div>

          {/* Duration + Phase row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (min)</label>
              <input
                type="number"
                min={0}
                value={duration}
                onChange={(e) => {
                  setDuration(Number(e.target.value));
                  setErrors((p) => ({ ...p, duration: "" }));
                }}
                className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${errors.duration ? "border-red-400" : "border-gray-300"}`}
              />
              {errors.duration && <p className="text-xs text-red-500 mt-1">{errors.duration}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phase</label>
              <select
                value={phase}
                onChange={(e) => setPhase(e.target.value as Phase)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
              >
                {phases.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Activity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Activity Description</label>
            <textarea
              value={activity}
              onChange={(e) => {
                setActivity(e.target.value);
                setErrors((p) => ({ ...p, activity: "" }));
              }}
              rows={3}
              placeholder="Describe the activity..."
              className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none ${errors.activity ? "border-red-400" : "border-gray-300"}`}
            />
            {errors.activity && <p className="text-xs text-red-500 mt-1">{errors.activity}</p>}
          </div>

          {/* Social Form */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Social Form</label>
            <select
              value={socialForm}
              onChange={(e) => setSocialForm(e.target.value as SocialForm)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
            >
              {socialForms.map((sf) => (
                <option key={sf} value={sf}>
                  {sf}
                </option>
              ))}
            </select>
          </div>

          {/* Materials */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Materials</label>
            <div className="flex flex-wrap gap-2">
              {allMaterials.map((mat) => (
                <label
                  key={mat}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm cursor-pointer select-none transition-colors ${
                    selectedMaterials.includes(mat) ? "bg-indigo-50 border-indigo-300 text-indigo-700 font-medium" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedMaterials.includes(mat)}
                    onChange={() => toggleMaterial(mat)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
                  />
                  {mat}
                </label>
              ))}
            </div>
          </div>

          {/* Page Reference */}
          {(selectedMaterials.includes("E-Book") || selectedMaterials.includes("Textbook")) && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Page Reference</label>
              <input
                type="text"
                value={pageRef}
                onChange={(e) => setPageRef(e.target.value)}
                placeholder="e.g. p.9"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-md">
              {isEditing ? "Update Activity" : "Add Activity"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LessonModal;
