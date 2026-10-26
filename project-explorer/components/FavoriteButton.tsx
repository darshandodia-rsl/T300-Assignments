"use client";

import { useState } from "react";

export default function FavoriteButton({ projectName }: { projectName: string }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <button
      className="favorite"
      aria-pressed={isFavorite}
      aria-label={`${isFavorite ? "Remove" : "Mark"} ${projectName} as favourite`}
      onClick={() => setIsFavorite(!isFavorite)}
    >
      {isFavorite ? "★ Favourite" : "☆ Favourite"}
    </button>
  );
}
