"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NavItem({
  href,
  label,
  icon,
  isActive = false,
  isMobile = false,
  shouldReduceMotion,
}) {
  const baseClasses = isMobile
    ? "flex flex-col items-center justify-center p-2 rounded-lg transition-colors min-h-[44px] min-w-[44px]"
    : "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors min-h-[44px]";

  const activeClasses = isActive
    ? "bg-primary/20 dark:bg-primary/30 text-primary dark:text-secondary"
    : "text-white/90 hover:bg-white/10 hover:text-white";

  const content = (
    <>
      <span className="text-lg">{icon}</span>
      {isMobile && <span className="mt-1 text-xs">{label}</span>}
      {!isMobile && <span className="ml-2">{label}</span>}
    </>
  );

  if (shouldReduceMotion) {
    return (
      <Link
        href={href}
        className={`${baseClasses} ${activeClasses}`}
        aria-current={isActive ? "page" : undefined}>
        {content}
      </Link>
    );
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link
        href={href}
        className={`${baseClasses} ${activeClasses}`}
        aria-current={isActive ? "page" : undefined}>
        {content}
      </Link>
    </motion.div>
  );
}
