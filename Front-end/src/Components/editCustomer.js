// EditStudent Component for update student data

// Import Modules
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CustomerForm from "./customerForm";
import { Alert } from "react-bootstrap";

// EditCustomer Component
const EditCustomer = () => {
  let params = useParams();
  let _id = params.id;
  let navigate = useNavigate();
  const [formValues, setFormValues] = useState({ firstName: '', lastName:'', emailAddress:'', dateOfBirth:'' })
	
  //onSubmit handler
  const onSubmit = (customerObject) => {
    axios
    .put(
      "https://localhost:7043/api/Customer/" + _id,
      customerObject
    )
    .then((res) => {
      if (res.status === 200) {
        alert("Customer successfully updated");
        navigate("/customer-list");
      } else
          Promise.reject();
    })
    .catch((err) => alert("Something went wrong"));
  };

  // Load data from server and reinitialize customer form
  useEffect(() => {
    axios
    .get(
      "https://localhost:7043/api/Customer/" + _id
    )
    .then((res) => {
      const { firstName, lastName, emailAddress, dateOfBirth } = res.data;
      setFormValues({ firstName, lastName, emailAddress, dateOfBirth});
    })
    .catch((err) => console.log(err));
  }, [_id]);

  // Return customer form
  return (
    <CustomerForm
      initialValues={formValues}
      onSubmit={onSubmit}
      enableReinitialize>
    Update Customer
    </CustomerForm>
  );
};

// Export EditCustomer Component
export default EditCustomer;
