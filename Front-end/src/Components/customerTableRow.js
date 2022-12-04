import axios from "axios";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CustomerTableRow =(props) =>{
   
    const {id, firstName, lastName, emailAddress, age} = props.obj
    const deleteCustomer = () =>{
        axios.delete("https://localhost:7043/api/Customer/"+id)
        .then((res) =>{
            if(res.status === 200){
                alert("Customer successfully deleted");
                window.location.reload();
            } else Promise.reject();
        })
        .catch((err) => alert());
    }
    return(
        <tr>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{emailAddress}</td>
            <td>{age}</td>
            <td>
                <Link className="edit-link" to={"/view-customer/"+id}>
                    View
                </Link>
                <Link className = "edit-link"  to={"/edit-customer/"+id}>
                    Edit
                </Link>
                <Button onClick={deleteCustomer} id="delete">Delete</Button>
            </td>
        </tr>
    )
}

export default CustomerTableRow;