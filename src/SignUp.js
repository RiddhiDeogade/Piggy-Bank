import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './signup.css';

function SignUp(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const navigate = useNavigate();
    
    const handleRegister = () => {
        const fullName = `${firstName} ${lastName}`;
        navigate("/", { state: { name: fullName } }); 
    };
    
    return(
    <div className="navigation">   
    <div className="signupPage">
    <div className="register-container">
    <h2 className="text-center">Register</h2>
    <form>
        <div className="row">
            <div className="col-md-6 mb-3">
                <label for="firstName" className="form-label">First Name</label>
                <input type="text" className="form-control" id="firstName"  value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}required/>
            </div>
            <div className="col-md-6 mb-3">
                <label for="lastName" className="form-label">Last Name</label>
                <input type="text" className="form-control" id="lastName" value={lastName}
                                onChange={(e) => setLastName(e.target.value)} required/>
            </div>
        </div>
        <div className="mb-3">
            <label for="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" required/>
        </div>
        <div className="mb-3">
            <label for="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" required/>
        </div>
        <div className="mb-3">
            <label for="confirmPassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="confirmPassword" required/>
        </div>
        <button type="submit" className="btn btn-primary w-100" id='reg' onClick={handleRegister}>Register</button>
    </form>
</div>
</div>
</div>
);
}
export default SignUp;