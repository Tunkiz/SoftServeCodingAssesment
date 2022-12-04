import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomerForm from "./customerForm";

//CreateCustomer Componet
const CreateCustomer = () =>{
    let navigate = useNavigate();
    const[formValues, setFormValues] = useState({firstName: '', lastName:'', userName:'', emailAddress:'', dateOfBirth:''})
    // onSubmit handler
    const onSubmit = customerObject =>{
        axios.post(
            'https://localhost:7043/api/Customer',
            customerObject
        ).then(res =>{
            if(res.status === 200){
                alert('customersucessfully created');
                navigate("/customer-list")
            }else   
                Promise.reject();
        }).catch(err => alert("Something went wrong"))
    }

    //return customer from
    return(
        <CustomerForm initialValues={formValues} onSubmit={onSubmit} enableReinitialize>
            Create Customer
        </CustomerForm>
    )
}

export default CreateCustomer;