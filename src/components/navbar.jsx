"use client";

import { ThemeToggle } from "./theme-toggle";
import {
  User,
  FolderCode,
  Briefcase,
  Code2,
  Mail,
} from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 animate-[slideDown_0.5s_ease-out]">
      <div className="mx-auto max-w-4xl px-3 sm:px-6">
        <div className="mt-2 sm:mt-4 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 shadow-lg shadow-sky-900/5 dark:shadow-black/20">
          <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4">
            {/* Logo */}
            <a
              href="#"
              className="font-semibold text-sky-900 dark:text-sky-300 tracking-tight text-base sm:text-lg hover:text-sky-700 dark:hover:text-sky-200 transition-colors"
            >
              ALI
            </a>

            {/* Navigation Links */}
            <div className="flex items-center gap-0.5 sm:gap-1">
              <NavLink href="#profile" icon={<User className="w-4 h-4" />}>
                Profile
              </NavLink>
              <NavLink
                href="#projects"
                icon={<FolderCode className="w-4 h-4" />}
              >
                Projects
              </NavLink>
              <NavLink
                href="#experience"
                icon={<Briefcase className="w-4 h-4" />}
                hideOnMobile
              >
                Experience
              </NavLink>
              <NavLink href="#skills" icon={<Code2 className="w-4 h-4" />}>
                Skills
              </NavLink>
              <NavLink href="#contact" icon={<Mail className="w-4 h-4" />}>
                Contact
              </NavLink>
              
              {/* Theme Toggle */}
              <div className="ml-1.5 sm:ml-2 pl-1.5 sm:pl-2 border-l border-sky-200/50 dark:border-slate-600/50">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, icon, children, hideOnMobile }) {
  return (
    <a
      href={href}
      className={`flex items-center justify-center gap-2 p-2 sm:px-3 sm:py-2 text-sm font-medium text-sky-700 dark:text-sky-300 hover:text-sky-900 dark:hover:text-sky-100 hover:bg-sky-100/50 dark:hover:bg-slate-700/50 rounded-xl transition-all ${hideOnMobile ? 'hidden sm:flex' : ''}`}
    >
      <span className="text-sky-500 dark:text-sky-400">{icon}</span>
      <span className="hidden md:inline">{children}</span>
    </a>
  );
}
