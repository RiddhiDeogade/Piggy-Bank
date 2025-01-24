import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate, useParams } from "react-router-dom";
import "./cashbookedit.css";
import Grid from '@mui/material/Grid2';


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api/users";

function CashBookEdit() {
  const { cashbookId } = useParams(); // Extract cashbookId from URL params
  const [userId, setUserId] = useState(null);
  const [title, setTitle] = useState("");
  const [credits, setCredits] = useState([]);
  const [debits, setDebits] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const navigate = useNavigate();

  // Fetch userId from localStorage on mount
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId && cashbookId) {
      setUserId(storedUserId);
      fetchCashbookData(storedUserId, cashbookId);
    } else {
      showSnackbar("No valid cashbook found.");
    }
  }, [cashbookId]);

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setIsSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  const fetchCashbookData = async (userId, cashbookId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${API_BASE_URL}/${userId}/cashbooks/${cashbookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data) {
        setTitle(response.data.name);
        setCredits(response.data.credits || []);
        setDebits(response.data.debits || []);
      } else {
        showSnackbar("Cashbook not found.");
      }
    } catch (error) {
      console.error("Error fetching cashbook data:", error);
      showSnackbar("Failed to fetch cashbook data.");
    }
  };

  const handleSaveEdits = async () => {
    if (!cashbookId) {
      showSnackbar("No cashbook selected. Please create one first!");
      return;
    }

    const token = localStorage.getItem("authToken");

    try {
      const validCredits = credits.filter((c) => c.title.trim() && c.amount > 0);
      const validDebits = debits.filter((d) => d.title.trim() && d.amount > 0);

      // Update credits
      for (const credit of validCredits) {
        if (credit.id) {
          // Update existing credit
          await axios.put(
            `${API_BASE_URL}/cashbooks/${cashbookId}/credit/${credit.id}`,
            { title: credit.title, amount: credit.amount },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } else {
          // Create new credit
          await axios.post(
            `${API_BASE_URL}/cashbooks/${cashbookId}/credit`,
            { title: credit.title, amount: credit.amount },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
      }

      // Update debits
      for (const debit of validDebits) {
        if (debit.id) {
          // Update existing debit
          await axios.put(
            `${API_BASE_URL}/cashbooks/${cashbookId}/debit/${debit.id}`,
            { title: debit.title, amount: debit.amount },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } else {
          // Create new debit
          await axios.post(
            `${API_BASE_URL}/cashbooks/${cashbookId}/debit`,
            { title: debit.title, amount: debit.amount },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
      }

      // Update the cashbook title
      await axios.put(
        `${API_BASE_URL}/${userId}/cashbooks/${cashbookId}`,
        { name: title },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showSnackbar("Cashbook updated successfully!");
    } catch (error) {
      console.error("Error saving edits:", error);
      showSnackbar("Failed to save edits.");
    }
  };

  const updateTransaction = (type, index, key, value) => {
    if (type === "credit") {
      const updatedCredits = [...credits];
      updatedCredits[index][key] = value;
      setCredits(updatedCredits);
    } else if (type === "debit") {
      const updatedDebits = [...debits];
      updatedDebits[index][key] = value;
      setDebits(updatedDebits);
    }
  };

  const addTransaction = (type) => {
    if (type === "credit") {
      setCredits([...credits, { title: "", amount: 0 }]);
    } else if (type === "debit") {
      setDebits([...debits, { title: "", amount: 0 }]);
    }
  };

  return (
    <div>
      <div className="summary">
        <h3>Summary</h3>
        <p>Total Credits: {credits.reduce((sum, item) => sum + Number(item.amount || 0), 0)}</p>
        <p>Total Debits: {debits.reduce((sum, item) => sum + Number(item.amount || 0), 0)}</p>
        <p>Net Balance: {credits.reduce((sum, item) => sum + Number(item.amount || 0), 0) - debits.reduce((sum, item) => sum + Number(item.amount || 0), 0)}</p>
      </div>

      <div className="cashbook-container">
      <Grid container spacing={7}>
      <Grid item xs={4}>
        <TransactionList
          type="credit"
          items={credits}
          update={updateTransaction}
          title="CREDITS"
          addTransaction={addTransaction}
        />
        </Grid>
        <Grid item xs={5}>
        <TransactionList
          type="debit"
          items={debits}
          update={updateTransaction}
          title="DEBITS"
          addTransaction={addTransaction}
        />
</Grid>
</Grid>
      </div>

      <button id="saveEdits" onClick={handleSaveEdits}>
        Save Changes
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

const TransactionList = ({ type, items, update, title, addTransaction }) => (
  <div className="transaction-list">
    <h3>{title}</h3>
    {items.map((item, index) => (
      <div key={index} className="transaction-item">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Title"
              variant="outlined"
              value={item.title}
              onChange={(e) => update(type, index, "title", e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Amount"
              type="number"
              variant="outlined"
              value={item.amount}
              onChange={(e) => update(type, index, "amount", Number(e.target.value))}
            />
          
          
            <DeleteIcon color="error" id='delIcon' />
          </Grid>
        </Grid>
      </div>
    ))}
    <Fab color="primary" onClick={() => addTransaction(type)}>
      <AddIcon />
    </Fab>
  </div>
);

export default CashBookEdit;
