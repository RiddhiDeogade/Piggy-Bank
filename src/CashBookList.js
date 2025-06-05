import React, { useState, useEffect } from "react";
import axios from "axios";
import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import "./cashbooklist.css";
import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api/users";

function CashBookList() {
  const [userId, setUserId] = useState(null);
  const [cashbooks, setCashbooks] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      fetchCashbooks(storedUserId);
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

  const fetchCashbooks = async (userId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${API_BASE_URL}/${userId}/cashbooks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCashbooks(response.data);
    } catch (error) {
      console.error("Error fetching cashbooks:", error);
      showSnackbar("Failed to fetch cashbooks.");
    }
  };

  const deleteCashbook = async (cashbookId) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${API_BASE_URL}/${userId}/cashbooks/${cashbookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update the state after successful deletion
      setCashbooks((prevCashbooks) => prevCashbooks.filter((c) => c.id !== cashbookId));
      showSnackbar("Cashbook deleted successfully!");
    } catch (error) {
      console.error("Error deleting cashbook:", error);
      showSnackbar("Failed to delete cashbook.");
    }
  };

  const navigate = useNavigate();
  const edit_Cashbook = (cashbookId) => {
    navigate(`/cashbook-edit/${cashbookId}`); // Navigate with cashbookId
  };

  return (
    <div>
      <h1 id="History">HISTORY</h1>

      <div className="cashbook-list">
        {cashbooks.map((cashbook) => (
          <Box id="eachBox" component="section" sx={{ p: 1 }} key={cashbook.id}>
            <p id="date_" className="cashbook-date">
            Created on: {cashbook.dateCreated ? cashbook.dateCreated.join("-") : "N/A"}
            </p>
            <div id="inBox" className="cashbook-item">
              <div className="cashbook-header">
                <h2>{cashbook.name}</h2>
                <Fab
                  color="secondary"
                  size="small"
                  onClick={() => edit_Cashbook(cashbook.id)} 
                >
                  <EditIcon />
                </Fab>
                <Fab
                  color="secondary"
                  size="small"
                  onClick={() => deleteCashbook(cashbook.id)}
                >
                  <DeleteIcon />
                </Fab>
              </div>

              <div className="transactions">
                <Grid container spacing={0}>
                  <Grid item xs={9}>
                    <h3 className="cr">Credits:</h3>
                    {cashbook.credits.map((credit, index) => (
                      <p className="Colu" key={index}>{`${credit.title}: ${credit.amount}`}</p>
                    ))}
                  </Grid>
                  <Grid item xs={0}>
                    <h3 className="cr">Debits:</h3>
                    {cashbook.debits.map((debit, index) => (
                      <p className="Colu" key={index}>{`${debit.title}: ${debit.amount}`}</p>
                    ))}
                  </Grid>
                </Grid>
              </div>
            </div>
          </Box>
        ))}
      </div>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </div>
  );
}

export default CashBookList;
