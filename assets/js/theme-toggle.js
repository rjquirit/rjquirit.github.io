document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const moonIcon = document.getElementById("moon-icon");
  const sunIcon = document.getElementById("sun-icon");
  const currentTheme = localStorage.getItem("theme") || "light";

  // Set the initial theme
  document.documentElement.setAttribute("data-theme", currentTheme);
  themeToggle.checked = currentTheme === "dark";
  updateIcons(currentTheme);

  // Add event listener for theme toggle
  themeToggle.addEventListener("change", () => {
    const theme = themeToggle.checked ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    updateIcons(theme);
  });

  // Function to update icons
  function updateIcons(theme) {
    if (theme === "dark") {
      moonIcon.style.display = "none";
      sunIcon.style.display = "inline";
    } else {
      moonIcon.style.display = "inline";
      sunIcon.style.display = "none";
    }
  }
});