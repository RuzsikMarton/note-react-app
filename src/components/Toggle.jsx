import React from "react";
import { LuMoon, LuSun } from "react-icons/lu";

const Toggle = ({theme, setTheme}) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <span className="ms-3 text-sm font-medium">
        <LuSun className="inline me-3" />
      </span>
      <input type="checkbox" value="" class="sr-only peer"  checked={theme === "dark"}
        onChange={() => setTheme(theme === "dark" ? "" : "dark")}
        className="sr-only peer"/>
      <div className="relative w-11 h-6 bg-gray-400 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-400 dark:peer-focus:ring-gray-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600 dark:peer-checked:bg-blue-700"></div>
      <span className="ms-3 text-sm font-medium">
        <LuMoon className="inline me-2" />
      </span>
    </label>
  );
};

export default Toggle;
