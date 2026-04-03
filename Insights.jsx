import { useApp } from "../../context/AppContext"

function InsightCard({ label, value, sub, color }) {
  return (
    <div className={`rounded-xl p-5 border ${color}`}>
      <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-xl font-semibold text-gray-800">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  )
}

export default function Insights() {
  const { transactions } = useApp()

  const expenses = transactions.filter(t => t.type === "expense")

  // Highest spending category
  const categoryTotals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount)
    return acc
  }, {})
  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]

  // Average daily expense
  const totalExpenses = expenses.reduce((s, t) => s + Math.abs(t.amount), 0)
  const avgDaily = Math.round(totalExpenses / 30)

  // Most frequent category
  const categoryCount = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + 1
    return acc
  }, {})
  const mostFrequent = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]

  // Savings rate
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((s, t) => s + t.amount, 0)
  const savingsRate = Math.round(((totalIncome - totalExpenses) / totalIncome) * 100)

  return (
    <div className="mb-6">
      <h2 className="text-base font-semibold text-gray-700 mb-4">Insights</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <InsightCard
          label="Top Spending Category"
          value={topCategory?.[0] || "—"}
          sub={`₹${topCategory?.[1].toLocaleString("en-IN")} spent`}
          color="border-rose-100 bg-rose-50"
        />
        <InsightCard
          label="Avg Daily Expense"
          value={`₹${avgDaily.toLocaleString("en-IN")}`}
          sub="Based on this month"
          color="border-amber-100 bg-amber-50"
        />
        <InsightCard
          label="Most Frequent Category"
          value={mostFrequent?.[0] || "—"}
          sub={`${mostFrequent?.[1]} transactions`}
          color="border-indigo-100 bg-indigo-50"
        />
        <InsightCard
          label="Savings Rate"
          value={`${savingsRate}%`}
          sub={savingsRate > 20 ? "Great job!" : "Try to save more"}
          color="border-emerald-100 bg-emerald-50"
        />
      </div>
    </div>
  )
}