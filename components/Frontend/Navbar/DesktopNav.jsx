"use client";

import { motion } from "framer-motion";
import NavItem from "./NavItem";
import UserMenu from "./UserMenu";
import SearchBar from "./SearchBar";
import NotificationBell from "./NotificationBell";
import Link from "next/link";
import Image from "next/image";

import mainLogo from "@/assets/images/logo/main-logo.png";


export default function DesktopNav({ notifications, onSearch, onLogin, onLogout, currentPath, isScrolled, shouldReduceMotion }) {

  const navItems = [
    { href: "/jobs", label: "Jobs", icon: "💼" },
    { href: "/companies", label: "Companies", icon: "🏢" },
    { href: "/salaries", label: "Salaries", icon: "💰" },
  ];

  return (
    <motion.nav
      initial={false}
      animate={{
        backgroundColor: isScrolled ? "rgba(65, 82, 156, 0.95)" : "#41529c",
        backdropFilter: isScrolled ? "blur(10px)" : "none",
        boxShadow: isScrolled ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" : "none",
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.3,
        ease: "easeOut",
      }}
      className="sticky top-0 z-50 border-b border-primary/20 dark:border-primary/30"
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }} className="shrink-0">
            <div className="p-2 bg-white rounded-lg">
              <Link href="/" className="transition-colors ">
                <Image src={mainLogo} alt="Logo" width={100} height={100} />
              </Link>
            </div>
          </motion.div>

          {/* Navigation Items */}
          <div className="items-center hidden space-x-8 md:flex">
            {navItems.map((item) => (
              <NavItem key={item.href} href={item.href} label={item.label} icon={item.icon} isActive={currentPath?.startsWith(item.href)} shouldReduceMotion={shouldReduceMotion} />
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <SearchBar onSearch={onSearch} />

            {/* Notifications */}
            <NotificationBell count={notifications} />

            {/* User Menu */}
            <UserMenu onLogin={onLogin} shouldReduceMotion={shouldReduceMotion} />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
