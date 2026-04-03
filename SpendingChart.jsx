import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useApp } from "../../context/AppContext"

const COLORS = ["#6366f1","#10b981","#f43f5e","#f59e0b","#3b82f6","#ec4899","#14b8a6"]

export default function SpendingChart() {
  const { transactions } = useApp()

  const data = Object.entries(
    transactions
      .filter(t => t.type === "expense")
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount)
        return acc
      }, {})
  ).map(([name, value]) => ({ name, value }))

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
      <h2 className="text-base font-semibold text-gray-700 mb-4">Spending by Category</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip formatter={v => `₹${v.toLocaleString("en-IN")}`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}