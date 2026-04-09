import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  // 🌙 Dark Mode
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  // 💾 Transactions
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [editIndex, setEditIndex] = useState(null);

  // 🔔 Toast
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  // ➕ ADD
  const addTransaction = (data) => {
    setTransactions([...transactions, data]);
    showToast("✅ Transaction Added");
  };

  // ❌ DELETE
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
    showToast("🗑️ Transaction Deleted");
  };

  // ✏️ EDIT
  const editTransaction = (id, updatedData) => {
    const updated = transactions.map((t) =>
      t.id === id ? updatedData : t
    );
    setTransactions(updated);
    setEditIndex(null);
    showToast("✏️ Transaction Updated");
  };

  // 📊 CALCULATIONS
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount || 0), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount || 0), 0);

  const balance = income - expense;

  // 🔐 AUTH
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [showSignup, setShowSignup] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("transactions");
    setIsLoggedIn(false);
  };

  // 💾 SAVE DATA
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // 🌙 DARK MODE APPLY
  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const exportToCSV = () => {
  if (transactions.length === 0) {
    alert("No data to export");
    return;
  }

  const headers = ["Description", "Amount", "Type", "Category", "Date"];

  const rows = transactions.map((t) => [
    t.text,
    t.amount,
    t.type,
    t.category,
    new Date(t.date).toLocaleString(),
  ]);

  const csvContent =
    [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "transactions.csv";
  link.click();
  showToast("📁 CSV Downloaded");
};

  return (
    <div>
      {!isLoggedIn ? (
        showSignup ? (
          <>
            <Signup onSignup={() => setShowSignup(false)} />
            <p onClick={() => setShowSignup(false)} className="link-text">
              Go to Login
            </p>
          </>
        ) : (
          <>
            <Login onLogin={() => setIsLoggedIn(true)} />
            <p onClick={() => setShowSignup(true)} className="link-text">
              Create Account
            </p>
          </>
        )
      ) : (
        <>
          <Navbar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            onLogout={handleLogout}
            onExport={exportToCSV} 
          />

          <Dashboard
            transactions={transactions}
            onAdd={addTransaction}
            onDelete={deleteTransaction}
            onEdit={editTransaction}
            setEditIndex={setEditIndex}
            editIndex={editIndex}
            income={income}
            expense={expense}
            balance={balance}
            showToast={showToast}
          />

          {/* 🔔 TOAST UI */}
          {toast && <div className="toast">{toast}</div>}
        </>
      )}
    </div>
  );
}

export default App;