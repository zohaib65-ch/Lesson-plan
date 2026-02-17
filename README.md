# Lesson Planner UI

A modern, frontend-only **Lesson Planner** built with **React + TypeScript**, **Vite**, **Tailwind CSS**, and **@dnd-kit** for drag-and-drop reordering.

---

## Features

- **Login Page** – simple dummy authentication (`admin` / `12345`)
- **Dashboard** – manage lesson rows (add, edit, delete, reorder)
- **Drag & Drop** – reorder lessons via `@dnd-kit/sortable`
- **Live Total Time** – updates instantly with `useMemo`
- **Modal Forms** – add & edit lessons through a clean modal dialog
- **Protected Routes** – unauthenticated users are redirected to login
- **Responsive** – works on desktop, tablet, and mobile screens

---

## Tech Stack

| Tool                  | Purpose               |
| --------------------- | --------------------- |
| React 18 + TypeScript | UI framework          |
| Vite                  | Build tool            |
| Tailwind CSS 3        | Utility-first styling |
| @dnd-kit              | Drag-and-drop         |
| react-router-dom      | Client-side routing   |
| lucide-react          | Icons                 |
| uuid                  | Unique IDs            |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Login Credentials

| Field    | Value   |
| -------- | ------- |
| Username | `admin` |
| Password | `12345` |

---

## Project Structure

```
src/
├── components/
│   ├── LessonModal.tsx      # Add / Edit modal dialog
│   ├── LessonRow.tsx         # Single draggable lesson row
│   ├── LessonTable.tsx       # Sortable table wrapper
│   ├── Navbar.tsx            # Top navigation bar
│   ├── ProtectedRoute.tsx    # Auth guard component
│   └── TotalTimeBar.tsx      # Live total duration display
├── pages/
│   ├── DashboardPage.tsx     # Main lesson planner view
│   └── LoginPage.tsx         # Login screen
├── types/
│   └── Lesson.ts             # Lesson type definition
├── App.tsx                   # Route definitions
├── main.tsx                  # Entry point
└── index.css                 # Tailwind directives
```

---

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Production build         |
| `npm run preview` | Preview production build |

---

## License

MIT
