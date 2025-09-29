# 📊 StockPilot Web

StockPilot Web is the frontend for **StockPilot**, a modern product and stock management system.  
Built with **React, Redux Toolkit, Ant Design, TailwindCSS, and Axios**, this app provides a clean interface to manage products, categories, and stock efficiently.

---

## 🚀 Features

- 🔐 **Role-based access** – Admin (read/write) & Reader (read-only)
- 📦 **Product management** – Add, edit, delete, and view product details
- 🏷️ **Category management** – Organize products into categories
- 📊 **Stock tracking** – View available stock with status (`In Stock`, `Low Stock`, `Out of Stock`)
- 🔄 **Live updates** – Data refresh after CRUD operations
- 🎨 **Modern UI** – Built using Ant Design components with TailwindCSS styling
- 📑 **Pagination support** for large data sets
- 🔔 **User feedback** via notifications and error handling

---

## 🛠️ Tech Stack

**Frontend:**

- [React](https://react.dev/) – UI library
- [Redux Toolkit](https://redux-toolkit.js.org/) – State management
- [React Redux](https://react-redux.js.org/) – Store integration
- [Ant Design](https://ant.design/) – UI components
- [TailwindCSS](https://tailwindcss.com/) – Utility-first styling
- [Axios](https://axios-http.com/) – API calls

**Backend (StockPilot API):**

- Node.js
- Express.js
- MongoDB with Mongoose

---

## 📂 Project Structure

StockPilot-web/
│── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Page-level components
│ ├── utils/ # Helper functions
│ ├── redux/ # Redux slices (stockSlice, categorySlice, userSlice, etc.)
│ ├── App.js # Main app entry
│ └── index.js # React root
│
├── public/ # Static assets
├── package.json
└── README.md

---

## ⚙️ Installation & Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/2sagarraut2/StockPilot-web.git
   cd StockPilot-web

   ```

2. **Install dependencies**

   `npm install`

3. **Set environment variables**

   Create a .env file in the project root:
   `REACT_APP_API_URL=http://localhost:5555`

4. **Run the development server**

   `npm start`

5. **Build for production**

   `npm run build`

## 👨‍💻 Author

Developed by **Sagar Raut**
Inspired by real-world stock & inventory management challenges.
