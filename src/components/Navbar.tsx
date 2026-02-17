import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, LogOut, MoreHorizontal } from "lucide-react";

interface NavbarProps {
  lessonTitle: string;
  targetDuration: number;
  onDurationChange: (d: number) => void;
}

/**
 * Navbar – top header bar matching the screenshot design.
 * Shows lesson title, duration toggle buttons, Auto Adjust Times, and menu.
 */
const Navbar: React.FC<NavbarProps> = ({ lessonTitle, targetDuration, onDurationChange }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const durations = [45, 60, 90];

  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Left: Back / Logout button */}
          <div className="flex items-center gap-2">
            <button onClick={handleLogout} className="p-1.5 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors" title="Back / Logout" aria-label="Back or logout">
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Center: Title (truncated on small screens) + responsive controls */}
          <div className="flex-1 flex items-center justify-center gap-4 min-w-0">
            <span className="text-base font-semibold text-gray-800 truncate max-w-[160px] sm:max-w-[220px] md:max-w-none">{lessonTitle}</span>

            {/* Desktop: pills + select */}
            <div className="hidden md:flex items-center gap-1 text-sm text-gray-500">
              <span className="mr-1">Duration:</span>
              {durations.map((d) => (
                <button
                  key={d}
                  onClick={() => onDurationChange(d)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${targetDuration === d ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  {d} min
                </button>
              ))}
              <select
                value={targetDuration}
                onChange={(e) => onDurationChange(Number(e.target.value))}
                className="ml-1 border border-gray-300 rounded-md text-sm px-2 py-1 text-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                aria-label="Select duration"
              >
                {[30, 45, 60, 75, 90, 120].map((d) => (
                  <option key={d} value={d}>
                    {d} min
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile: compact select (visible under md) */}
            <div className="md:hidden">
              <select
                value={targetDuration}
                onChange={(e) => onDurationChange(Number(e.target.value))}
                className="ml-2 border border-gray-300 rounded-md text-sm px-2 py-1 text-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                aria-label="Select duration"
              >
                {[30, 45, 60, 75, 90, 120].map((d) => (
                  <option key={d} value={d}>
                    {d} min
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right: Auto Adjust (hidden on very small screens) + responsive menu */}
          <div className="flex items-center gap-2">
            <button className="hidden sm:inline-flex px-4 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors" type="button">
              Auto Adjust Times
            </button>

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((s) => !s)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                aria-haspopup="true"
                aria-expanded={menuOpen}
                aria-label="Open menu"
                title="Menu"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-100 rounded-md shadow-lg z-50">
                  <div className="p-2">
                    <button
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center gap-2"
                      onClick={() => {
                        setMenuOpen(false);
                      }}
                    >
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" />
                      </svg>
                      Auto Adjust Times
                    </button>

                    <div className="mt-2 px-2">
                      <div className="text-xs text-gray-400 mb-1">Duration</div>
                      <div className="flex gap-2 flex-wrap">
                        {durations.map((d) => (
                          <button
                            key={d}
                            onClick={() => {
                              onDurationChange(d);
                              setMenuOpen(false);
                            }}
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${targetDuration === d ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                          >
                            {d} min
                          </button>
                        ))}
                        <select
                          value={targetDuration}
                          onChange={(e) => {
                            onDurationChange(Number(e.target.value));
                            setMenuOpen(false);
                          }}
                          className="border border-gray-300 rounded-md text-sm px-2 py-1 text-gray-600 focus:outline-none"
                          aria-label="Select duration mobile"
                        >
                          {[30, 45, 60, 75, 90, 120].map((d) => (
                            <option key={d} value={d}>
                              {d} min
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="border-t my-2" />

                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-50 rounded flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
