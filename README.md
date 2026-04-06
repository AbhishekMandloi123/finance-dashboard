# Finance Dashboard UI

A modern, responsive fintech dashboard built with React, Vite, Tailwind CSS, Recharts, and Context API.

## Features

- Summary cards for total balance, total income, and total expenses
- Balance trend line chart and category spending donut chart
- Transactions table with search, filter, and sorting
- Role-based UI (Viewer/Admin)
- Admin actions: add, edit, delete transactions
- Insights cards:
	- Highest spending category
	- Total monthly expenses
	- Month-over-month increase/decrease
- Local storage persistence for transactions, role, and dark mode toggle
- Export transactions as JSON and CSV
- Responsive design for mobile and desktop
- Empty-state handling for transactions and charts

## Tech Stack

- React + Vite
- Tailwind CSS
- Recharts
- Context API

## Project Structure

src/
	components/
		SummaryCard.jsx
		ChartSection.jsx
		TransactionTable.jsx
		RoleSwitcher.jsx
		Insights.jsx
	pages/
		Dashboard.jsx
	context/
		AppContext.jsx
	data/
		mockData.js
	utils/
		helpers.js

## Getting Started

1. Install dependencies:

	 npm install

2. Start development server:

	 npm run dev

3. Open the app:

	 http://localhost:5173

## Build for Production

npm run build

## Notes

- All data is frontend-only and persisted in browser localStorage.
- To reset data, clear localStorage for this site in browser devtools.
