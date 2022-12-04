import React from "react";
import { Nav, Navbar, Container, Row, Col }
		from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';

import CreateCustomer from "./Components/createCustomer";
import EditCustomer from "./Components/editCustomer";
import CustomerList from "./Components/customerList";
import CustomerDetails from "./Components/customerDetails";
function App() {
  return (
    <Router>
	<div className="App">
		<header className="App-header">
		<Navbar bg="dark" variant="dark">
			<Container>
			<Navbar.Brand>
				<Link to={"/customer-list"}
				className="nav-link">
				Customer Management
				</Link>
			</Navbar.Brand>

			</Container>
		</Navbar>
		</header>

		<Container>
		<Row>
			<Col md={12}>
			<div className="wrapper">
				<Routes>
          			<Route exact path="/" element={<CustomerList/>} />
          			<Route path="/create-customer" element={<CreateCustomer />} />
          			<Route path="/edit-customer/:id" element={<EditCustomer />} />
          			<Route path="/customer-list" element={<CustomerList />} />
					<Route path="/view-customer/:id" element={<CustomerDetails/>}/>
				</Routes>
			</div>
			</Col>
		</Row>
		</Container>
	</div>
	</Router>
  );
}

export default App;
