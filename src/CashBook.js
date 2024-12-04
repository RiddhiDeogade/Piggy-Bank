import { useNavigate } from 'react-router-dom';
import './cashbook.css';
import CashBookAdd from './CashBookAdd';
function CashBook(){
    const navigate = useNavigate();
    const viewCashbook = () => {
      navigate("/cashbook-add"); 
    };
    return(
<>
<h1 id="cashbookHeading" >Cashbook{'\u{1F4D6}'}</h1>
<div className="btn-group" role="group" aria-label="Basic outlined example" >
  <button type="button" className="btn btn-outline-primary" id='cashbook1' onClick={viewCashbook}>Add</button>
  <button type="button" className="btn btn-outline-primary" id='cashbook2'>View </button>
  <button type="button" className="btn btn-outline-primary"id='cashbook3'>Delete </button>
</div>
</>
    );
}
export default CashBook;