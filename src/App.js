import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Use HashRouter
import HomePage from './HomePage';
import SignUp from "./SignUp";
import CashBook from './CashBook';
import NaviGation from './NaviGation';
import CashBookAdd from './CashBookAdd';
import './navigation.css';
import Home from './Home';
import Contact from './Contact';
import CashBookList from './CashBookList';
import CashBookEdit from './CashBookEdit';

function App() {
  return (
    <>
      <NaviGation />

      <Routes>
        <Route path="/" element={<Home />} />               {/* Home displayed by default */}
        <Route path="/login" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cashbook" element={<CashBook />} />
        <Route path="/cashbook-add" element={<CashBookAdd />} />
        <Route path="/cashbook-view" element={<CashBookList />} />
        <Route path="/cashbook-edit/:cashbookId" element={<CashBookEdit />} />
      </Routes>
    </>
  );
}

export default App;
