import { useState } from "react"
import { useApp } from "../../context/AppContext"

const emptyForm = {
  description: "",
  amount: "",
  category: "",
  type: "expense",
  date: new Date().toISOString().split("T")[0]
}

export default function AddTransaction() {
  const { role, addTransaction } = useApp()
  const [form, setForm]         = useState(emptyForm)
  const [success, setSuccess]   = useState(false)

  if (role !== "admin") return null

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = () => {
    if (!form.description || !form.amount || !form.category) return

    addTransaction({
      ...form,
      amount: form.type === "expense"
        ? -Math.abs(Number(form.amount))
        :  Math.abs(Number(form.amount))
    })

    setForm(emptyForm)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 2500)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
      <h2 className="text-base font-semibold text-gray-700 mb-4">
        Add Transaction
        <span className="ml-2 text-xs bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full">
          Admin only
        </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <input
          name="amount"
          type="number"
          placeholder="Amount (₹)"
          value={form.amount}
          onChange={handleChange}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          Add Transaction
        </button>
        {success && (
          <span className="text-emerald-500 text-sm font-medium">
            ✓ Transaction added!
          </span>
        )}
      </div>
    </div>
  )
}