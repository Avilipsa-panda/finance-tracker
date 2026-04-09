import { useState, useEffect, useRef } from "react";

const AddTransaction = ({
  onAdd,
  onEdit,
  editIndex,
  transactions,
  setEditIndex,
}) => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("Salary");
  const [customCategory, setCustomCategory] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({});

  const formRef = useRef(null);
  const textRef = useRef(null);

  // ✅ useEffect
  useEffect(() => {
    if (editIndex !== null && transactions) {
      const t = transactions.find((item) => item.id === editIndex);

      if (t) {
        setText(t.text || "");
        setAmount(t.amount || "");
        setType(t.type || "income");
        setCategory(t.category || "Salary");
        setDate(t.date || "");

        formRef.current?.scrollIntoView({ behavior: "smooth" });

        setTimeout(() => {
          textRef.current?.focus();
        }, 200);
      }
    } else {
      // reset
      setText("");
      setAmount("");
      setType("income");
      setCategory("Salary");
      setCustomCategory("");
      setDate("");
    }
  }, [editIndex, transactions]);

  // ✅ Cancel
  const handleCancel = () => {
    setEditIndex(null);
  };

  // ✅ Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const finalCategory =
      category === "Other" ? customCategory : category;

    let newErrors = {};

    if (!text.trim()) newErrors.text = "Description is required";
    if (!amount || Number(amount) <= 0)
      newErrors.amount = "Enter valid amount";
    if (!finalCategory) newErrors.category = "Category required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const newTransaction = {
      id: editIndex !== null ? editIndex : Date.now(),
      text,
      amount: Number(amount),
      type,
      category,
      date: date || new Date().toISOString(),
    };

    if (editIndex !== null) {
      onEdit(editIndex, newTransaction);
    } else {
      onAdd(newTransaction);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      style={{
        margin: "20px",
        border: editIndex !== null ? "2px solid blue" : "none",
        padding: "10px",
        borderRadius: "8px",
      }}
    >
      {/* Description */}
      <input
        ref={textRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter description"
      />
      {errors.text && <p style={{ color: "red" }}>{errors.text}</p>}

      {/* Amount */}
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      {errors.amount && <p style={{ color: "red" }}>{errors.amount}</p>}

      {/* Type */}
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
 <input
      list="categoryOptions"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  placeholder="Select or type category"
/>

<datalist id="categoryOptions">
  <option value="Salary" />
  <option value="Food" />
  <option value="Rent" />
  <option value="Travel" />
  <option value="Shopping" />
</datalist>

      {category === "Other" && (
        <input
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
          placeholder="Enter custom category"
        />
      )}

      {/* Date */}
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* Buttons */}
      <button type="submit">
        {editIndex !== null ? "Update" : "Add"}
      </button>

      {editIndex !== null && (
        <button
          type="button"
          onClick={handleCancel}
          style={{
            marginLeft: "10px",
            background: "gray",
            color: "white",
          }}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default AddTransaction;