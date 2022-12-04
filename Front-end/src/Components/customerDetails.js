import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const CustomerDetails =() =>{
    let params = useParams();
  let _id = params.id;
  let navigate = useNavigate();
  const [formValues, setFormValues] = useState({id:'', firstName: '', lastName:'', userName:'', emailAddress:'', dateOfBirth:'', age:'', dateCreated:'' , dateEdited:'', isDeleted:''})
	
  

  // Load data from server and reinitialize customer form
  useEffect(() => {
    axios
    .get(
      "https://localhost:7043/api/Customer/" + _id
    )
    .then((res) => {
      const {id, firstName, lastName,userName, emailAddress, dateOfBirth, age ,dateCreated, dateEdited, isDeleted} = res.data;
      
      setFormValues({id, firstName, lastName,userName, emailAddress, dateOfBirth, age, dateCreated, dateEdited, isDeleted});
    })
    .catch((err) => console.log(err));
  }, [_id]);
  
  return(
    <div className="table-wrapper">
        <Link className="edit-link" to={"/customer-list/"}>
                    Back
        </Link>
        <hr/>
        <Table bordered hover>
            <tbody>
                <tr>
                    <th>Customer Id:</th>
                    <td>{formValues.id}</td>
                </tr>
                <tr>
                    <th>First Name:</th>
                    <td>{formValues.firstName}</td>
                </tr>
                <tr>
                    <th>Last Name:</th>
                    <td>{formValues.lastName}</td>
                </tr>
                <tr>
                    <th>UserName</th>
                    <td>{formValues.userName}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>{formValues.emailAddress}</td>
                </tr>
                <tr>
                    <th>Date of birth</th>
                    <td>{formValues.dateOfBirth}</td>
                </tr>
                <tr>
                    <th>Age</th>
                    <td>{formValues.age}</td>
                </tr>
                <tr>
                    <th>Sign up date</th>
                    <td>{formValues.dateCreated}</td>
                </tr>

                <tr>
                    <th>Last update</th>
                    <td>{formValues.dateEdited}</td>
                </tr>
                <tr>
                    <th>Deleted</th>
                    <td>{formValues.isDeleted}</td>
                </tr>
            </tbody>
        </Table>
    </div>
    
  )
};

export default CustomerDetails;
