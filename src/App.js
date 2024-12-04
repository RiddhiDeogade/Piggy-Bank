import './App.css';
import { Routes, Route} from 'react-router-dom';
import HomePage from './HomePage';
import SignUp from "./SignUp";
import CashBook from './CashBook';
import NaviGation from './NaviGation';
import CashBookAdd from './CashBookAdd';
import './navigation.css';
function App() {
  return (
    <><NaviGation/>
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp /> }/>
        <Route path="/cashbook" element={<CashBook/>}/>
        <Route path="/cashbook-add" element={<CashBookAdd/>}/>

      </Routes>

    </>
  );
}

export default App;
