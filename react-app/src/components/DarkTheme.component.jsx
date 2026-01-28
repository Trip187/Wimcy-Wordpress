import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const DarkTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load saved theme once
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.setAttribute("data-theme", "dark");
    } else {
      setIsDarkMode(false);
      document.body.setAttribute("data-theme", "light");
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    if (isDarkMode) {
      document.body.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.body.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <div className="theme-switcher">
      <Form>
        <Form.Check
          type="switch"
          id="theme-switch"
          label={isDarkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
          checked={isDarkMode}
          onChange={toggleTheme}
        />
      </Form>
    </div>
  );
};

export default DarkTheme;
