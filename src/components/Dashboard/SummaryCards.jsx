import { useApp } from "../../context/AppContext"

function Card({ label, amount, color }) {
  return (
    <div className={`rounded-xl p-5 text-white ${color}`}>
      <p className="text-sm opacity-80 mb-1">{label}</p>
      <p className="text-2xl font-semibold">
        ₹{amount.toLocaleString("en-IN")}
      </p>
    </div>
  )
}

export default function SummaryCards() {
  const { balance, totalIncome, totalExpenses } = useApp()
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <Card label="Net Balance"  amount={balance}        color="bg-indigo-600" />
      <Card label="Total Income"   amount={totalIncome}    color="bg-emerald-500" />
      <Card label="Total Expenses" amount={totalExpenses}  color="bg-rose-500" />
    </div>
  )
}