import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import "./cashbookadd.css";
import Grid from '@mui/material/Grid2';
import DeleteIcon from '@mui/icons-material/Delete';


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api/users";

function CashBookAdd() {
  const [userId, setUserId] = useState(null); // Fetch userId from localStorage
  const [cashbookId, setCashbookId] = useState(null);
  const [title, setTitle] = useState("");
  const [credits, setCredits] = useState([]);
  const [debits, setDebits] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const totalCredit = credits.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const totalDebit = debits.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      showSnackbar("User is not logged in. Please log in.");
    }
  }, []);

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setIsSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  const addTransaction = (type) => {
    const newTransaction = { title: "", amount: 0 };
    type === "credit"
      ? setCredits([...credits, newTransaction])
      : setDebits([...debits, newTransaction]);
  };

  const removeTransaction = (type, index) => {
    type === "credit"
      ? setCredits(credits.filter((_, i) => i !== index))
      : setDebits(debits.filter((_, i) => i !== index));
  };

  const updateTransaction = (type, index, key, value) => {
    type === "credit"
      ? setCredits(credits.map((c, i) => (i === index ? { ...c, [key]: value } : c)))
      : setDebits(debits.map((d, i) => (i === index ? { ...d, [key]: value } : d)));
  };

  const handleCreateCashbook = async () => {
    if (!userId) {
      showSnackbar("User ID is not available. Please log in.");
      return;
    }

    if (!title.trim()) {
      showSnackbar("Please enter a valid cashbook title.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${API_BASE_URL}/${userId}/cashbooks`,
        { name: title },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data && response.data.id) {
        setCashbookId(response.data.id);
        showSnackbar("Cashbook created successfully!");
      } else {
        showSnackbar("Failed to create cashbook.");
      }
    } catch (error) {
      console.error("Error creating cashbook:", error);
      showSnackbar("Failed to create cashbook.");
    }
  };

  const handleSaveTransactions = async () => {
    if (!cashbookId) {
      showSnackbar("Please create a cashbook first!");
      return;
    }

    const token = localStorage.getItem("authToken");

    try {
      const validCredits = credits.filter((c) => c.title.trim() && c.amount > 0);
      const validDebits = debits.filter((d) => d.title.trim() && d.amount > 0);

      for (const credit of validCredits) {
        await axios.post(
          `${API_BASE_URL}/cashbooks/${cashbookId}/credit`,
          credit,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      for (const debit of validDebits) {
        await axios.post(
          `${API_BASE_URL}/cashbooks/${cashbookId}/debit`,
          debit,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      showSnackbar("Transactions saved successfully!");
    } catch (error) {
      console.error("Error saving transactions:", error);
      showSnackbar("Failed to save transactions.");
    }
  };

  return (
    <div>
      <div className="title-container">
        <TextField
          label="Cashbook Title"
          variant="filled"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleCreateCashbook} disabled={!title.trim()}>
          CREATE
        </button>
      </div>

        <div className="summary">
          <h3>Summary</h3>
          <p>Total Credits: {totalCredit}</p>
          <p>Total Debits: {totalDebit}</p>
          <p>Net Balance: {totalCredit - totalDebit}</p>
        </div>

      <div className="cashbook-container">
        <Grid container spacing={2}>
  <Grid size={7} id='gc'>
    <TransactionList
          type="credit"
          items={credits}
          add={() => addTransaction("credit")}
          remove={(index) => removeTransaction("credit", index)}
          update={(index, key, value) => updateTransaction("credit", index, key, value)}
          title="CREDITS"
        />
  </Grid>
  <Grid size={5} id='gd'>
    <TransactionList
          type="debit"
          items={debits}
          add={() => addTransaction("debit")}
          remove={(index) => removeTransaction("debit", index)}
          update={(index, key, value) => updateTransaction("debit", index, key, value)}
          title="DEBITS"
        />
  </Grid></Grid>

        
       
      </div>

      <button id="saveTrans"
        onClick={handleSaveTransactions}
        disabled={credits.length === 0 && debits.length === 0}
      >
        Save Transactions
      </button>

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </div>
  );
}

const TransactionList = ({ type, items, add, remove, update, title }) => (
  <div className="column">
    <h3>{title}</h3>
    {items.map((item, index) => (
      <div key={index} className="transaction-item">
        <Grid container spacing={2}>
  <Grid size={6}>
  <TextField
        id="titleT"
          label="Title"
          variant="outlined"
          value={item.title}
          onChange={(e) => update(index, "title", e.target.value)}
        />
  </Grid>
  <Grid size={4}>
  <TextField
        id="amtT"
          label="Amount"
          type="number"
          variant="outlined"
          value={item.amount}
          onChange={(e) => update(index, "amount", Number(e.target.value))}
        />
  </Grid>
  <Grid size={2}>
 
  <Grid color="red" id="deleteIcon" onClick={() => remove(index)}>
          <DeleteIcon />
        </Grid>
  </Grid></Grid>
        
       
      </div>
    ))}
    <Fab color="primary" id="addIcon" onClick={add}>
      <AddIcon />
    </Fab>
  </div>
);

export default CashBookAdd;
