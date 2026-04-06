# Finance Dashboard

A modern finance dashboard built with **React**, **Vite**, and **Tailwind CSS** featuring analytics, transactions, charts, and role-based UI.

## Features

- 📊 **Dashboard** – Overview with stat cards (Total Balance, Revenue, Expenses, Net Profit), sparkline chart, and recent transactions
- 💳 **Transactions** – Full transaction list with search, category/status filters, sortable columns, and admin-only delete
- 📈 **Charts** – Revenue vs Expenses bar chart, 12-month income trend line chart, and portfolio breakdown pie chart (powered by Recharts)
- ⚙️ **Settings** – Notification and preference controls with an admin-only user management panel
- 🔐 **Role-Based UI** – Toggle between **Admin** and **User** roles; admins unlock extra features like deleting transactions and managing users

## Tech Stack

| Tool | Purpose |
|---|---|
| [React 18](https://react.dev/) | UI framework |
| [Vite 5](https://vitejs.dev/) | Build tool |
| [Tailwind CSS 3](https://tailwindcss.com/) | Styling |
| [React Router 6](https://reactrouter.com/) | Client-side routing |
| [Recharts 2](https://recharts.org/) | Charts & data visualization |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
  App.jsx               # Root router and layout
  main.jsx              # Entry point
  index.css             # Global styles + Tailwind directives
  context/
    AuthContext.jsx     # Role management (Admin / User)
  data/
    mockData.js         # Mock transactions & chart data
  components/
    layout/
      Sidebar.jsx       # Navigation sidebar
      Header.jsx        # Top header with role switcher
      Layout.jsx        # Page wrapper
    ui/
      StatCard.jsx      # Reusable stat card component
      Badge.jsx         # Status / category badge
  pages/
    Dashboard.jsx       # Analytics overview
    Transactions.jsx    # Transaction table with filters
    Charts.jsx          # Data visualisation charts
    Settings.jsx        # App settings + admin panel
```