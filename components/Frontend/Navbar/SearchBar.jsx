"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function SearchBar({
  onSearch,
  isMobile = false,
  shouldReduceMotion,
}) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <motion.form
      initial={false}
      onSubmit={handleSubmit}
      className={`relative ${isMobile ? "w-full" : "w-64"}`}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search jobs..."
          className="w-full py-2 pl-10 pr-4 bg-white border rounded-lg text-foreground placeholder-muted-foreground border-border dark:bg-card dark:text-foreground dark:placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          aria-label="Search jobs"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <span className="text-gray-400">🔍</span>
        </div>
      </div>
    </motion.form>
  );
}
