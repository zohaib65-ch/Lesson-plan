/** Social form options */
export type SocialForm = "PA - Pair" | "PL - Plenary" | "GA - Group" | "IA - Individual";

/** Material types */
export type MaterialType = "Presentation" | "Worksheet" | "E-Book" | "Audio" | "Video" | "Textbook";

/** Phase labels */
export type Phase = "A" | "B" | "C" | "D" | "E" | "F";

/** A single material entry with optional page ref */
export interface Material {
  type: MaterialType;
  pageRef?: string; // e.g. "p.9"
}

/** Lesson type definition */
export interface Lesson {
  id: string;
  contentTopic: string; // Content / Topic column
  duration: number; // Time in minutes
  activity: string; // Activity description
  socialForm: SocialForm; // Social form dropdown
  materials: Material[]; // Materials list
  phase: Phase; // Phase letter
}

/** Lesson plan settings */
export interface LessonSettings {
  targetDuration: number; // 45, 60, or 90
  level: string; // A1, A2, B1, B2, C1, C2
  focus: string; // Speaking, Writing, Reading, Listening, Grammar
}
