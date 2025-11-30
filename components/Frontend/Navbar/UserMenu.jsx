"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function UserMenu({ user = {}, onLogin, shouldReduceMotion }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const { data: session } = useSession();
  const currentUser = session?.user;
  console.log(currentUser);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!currentUser?.isLoggedIn) {
    return (
      <Link href="/signup" className="cursor-pointer">
      <motion.button whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }} whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors min-h-[44px] text-sm font-medium cursor-pointer">
        Sign In
      </motion.button>
      </Link>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <motion.button
        whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
        whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors min-h-[44px] min-w-[44px]"
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <div className="w-8 h-8 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
          {user?.avatar ? <Image src={user.avatar} alt={user?.name || "User avatar"} width={32} height={32} className="object-cover" /> : <div className="flex items-center justify-center w-full h-full text-sm">👤</div>}
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.2,
              ease: "easeOut",
            }}
            className="absolute right-0 z-50 w-48 py-1 mt-2 bg-white border border-gray-200 rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || "User"}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email || "user@example.com"}</p>
            </div>

            <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 transition-colors dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              Profile
            </a>
            <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 transition-colors dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              Settings
            </a>
            <button
              onClick={() => {
                signOut();
                setIsOpen(false);
              }}
              className="block w-full px-4 py-2 text-sm text-left text-red-600 transition-colors dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
