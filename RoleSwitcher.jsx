import { useApp } from "../../context/AppContext"

export default function RoleSwitcher() {
  const { role, setRole } = useApp()
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-sm text-gray-500 font-medium">Role:</span>
      {["viewer", "admin"].map(r => (
        <button
          key={r}
          onClick={() => setRole(r)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all
            ${role === r
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white text-gray-600 border-gray-300 hover:border-indigo-400"
            }`}
        >
          {r.charAt(0).toUpperCase() + r.slice(1)}
        </button>
      ))}
      <span className={`text-xs px-2 py-1 rounded-full font-medium
        ${role === "admin" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
        {role === "admin" ? "Can edit transactions" : "View only"}
      </span>
    </div>
  )
}