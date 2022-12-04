import axios from "axios";
import { useEffect, useState } from "react";
import CustomerTableRow from "./customerTableRow";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const CustomerList = ()=>{
    const [customers, setCustomers] = useState([]);
    useEffect(()=>{
        axios
        .get("https://localhost:7043/api/Customer")
        .then(({data}) =>{
            setCustomers(data);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[]);

    const DataTable = () =>{
        return customers.map((res,i) =>{
            return <CustomerTableRow obj={res} key={i}/>
        });
    }

    return(
        <div className="table-wrapper">
                <Link className="edit-link" to={"/create-customer/"}>
                    New Customer
                </Link>
                <hr/>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email Address</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {DataTable()}
                </tbody>
            </Table>
        </div>
    )
}

export default CustomerList;