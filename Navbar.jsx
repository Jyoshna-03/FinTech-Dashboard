import { useApp } from "../../context/AppContext"

export default function Navbar() {
  const { role } = useApp()
  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
          <span className="text-white text-xs font-bold">₹</span>
        </div>
        <span className="font-semibold text-gray-800 text-sm">Finance Dashboard</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-400 hidden sm:block">Logged in as</span>
        <span className={`text-xs font-medium px-3 py-1 rounded-full
          ${role === "admin"
            ? "bg-emerald-100 text-emerald-700"
            : "bg-gray-100 text-gray-500"}`}>
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </span>
      </div>
    </nav>
  )
}