import Spline from '@splinetool/react-spline';
import './home.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid2';
import ss from './assets/ss.png';


function Home() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is logged in by verifying the presence of an auth token in localStorage
        const token = localStorage.getItem("authToken");
        setIsLoggedIn(!!token); // Update login status based on the presence of the token
    }, []);



    const handleReg = () => {
        navigate("/signup");
    };

    return (
        <div>
            <div class="typewriter-container">
  <p class="typewriter">Welcome to Piggy Bank, your ultimate personal expense manager!</p>
</div>

         <div style={{ height: '500px', width: '100%' }}>
         <Spline scene="https://prod.spline.design/0eHI1HUAnuo2GeRo/scene.splinecode" 

              style={{ height: '100%', width: '100%' }} 
      />
    </div>
{/* <Spline scene="https://prod.spline.design/0eHI1HUAnuo2GeRo/scene.splinecode" /> */}
<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid size={7}>
               <img src={ss} id='ss'/>
                </Grid>

                <Grid size={4}>
                        <div className="d-flex justify-content-end">
                            <div className="d-grid gap-3 col-11">
                                <p id='desc'>Take control of your finances with Piggy Bank! Our platform makes tracking, managing,
                                     and optimizing your spending simple and intuitive. 
                                     Whether you're saving for a big goal or keeping an eye on daily expenses, 
                                     we've got you covered. Start managing your money smarter today— register now and take the first
                                      step toward financial freedom!</p>
                                      {!isLoggedIn && (
                                <button className="btn btn-primary" id="r" type="button" onClick={handleReg}>
                                    REGISTER NOW!
                                </button>
                                )}
                            </div>
                        </div>
                </Grid>
            </Grid>

            <footer className="footer">
                <div className="footer-content">
                    <div className="row">
                        {/* Column 1 */}
                        <div className="col-md-3" id='leftmost'>
                            <h5>About Us</h5>
                            <p>
                                This is a personal expense manager to help you track your finances efficiently.
                                Stay on top of your income and expenses.
                            </p>
                        </div>

                        {/* Column 2 */}
                        <div className="col-md-2" id='middlemost'>
                            <h5>Quick Links</h5>
                            <ul className="list-unstyled" id='quicklinks'>
                                <li><a href="/" className="text-white text-decoration-none">Home</a></li>
                                <li>Features</li>
                                <li>Contact Us</li>
                            </ul>
                        </div>

                        {/* Column 3 */}
                        <div className="col-md-3" id='rightmost'>
                            <h5>Contact</h5>
                            <p>
                                Email: support@expensemanager.com<br />
                                Phone: +1 (123) 456-7890<br />
                                Address: 123 Finance St, Money City
                            </p>
                        </div>
                    </div>

                    <hr className="my-3 text-grey" />

                    <div className="text-center">
                        <p className="mb-0">
                            &copy; {new Date().getFullYear()} Personal Expense Manager. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;
