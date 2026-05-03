# ChronoHub ⌚ — Watch Store

A full-featured ecommerce website for selling watches built with React,
Redux Toolkit, Material UI, and Tailwind CSS.

## 🔗 Live Demo

[View Live on Vercel](https://chronohub-watch-store.vercel.app)

## 🛠️ Tech Stack

- **React 18** — Frontend framework
- **Redux Toolkit** — State management (cart, auth, filters)
- **Material UI v5** — UI components
- **Tailwind CSS v3** — Utility styling
- **React Router v6** — Page routing
- **Vite** — Build tool

## ✨ Features

- 🏠 Homepage with Hero section and featured products
- 🛍️ Shop page with filters, sorting, and search
- 📦 Product detail page with related products
- 🛒 Cart with drawer and full cart page
- 💳 Checkout with 3-step flow (Delivery, Payment, Confirmation)
- 🔐 Login and Register pages
- 📊 Admin Dashboard with orders and product management
- 📱 Fully responsive mobile design
- 🇵🇰 Pakistan payment methods — COD, JazzCash, EasyPaisa

## 🚀 Run Locally

### 1. Clone the repo

git clone https://github.com/YOUR_USERNAME/chronohub-watch-store.git

### 2. Install dependencies

cd chronohub-watch-store
npm install

### 3. Start development server

npm run dev

### 4. Open in browser

http://localhost:5173

## 📁 Project Structure

src/
├── components/
│ ├── common/
│ ├── layout/ # Navbar, Footer, CartDrawer, AdminLayout
│ └── watch/ # WatchCard, Hero, Categories, FilterPanel
├── pages/
│ ├── Home, Shop, ProductDetail, Cart, Checkout
│ ├── Login, Register
│ └── admin/ # Dashboard, Products, Orders
├── store/
│ └── slices/ # cartSlice, authSlice, productSlice, uiSlice
├── data/ # products.js
└── routes/ # AppRouter.jsx

## 📸 Screenshots

Coming soon

## 📄 License

MIT License
