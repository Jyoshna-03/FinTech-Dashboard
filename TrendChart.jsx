import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { monthlyTrend } from "../../data/transactions"

export default function TrendChart() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
      <h2 className="text-base font-semibold text-gray-700 mb-4">Monthly Trend</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={monthlyTrend}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
          <Tooltip formatter={v => `₹${v.toLocaleString("en-IN")}`} />
          <Legend />
          <Line type="monotone" dataKey="income"   stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}