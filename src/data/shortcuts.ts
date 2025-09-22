export interface ShortcutGroup {
  title: string;
  shortcuts: Shortcut[];
}

export interface Shortcut {
  keys: string[];
  description: string;
  note?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Application {
  id: string;
  name: string;
  description: string;
  icon?: string; // Emoji fallback
  icon_url?: string; // Image URL
  categoryId: string;
  shortcuts: ShortcutGroup[];
}

export const categories: Category[] = [
  { id: "editor", name: "Editor", icon: "⚡", color: "hsl(210, 100%, 60%)" },
  { id: "browser", name: "Browser", icon: "🌐", color: "hsl(210, 100%, 55%)" },
  { id: "design", name: "Design", icon: "🎨", color: "hsl(270, 100%, 70%)" },
  { id: "os", name: "OS", icon: "🪟", color: "hsl(210, 100%, 50%)" },
  { id: "developer-tools", name: "Developer Tools", icon: "💻", color: "hsl(120, 100%, 50%)" },
  { id: "productivity", name: "Productivity", icon: "📊", color: "hsl(45, 100%, 60%)" },
  { id: "media", name: "Media", icon: "🎵", color: "hsl(300, 100%, 60%)" },
  { id: "communication", name: "Communication", icon: "💬", color: "hsl(200, 100%, 60%)" }
];

export const applications: Application[] = [
  {
    id: "vscode",
    name: "VS Code",
    description: "Visual Studio Code shortcuts for efficient coding",
    icon: "⚡",
    categoryId: "editor",
    shortcuts: [
      {
        title: "General",
        shortcuts: [
          { keys: ["Ctrl", "Shift", "P"], description: "Show Command Palette" },
          { keys: ["Ctrl", "P"], description: "Quick Open, Go to File" },
          { keys: ["Ctrl", "Shift", "N"], description: "New window/instance" },
          { keys: ["Ctrl", "Shift", "W"], description: "Close window/instance" },
          { keys: ["Ctrl", ","], description: "User Settings" },
          { keys: ["Ctrl", "K", "Ctrl", "S"], description: "Keyboard Shortcuts" },
        ]
      },
      {
        title: "Basic Editing",
        shortcuts: [
          { keys: ["Ctrl", "X"], description: "Cut line (empty selection)" },
          { keys: ["Ctrl", "C"], description: "Copy line (empty selection)" },
          { keys: ["Alt", "↑"], description: "Move line up" },
          { keys: ["Alt", "↓"], description: "Move line down" },
          { keys: ["Shift", "Alt", "↓"], description: "Copy line down" },
          { keys: ["Shift", "Alt", "↑"], description: "Copy line up" },
          { keys: ["Ctrl", "Shift", "K"], description: "Delete line" },
          { keys: ["Ctrl", "Enter"], description: "Insert line below" },
          { keys: ["Ctrl", "Shift", "Enter"], description: "Insert line above" },
          { keys: ["Ctrl", "Shift", "\\"], description: "Jump to matching bracket" },
        ]
      },
      {
        title: "Navigation",
        shortcuts: [
          { keys: ["Ctrl", "T"], description: "Show all Symbols" },
          { keys: ["Ctrl", "G"], description: "Go to Line" },
          { keys: ["Ctrl", "P"], description: "Go to File" },
          { keys: ["Ctrl", "Shift", "O"], description: "Go to Symbol" },
          { keys: ["Ctrl", "Shift", "M"], description: "Show Problems panel" },
          { keys: ["F8"], description: "Go to next error or warning" },
          { keys: ["Shift", "F8"], description: "Go to previous error or warning" },
        ]
      }
    ]
  },
  {
    id: "chrome",
    name: "Google Chrome",
    description: "Browser shortcuts for web development and browsing",
    icon: "🌐",
    categoryId: "browser",
    shortcuts: [
      {
        title: "Tab and Window Management",
        shortcuts: [
          { keys: ["Ctrl", "T"], description: "Open new tab" },
          { keys: ["Ctrl", "Shift", "T"], description: "Reopen recently closed tab" },
          { keys: ["Ctrl", "W"], description: "Close current tab" },
          { keys: ["Ctrl", "Shift", "W"], description: "Close current window" },
          { keys: ["Ctrl", "N"], description: "Open new window" },
          { keys: ["Ctrl", "Shift", "N"], description: "Open new incognito window" },
          { keys: ["Ctrl", "Tab"], description: "Switch to next tab" },
          { keys: ["Ctrl", "Shift", "Tab"], description: "Switch to previous tab" },
        ]
      },
      {
        title: "Developer Tools",
        shortcuts: [
          { keys: ["F12"], description: "Open Developer Tools" },
          { keys: ["Ctrl", "Shift", "I"], description: "Open Developer Tools" },
          { keys: ["Ctrl", "Shift", "J"], description: "Open Console" },
          { keys: ["Ctrl", "Shift", "C"], description: "Select element to inspect" },
          { keys: ["Ctrl", "Shift", "Delete"], description: "Open Clear Browsing Data" },
          { keys: ["Ctrl", "F5"], description: "Hard reload" },
          { keys: ["Ctrl", "Shift", "R"], description: "Hard reload" },
        ]
      }
    ]
  },
  {
    id: "figma",
    name: "Figma",
    description: "Design shortcuts for UI/UX designers",
    icon: "🎨",
    categoryId: "design",
    shortcuts: [
      {
        title: "Tools",
        shortcuts: [
          { keys: ["V"], description: "Move tool" },
          { keys: ["A"], description: "Frame tool" },
          { keys: ["R"], description: "Rectangle" },
          { keys: ["O"], description: "Ellipse" },
          { keys: ["L"], description: "Line" },
          { keys: ["Shift", "L"], description: "Arrow" },
          { keys: ["P"], description: "Pen" },
          { keys: ["T"], description: "Text" },
        ]
      },
      {
        title: "View",
        shortcuts: [
          { keys: ["Shift", "1"], description: "Zoom to fit" },
          { keys: ["Shift", "2"], description: "Zoom to selection" },
          { keys: ["Shift", "0"], description: "Zoom to 100%" },
          { keys: ["Ctrl", "+"], description: "Zoom in" },
          { keys: ["Ctrl", "-"], description: "Zoom out" },
          { keys: ["Shift", "R"], description: "Toggle rulers" },
        ]
      }
    ]
  },
  {
    id: "windows",
    name: "Windows 11",
    description: "System shortcuts for Windows operating system",
    icon: "🪟",
    categoryId: "os",
    shortcuts: [
      {
        title: "System",
        shortcuts: [
          { keys: ["Win"], description: "Open Start menu" },
          { keys: ["Win", "L"], description: "Lock your PC" },
          { keys: ["Win", "D"], description: "Display and hide the desktop" },
          { keys: ["Alt", "Tab"], description: "Switch between open apps" },
          { keys: ["Alt", "F4"], description: "Close the active item" },
          { keys: ["Win", "X"], description: "Open Quick Link menu" },
        ]
      },
      {
        title: "Window Management",
        shortcuts: [
          { keys: ["Win", "←"], description: "Snap window to left" },
          { keys: ["Win", "→"], description: "Snap window to right" },
          { keys: ["Win", "↑"], description: "Maximize window" },
          { keys: ["Win", "↓"], description: "Minimize window" },
          { keys: ["Win", "M"], description: "Minimize all windows" },
          { keys: ["Win", "Shift", "M"], description: "Restore minimized windows" },
        ]
      }
    ]
  },
  {
    id: "terminal",
    name: "Terminal",
    description: "Command line shortcuts for developers",
    icon: "💻",
    categoryId: "developer-tools",
    shortcuts: [
      {
        title: "Navigation",
        shortcuts: [
          { keys: ["Ctrl", "C"], description: "Cancel current command" },
          { keys: ["Ctrl", "D"], description: "Exit terminal" },
          { keys: ["Ctrl", "L"], description: "Clear screen" },
          { keys: ["Ctrl", "A"], description: "Go to beginning of line" },
          { keys: ["Ctrl", "E"], description: "Go to end of line" },
          { keys: ["Ctrl", "U"], description: "Clear line before cursor" },
          { keys: ["Ctrl", "K"], description: "Clear line after cursor" },
        ]
      },
      {
        title: "History",
        shortcuts: [
          { keys: ["↑"], description: "Previous command" },
          { keys: ["↓"], description: "Next command" },
          { keys: ["Ctrl", "R"], description: "Search command history" },
          { keys: ["!!"], description: "Run last command" },
          { keys: ["!n"], description: "Run command number n from history" },
        ]
      }
    ]
  }
];

// Helper function to get category by ID
export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(cat => cat.id === id);
};

// Helper function to get default icon for category
export const getDefaultIcon = (categoryId: string): string => {
  const category = getCategoryById(categoryId);
  return category?.icon || "📱";
};