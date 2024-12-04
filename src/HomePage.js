// import { useState } from "react";
import {Link } from 'react-router-dom';
import "./homePage.css";
import { useNavigate } from "react-router-dom";
import CashBook from './CashBook';


function HomePage() {
        const navigate = useNavigate();
      
        const handleLogin = () => {
          navigate("/cashbook"); 
        };
    return (
        <div className="homepage">
              
     <div className="box">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" />

                <div className="login-container">
                    <h2 className="text-center">Login</h2>
                    <form>
                        <div className="mb-3">
                            <label for="username" className="form-label">Username or Email</label>
                            <input type="text" className="form-control" id="username" required />
                        </div>
                        <div class="mb-3">
                            <label for="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" required />
                        </div>
                        <button id="button" type="submit" className="btn btn-primary w-100" onClick={handleLogin}>Login</button>
                    </form>
                    <div className="text-center mt-3">
                        <a href="#">Forgot Password?</a>
                        <p>
                            Don't have an account? <Link to="/signup" id="signup">Sign Up</Link>
                        </p>
                    </div>
                </div>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
                
            </div>
        </div>
    );
}
export default HomePage;