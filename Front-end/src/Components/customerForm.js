import React from "react";
import * as Yup from "yup"
import {Formik, Form, Field, ErrorMessage} from "formik";
import { FormGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


const CustomerForm = (props) => {
    const validationSchema = Yup.object().shape({
        emailAddress: Yup.string().email("You have entered an invalid email address").required("Required")
    });
    var vali = validationSchema.firstName;
    return(
        <div className="form-wrapper">
             <Link className="edit-link" to={"/customer-list/"}>
                    Back
            </Link>
        <hr/>
            <Formik {...props} validationSchema={validationSchema}>
                <Form>
                    <FormGroup>
                        <label htmlFor="firstName">First Name</label>
                        <Field name="firstName" type="text" className="form-control"/>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="lastName">Last Name</label>
                        <Field name="lastName" type="text"className="form-control"/>
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="emailAddress">Email Address</label>
                        <Field name="emailAddress" type="email" className="form-control"/>
                        <ErrorMessage name="emailAddress" className="d-block invalid-feedback" component="span"/>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="dateOfBirth">Date Of Birth</label>
                        <Field name="dateOfBirth" type="datetime-local"  className="form-control"/>
                    </FormGroup>
                    <br/>
                    <FormGroup>
                        <Button variant="primary" size="lg" block="block" type="submit" className="form-control">
                            {props.children}
                        </Button>
                    </FormGroup>
                    
                </Form>
            </Formik>
        </div>
    );
};

export default CustomerForm;