import { useState } from "react";
import AddTransaction from "../components/AddTransaction";
import Balance from "../components/Balance";
import TransactionList from "../components/TransactionList";
import ChartComponent from "../components/Chart";

function Dashboard({
  transactions,
  onAdd,
  onDelete,
  onEdit,
  setEditIndex,
  editIndex,
  income,
  expense,
  balance,
  showToast, // ✅ IMPORTANT
}) {
  // 🔍 Search & Filters
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  // ✅ Filter Logic
  const filteredTransactions = transactions.filter((t) => {
    const matchSearch = t.text
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchType =
      filterType === "all" || t.type === filterType;

    const matchCategory =
      filterCategory === "all" || t.category === filterCategory;

    return matchSearch && matchType && matchCategory;
  });

  // 📁 FILE UPLOAD
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target.result;

      const lines = text.split("\n");

      const newTransactions = lines
        .filter((line) => line.trim() !== "") // ✅ remove empty lines
        .map((line) => {
          const [text, amount, type, category, date] =
            line.split(",");

          return {
            id: Date.now() + Math.random(),
            text: text?.trim(),
            amount: Number(amount),
            type: type?.trim(),
            category: category?.trim(),
            date: date || new Date().toISOString(),
          };
        });

      newTransactions.forEach((t) => onAdd(t));

      showToast && showToast("📁 File Imported Successfully"); // ✅ safe call
    };

    reader.readAsText(file);
  };

  return (
    <div style={{ padding: "20px" }}>
      
      {/* ➕ ADD TRANSACTION */}
      <AddTransaction
        onAdd={onAdd}
        onEdit={onEdit}
        editIndex={editIndex}
        transactions={transactions}
        setEditIndex={setEditIndex}
      />

      {/* 💰 BALANCE */}
      <Balance
        balance={balance}
        income={income}
        expense={expense}
      />

      {/* 📊 CHART */}
      <ChartComponent income={income} expense={expense} />

      {/* 🔍 SEARCH + FILTER */}
      <div style={{ margin: "20px" }}>
        <input
          type="text"
          placeholder="Search description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{ marginRight: "10px" }}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="Salary">Salary</option>
          <option value="Food">Food</option>
          <option value="Rent">Rent</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      {/* 📁 FILE UPLOAD */}
      <div style={{ margin: "20px 0" }}>
        <label>
          📁 Import CSV:
          <input
            type="file"
            accept=".txt,.csv"
            onChange={handleFileUpload}
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>

      {/* 📋 TRANSACTION LIST */}
      <TransactionList
        transactions={filteredTransactions}
        onDelete={onDelete}
        setEditIndex={setEditIndex}
      />
    </div>
  );
}

export default Dashboard;