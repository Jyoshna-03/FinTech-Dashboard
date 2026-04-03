# Finance Dashboard

A clean and interactive finance dashboard built with React and Tailwind CSS.

## Tech Stack

- React + Vite
- Tailwind CSS
- Recharts
- React Context API

## Features

- Summary cards showing balance, income, and expenses
- Line chart for monthly income vs expense trend
- Pie chart for spending breakdown by category
- Transactions table with search, filter, and sort
<<<<<<< HEAD
- Role-based UI — Viewer and Admin roles
=======
- Role-based UI for both Viewer and Admin roles
>>>>>>> 9d6bc8a4603cbad256f9be565f37eca66ecdf3b6
- Admin can add new transactions
- Insights section with spending analysis
- Responsive design for mobile and desktop
- Clean tab-based navigation

## Role Based UI

Use the role switcher to toggle between:
- **Viewer** — can only view data
- **Admin** — can add new transactions

## Setup Instructions

1. Clone the repository
<<<<<<< HEAD
   git clone https://github.com/Jyoshna-03/finance-dashboard.git
=======
   git clone https://github.com/Jyoshna-03/finance-dashboard.git
>>>>>>> 9d6bc8a4603cbad256f9be565f37eca66ecdf3b6

2. Navigate into the folder
   cd finance-dashboard

3. Install dependencies
   npm install

4. Start the development server
   npm run dev

5. Open your browser at
   http://localhost:5173

## Project Structure

src/
  components/
    Dashboard/       → Summary cards and charts
    Transactions/    → Table and add transaction form
    Insights/        → Spending insight cards
    Shared/          → Navbar and role switcher
  context/           → Global state via React Context
  data/              → Mock transaction data

## Assumptions

<<<<<<< HEAD
- All data is mock/static — no backend required
- Role switching is simulated on the frontend
- Data resets on page refresh (no persistence)
=======
- All data is mock/static no backend required
- Role switching is simulated on the frontend
- Data resets on page refresh (no persistence)
>>>>>>> 9d6bc8a4603cbad256f9be565f37eca66ecdf3b6
