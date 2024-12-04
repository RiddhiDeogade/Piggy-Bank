import logo from './assets/logo_piggy_bank.png';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Services from './Services';
import './navigation.css';
import HomePage from './HomePage';



function NaviGation() {
return ( 
    <>                
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" />

<nav id="navbar" className="navbar navbar-expand-lg bg-body-tertiary">
                <div id="header" className="container-fluid">
                    <img id="logo" src={logo} alt="Logo" width="80" className="d-inline-block align-text-top" />
                    <a id="title" class="navbar-brand" href="#">PIGGY BANK</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul  className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/" id="nav">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" id="nav1">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/services" id="nav2">Services</Link>

                            </li>
                            <li className="nav-item">
                                <Link to="/contact" id="nav3">Contact</Link>

                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Routes>
           
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
        </>
          );
        }
export default NaviGation;