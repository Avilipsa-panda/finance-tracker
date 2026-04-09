const TransactionList = ({ transactions = [], onDelete, setEditIndex }) => {

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Transactions</h2>

      {sortedTransactions.length === 0 ? (
        <p style={{ textAlign: "center" }}>No transactions</p>
      ) : (
        sortedTransactions.map((t) => (
          <div
            key={t.id}
            className={`transaction-card ${t.type}`}
          >
            {/* LEFT SIDE */}
            <div>
              <h3>
                {t.type === "income" ? "🟢" : "🔴"} {t.text}
              </h3>
              <p>{t.category}</p>
              <p>{new Date(t.date).toLocaleString()}</p>
            </div>

            {/* RIGHT SIDE */}
            <div style={{ textAlign: "right" }}>
              <h2>₹{t.amount}</h2>

              <div style={{ marginTop: "5px" }}>
                <button onClick={() => setEditIndex(t.id)}>✏️</button>
                <button onClick={() => onDelete(t.id)}>🗑️</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TransactionList;