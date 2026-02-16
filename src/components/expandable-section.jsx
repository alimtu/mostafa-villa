"use client";

import { useState } from "react";

export function ExpandableSection({ section, sectionIndex }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shortAchievements = section.achievements.slice(0, 3);
  const hasMore = section.achievements.length > 3;

  return (
    <div className={sectionIndex > 0 ? "pt-4 border-t border-sky-200/50 dark:border-slate-700/50" : ""}>
      <p className="font-semibold text-sky-900 dark:text-white mb-1">
        {section.title}
      </p>
      <p className="text-xs text-sky-600 dark:text-sky-400 mb-3">
        {section.role}
      </p>
      <ul className="space-y-2">
        {(isExpanded ? section.achievements : shortAchievements).map((achievement, index) => (
          <li
            key={index}
            className="text-sm text-sky-700 dark:text-sky-300 leading-relaxed flex gap-2"
          >
            <span className="text-sky-400 dark:text-sky-500 mt-0.5">•</span>
            <span>{achievement}</span>
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 text-sm font-medium text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors flex items-center gap-1"
        >
          {isExpanded ? (
            <>
              Show Less
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </>
          ) : (
            <>
              Show More ({section.achievements.length - 3} more)
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </>
          )}
        </button>
      )}
    </div>
  );
}

