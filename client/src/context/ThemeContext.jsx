import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const savedTheme = localStorage.getItem("theme");

      if (savedTheme) {
        return savedTheme === "dark";
      }

      return window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const html = document.documentElement;

    html.classList.toggle("dark", darkMode);

    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const value = useMemo(
    () => ({
      darkMode,
      toggleTheme,
    }),
    [darkMode]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}