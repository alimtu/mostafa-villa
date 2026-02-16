"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from "recharts";
import { TrendingUp, Code, FolderOpen, Layers } from "lucide-react";

const COLORS = {
  primary: "#0284c7",
  secondary: "#0ea5e9",
  accent: "#38bdf8",
  success: "#10b981",
  warning: "#f59e0b",
};

export function StatisticsDashboard() {
  // Years of Experience Data
  const experienceData = [
    { year: "2019", value: 1 },
    { year: "2020", value: 2 },
    { year: "2021", value: 3 },
    { year: "2022", value: 4 },
    { year: "2023", value: 5 },
    { year: "2024", value: 6 },
    { year: "2025", value: 7 },
  ];

  // Projects Completed by Year
  const projectsData = [
    { year: "2019", projects: 1 },
    { year: "2022", projects: 2 },
    { year: "2023", projects: 3 },
    { year: "2024", projects: 1 },
    { year: "2025", projects: 2 },
    { year: "2026", projects: 0 },
  ];

  // Technologies Mastered Distribution
  const technologiesData = [
    { name: "Front-End", value: 35, count: 7 },
    { name: "Backend", value: 25, count: 5 },
    { name: "Mobile", value: 20, count: 5 },
    { name: "AI/ML", value: 15, count: 9 },
    { name: "Tools", value: 5, count: 4 },
  ];

  // Lines of Code Over Time (estimated)
  const codeData = [
    { month: "Jan", lines: 15000 },
    { month: "Feb", lines: 18000 },
    { month: "Mar", lines: 16000 },
    { month: "Apr", lines: 25000 },
    { month: "May", lines: 12000 },
    { month: "Jun", lines: 35000 },
    { month: "Jul", lines: 12000 },
    { month: "Aug", lines: 45000 },
    { month: "Sep", lines: 30000 },
    { month: "Oct", lines: 20000 },
    { month: "Nov", lines: 50000 },
    { month: "Dec", lines: 65000 },
  ];

  const stats = [
    { label: "Years of Experience", value: "7+", icon: TrendingUp, color: COLORS.primary },
    { label: "Projects Completed", value: "9+", icon: FolderOpen, color: COLORS.success },
    { label: "Lines of Code", value: "2.4M+", icon: Code, color: COLORS.warning },
    { label: "Technologies", value: "30+", icon: Layers, color: COLORS.secondary },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/80 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center`} style={{ backgroundColor: `${stat.color}20` }}>
                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
              </div>
              <p className="text-3xl font-bold text-sky-900 dark:text-white mb-1">{stat.value}</p>
              <p className="text-sm text-sky-600 dark:text-sky-400">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Years of Experience Chart */}
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/80 dark:border-slate-700/80 shadow-sm">
          <h3 className="text-lg font-semibold text-sky-900 dark:text-white mb-4">Years of Experience</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={experienceData}>
              <defs>
                <linearGradient id="colorExperience" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" className="dark:stroke-slate-700" />
              <XAxis dataKey="year" stroke="#64748b" className="dark:stroke-slate-400" />
              <YAxis stroke="#64748b" className="dark:stroke-slate-400" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
                className="dark:bg-slate-800 dark:border-slate-700"
              />
              <Area type="monotone" dataKey="value" stroke={COLORS.primary} fillOpacity={1} fill="url(#colorExperience)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Projects Completed Chart */}
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/80 dark:border-slate-700/80 shadow-sm">
          <h3 className="text-lg font-semibold text-sky-900 dark:text-white mb-4">Projects Completed</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={projectsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" className="dark:stroke-slate-700" />
              <XAxis dataKey="year" stroke="#64748b" className="dark:stroke-slate-400" />
              <YAxis stroke="#64748b" className="dark:stroke-slate-400" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
                className="dark:bg-slate-800 dark:border-slate-700"
              />
              <Bar dataKey="projects" fill={COLORS.success} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Technologies Distribution */}
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/80 dark:border-slate-700/80 shadow-sm">
          <h3 className="text-lg font-semibold text-sky-900 dark:text-white mb-4">Technologies Mastered</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={technologiesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, count }) => `${name}: ${count}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {technologiesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={[COLORS.primary, COLORS.secondary, COLORS.accent, COLORS.success, COLORS.warning][index]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
                className="dark:bg-slate-800 dark:border-slate-700"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Lines of Code Over Time */}
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/80 dark:border-slate-700/80 shadow-sm">
          <h3 className="text-lg font-semibold text-sky-900 dark:text-white mb-4">Lines of Code (2025)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={codeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" className="dark:stroke-slate-700" />
              <XAxis dataKey="month" stroke="#64748b" className="dark:stroke-slate-400" />
              <YAxis stroke="#64748b" className="dark:stroke-slate-400" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
                className="dark:bg-slate-800 dark:border-slate-700"
                formatter={(value) => `${value.toLocaleString()} lines`}
              />
              <Line type="monotone" dataKey="lines" stroke={COLORS.warning} strokeWidth={3} dot={{ fill: COLORS.warning, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

