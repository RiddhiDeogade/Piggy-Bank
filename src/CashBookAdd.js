import React, { useState } from "react";
import "./cashbookadd.css";

function CashBookAdd() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const totalExpense = expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);

  const addExpense = () => {
    setExpenses([...expenses, { title: "", amount: 0 }]);
  };

  const removeExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const updateExpense = (index, key, value) => {
    setExpenses(
      expenses.map((expense, i) => (i === index ? { ...expense, [key]: value } : expense))
    );
  };
  return (
    <>
    <div className="title-container">
  <input
    type="textbox"
    placeholder="Title"
    className="casbookadd-title"
    id="main-title"
  />
</div>

    <div className="cashbook-container">
      <div className="row">
        <div className="column">
          <h3>Total Amount</h3>
          <input
            type="number"
            placeholder="Enter Total Amount"
            value={totalAmount}
            onChange={(e) => setTotalAmount(Number(e.target.value))}
            className="input-box"
          />
        </div>

        <div className="column">
          <h3>Expense</h3>
          {expenses.map((expense, index) => (
            <div key={index} className="expense-item">
              <input
                type="text"
                placeholder="Expense Title"
                value={expense.title}
                onChange={(e) => updateExpense(index, "title", e.target.value)}
                className="input-box"
              />
              <input
                type="number"
                placeholder="Amount"
                value={expense.amount}
                onChange={(e) => updateExpense(index, "amount", Number(e.target.value))}
                className="input-box"
              />
              <button id="rem-button" onClick={() => removeExpense(index)}>Remove</button>
            </div>
          ))}
          <button onClick={addExpense} className="add-expense-btn">
            Add Expense
          </button>
        </div>

        <div className="column">
          <h3>Amount Left</h3>
          <p>{totalAmount - totalExpense}</p>
        </div>
      </div>
    </div>
    </>
  );
}

export default CashBookAdd;
