import { createContext, useState } from "react";

const AppContext = createContext({
  darkTheme: false,
  showWelcome: true,
});

export function AppProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const toggleTheme = () => {
    setDarkTheme((prev) => !prev);
  };

  const hideWelcome = () => {
    setShowWelcome(false);
  };

  return (
    <AppContext.Provider
      value={{ darkTheme, showWelcome, toggleTheme, hideWelcome }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
