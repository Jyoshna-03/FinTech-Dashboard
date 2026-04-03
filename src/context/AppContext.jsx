import { createContext, useContext, useState } from "react"
import { transactions as initialData } from "../data/transactions"

const AppContext = createContext()

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState(initialData)
  const [role, setRole] = useState("viewer")
  const [search, setSearch] = useState("")
  const [filterCategory, setFilterCategory] = useState("All")
  const [filterType, setFilterType] = useState("All")

  const totalIncome   = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0)
  const totalExpenses = transactions.filter(t => t.type === "expense").reduce((s, t) => s + Math.abs(t.amount), 0)
  const balance       = totalIncome - totalExpenses

  const addTransaction = (tx) => {
    setTransactions(prev => [...prev, { ...tx, id: Date.now() }])
  }

  const categories = ["All", ...new Set(transactions.map(t => t.category))]

  const filteredTransactions = transactions.filter(t => {
    const matchSearch   = t.description.toLowerCase().includes(search.toLowerCase())
    const matchCategory = filterCategory === "All" || t.category === filterCategory
    const matchType     = filterType === "All" || t.type === filterType
    return matchSearch && matchCategory && matchType
  })

  return (
    <AppContext.Provider value={{
      transactions, filteredTransactions, addTransaction,
      role, setRole,
      search, setSearch,
      filterCategory, setFilterCategory,
      filterType, setFilterType,
      categories,
      totalIncome, totalExpenses, balance
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)