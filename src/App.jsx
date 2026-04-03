import { useState } from "react"
import Navbar           from "./components/Shared/Navbar"
import RoleSwitcher     from "./components/Shared/RoleSwitcher"
import SummaryCards     from "./components/Dashboard/SummaryCards"
import TrendChart       from "./components/Dashboard/TrendChart"
import SpendingChart    from "./components/Dashboard/SpendingChart"
import TransactionTable from "./components/Transactions/TransactionTable"
import AddTransaction   from "./components/Transactions/AddTransaction"
import Insights         from "./components/Insights/Insights"

const tabs = ["Overview", "Transactions", "Insights"]

export default function App() {
  const [activeTab, setActiveTab] = useState("Overview")
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen transition-all duration-500 
        bg-gradient-to-br from-indigo-100 via-white to-purple-100
        dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">

        <Navbar />

        <div className="max-w-6xl mx-auto px-4 py-8">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                💰 Finance Dashboard
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Track your Income and Expenses effortlessly with a Smart Finance Dashboard
              </p>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white 
              hover:bg-indigo-700 transition-all shadow-md"
            >
              {darkMode ? "☀ Light" : "🌙 Dark"}
            </button>
          </div>

          {/* Role Switcher */}
          <div className="mb-6">
            <RoleSwitcher />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 bg-white/60 dark:bg-gray-800/60 
            backdrop-blur-md p-1 rounded-xl w-fit mb-6 shadow">

            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300
                  ${activeTab === tab
                    ? "bg-indigo-600 text-white shadow-md scale-105"
                    : "text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === "Overview" && (
            <div className="space-y-6">
              
              <div className="bg-white/70 dark:bg-gray-800/70 
                backdrop-blur-md p-4 rounded-xl shadow-lg">
                <SummaryCards />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/70 dark:bg-gray-800/70 
                  backdrop-blur-md p-4 rounded-xl shadow-lg hover:scale-[1.02] transition">
                  <TrendChart />
                </div>

                <div className="bg-white/70 dark:bg-gray-800/70 
                  backdrop-blur-md p-4 rounded-xl shadow-lg hover:scale-[1.02] transition">
                  <SpendingChart />
                </div>
              </div>

            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === "Transactions" && (
            <div className="space-y-6">

              <div className="bg-white/70 dark:bg-gray-800/70 
                backdrop-blur-md p-4 rounded-xl shadow-lg">
                <AddTransaction />
              </div>

              <div className="bg-white/70 dark:bg-gray-800/70 
                backdrop-blur-md p-4 rounded-xl shadow-lg">
                <TransactionTable />
              </div>

            </div>
          )}

          {/* Insights Tab */}
          {activeTab === "Insights" && (
            <div className="bg-white/70 dark:bg-gray-800/70 
              backdrop-blur-md p-4 rounded-xl shadow-lg">
              <Insights />
            </div>
          )}

        </div>
      </div>
    </div>
  )
}