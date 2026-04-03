# FinVista - Finance Dashboard UI

A clean and interactive finance dashboard built with React and JavaScript.

## Features

- **Dashboard Overview**: Summary cards for Balance, Income, and Expenses.
- **Visualizations**: 
  - Balance Trend Area Chart using Recharts.
  - Spending Breakdown Doughnut Chart.
- **Transaction Management**: 
  - List view with sorting and advanced filtering.
  - Search functionality.
  - Admin actions (Add/Delete) simulate RBAC.
- **Role-Based Access**: 
  - **Admin**: Full access to add and delete transactions.
  - **Viewer**: Read-only access to dashboard data.
- **Insights Section**: Smart insights based on spending habits and monthly comparisons.
- **Dark Mode**: Toggle between light and dark themes with persistent storage.
- **Responsive Design**: Fluid layout that adapts to mobile, tablet, and desktop screens.
- **Data Persistence**: Uses Local Storage to persist transactions and theme preferences.

## Tech Stack

- **React** (Vite)
- **Lucide React** (Icons)
- **Recharts** (Data Visualization)
- **Framer Motion** (Animations)
- **Vanilla CSS** (Custom Styling & Design System)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`.
