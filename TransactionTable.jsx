import { useState } from "react"
import { useApp } from "../../context/AppContext"

export default function TransactionTable() {
  const {
    filteredTransactions,
    search, setSearch,
    filterCategory, setFilterCategory,
    filterType, setFilterType,
    categories
  } = useApp()

  const [sortField, setSortField] = useState("date")
  const [sortDir, setSortDir]     = useState("desc")

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(d => d === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDir("desc")
    }
  }

  const sorted = [...filteredTransactions].sort((a, b) => {
    let valA = a[sortField]
    let valB = b[sortField]
    if (sortField === "amount") {
      valA = Math.abs(valA)
      valB = Math.abs(valB)
    }
    if (valA < valB) return sortDir === "asc" ? -1 : 1
    if (valA > valB) return sortDir === "asc" ?  1 : -1
    return 0
  })

  const arrow = (field) => sortField === field ? (sortDir === "asc" ? " ↑" : " ↓") : ""

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
      <h2 className="text-base font-semibold text-gray-700 mb-4">Transactions</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <select
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          <option>All</option>
          <option>income</option>
          <option>expense</option>
        </select>
      </div>

      {/* Table */}
      {sorted.length === 0 ? (
        <div className="text-center py-12 text-gray-400 text-sm">
          No transactions found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="pb-3 pr-4 font-medium cursor-pointer hover:text-indigo-500"
                    onClick={() => handleSort("date")}>
                  Date{arrow("date")}
                </th>
                <th className="pb-3 pr-4 font-medium cursor-pointer hover:text-indigo-500"
                    onClick={() => handleSort("description")}>
                  Description{arrow("description")}
                </th>
                <th className="pb-3 pr-4 font-medium">Category</th>
                <th className="pb-3 pr-4 font-medium cursor-pointer hover:text-indigo-500"
                    onClick={() => handleSort("amount")}>
                  Amount{arrow("amount")}
                </th>
                <th className="pb-3 font-medium">Type</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map(t => (
                <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 pr-4 text-gray-500">{t.date}</td>
                  <td className="py-3 pr-4 text-gray-700 font-medium">{t.description}</td>
                  <td className="py-3 pr-4">
                    <span className="bg-indigo-50 text-indigo-600 text-xs px-2 py-1 rounded-full">
                      {t.category}
                    </span>
                  </td>
                  <td className={`py-3 pr-4 font-semibold ${t.type === "income" ? "text-emerald-500" : "text-rose-500"}`}>
                    {t.type === "income" ? "+" : "-"}₹{Math.abs(t.amount).toLocaleString("en-IN")}
                  </td>
                  <td className="py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium
                      ${t.type === "income"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-rose-50 text-rose-500"}`}>
                      {t.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}