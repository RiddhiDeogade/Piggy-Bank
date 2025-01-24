import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './homePage.css';
import { Link } from "react-router-dom";

function HomePage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        const data = { email, password };

        try {
            const response = await fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json(); // Assuming the server returns the token
                
                const { userId, email, token } = result; // Deconstruct response to get userId and token

                // Store token and user info in localStorage
                localStorage.setItem("userId", userId);
                localStorage.setItem("email", email);
                localStorage.setItem("authToken", token); // Store token

                // Redirect after successful login
                navigate("/cashbook");
            } else if (response.status === 404) {
                // Handle "No email found" error specifically
                setError("No account found with this email. Please sign up.");
            } else if (response.status === 401) {
                // Handle invalid credentials
                setError("Invalid email or password. Please try again.");
            } else {
                const errorText = await response.text();
                setError(errorText || "An unexpected error occurred. Please try again.");
            }
        } catch (err) {
            console.error('Error:', err);
            setError("Failed to login. Please try again later.");
        }
    };

    return (
        <div className="box">
            <div className="login-container">
                <h2 className="text-center">LOGIN</h2>
                <form onSubmit={handleLogin}>
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
                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        id="login"
                    >
                        Login
                    </button>
                </form>
                <div className="text-center mt-3">
                    <a href="#">Forgot Password?</a>
                    <p>
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
