import { useNavigate } from 'react-router-dom';
import './cashbook.css';
import CashBookAdd from './CashBookAdd';
import ListOfCashbooks from './CashBookList';

function CashBook(){
    const navigate = useNavigate();
    const add_Cashbook = () => {
      navigate("/cashbook-add"); 
    };

    const view_Cashbook = () => {
        navigate("/cashbook-view"); 
      };

    return(
<div className='bg_pic'>
  <div className="d-grid gap-1 col-2 mx-auto">
  <button className="btn btn-primary" type="button" id='cashbook1' onClick={add_Cashbook}>Add Cashbook</button>
  <button className="btn btn-primary" type="button" id='cashbook2' onClick={view_Cashbook}>View Cashbook</button></div>
</div>
    );
}
export default CashBook;