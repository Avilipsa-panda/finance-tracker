const Balance = ({ balance, income, expense }) => {
  return (
    <div className="card"> 
      <h2>Balance: ₹{balance}</h2>
      <p>Income: ₹{income}</p>
      <p>Expense: ₹{expense}</p>
    </div>
  );
};

export default Balance;