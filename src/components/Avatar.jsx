import React from "react";

export default function Avatar({ name, size = "w-10 h-10", textSize = "text-lg" }) {
  if (!name) return null;

  const initials = name
    .split(" ")
    .map((n) => n[0].toUpperCase())
    .slice(0, 2)
    .join("");

  const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500", "bg-pink-500"];
  const color = colors[name.charCodeAt(0) % colors.length];

  return (
    <div
      className={`${size} ${color} flex items-center justify-center rounded-full text-white font-semibold ${textSize}`}
    >
      {initials}
    </div>
  );
}
