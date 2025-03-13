import { useState } from "react";

function ThemeChanger() {
  const [currentTheme, setCurrentTheme] = useState("light");

  const themes = [
    "light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
    "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden",
    "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black",
    "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade",
    "night", "coffee", "winter", "dim", "nord", "sunset", "caramellatte",
    "abyss", "silk",
  ];

  const handleChange = (e) => {
    const selectedTheme = e.target.value;
    setCurrentTheme(selectedTheme);
    document.documentElement.setAttribute("data-theme", selectedTheme);
  };

  return (
    <div>
      <select
        className="select select-bordered w-full max-w-xs"
        value={currentTheme}
        onChange={handleChange}
      >
        <option disabled value="">
          Pick a theme
        </option>
        {themes.map((theme) => (
          <option key={theme} value={theme}>
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ThemeChanger;
