import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './signup.css';

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
    const navigate = useNavigate();

    // Check if the user is already logged in
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setIsLoggedIn(!!token); // Set `isLoggedIn` to true if token exists
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
    
        setError("");
        setSuccessMessage("");
    
        if (!email || !password || !confirmPassword) {
            setError("All fields are required.");
            return;
        }
    
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
    
        const data = { email, password };
    
        try {
            const response = await fetch('http://localhost:8080/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
    
            if (response.ok) {
                const result = await response.json();
                setSuccessMessage("Registration successful! Redirecting to login...");
                localStorage.setItem("authToken", result.token);
                setTimeout(() => navigate('/login'), 2000); 
            } else {
                const errorText = await response.text();
                setError(errorText || "An error occurred. Please try again.");
            }
        } catch (err) {
            console.error('Error:', err);
            setError("Failed to register. Please try again later.");
        }
    };

    // Redirect logged-in users to the homepage or a protected page
    if (isLoggedIn) {
        navigate("/cashbook");
        return null; // Prevent rendering the registration form
    }

    return (
        <div className="navigation">
            <div className="signupPage">
                <div className="register-container">
                    <h2 className="text-center">REGISTER</h2>
                    <form onSubmit={handleRegister}>
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            id="reg"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
