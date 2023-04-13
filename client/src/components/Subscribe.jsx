import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const Subscribe = (props) => {
    const navigate = useNavigate();
    const {backendErrors,setBackendErrors} = props;
    const [userPreferences,setUserPreferences] = useState()


    const formik = useFormik({
        initialValues:{
            name: "",
            email:"",
            contactPreferences: []
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("First name is required").max(20,"First name can not be more than 20 characters.").min(2,"First name must be at least 2 characters long."),
            email: Yup.string().required("Email address is required").email("Please enter a valid email address"),
            contactPreferences: Yup.array().min(1,"Must select at least 1 contact preference.").required()
        }),
        onSubmit:(values)=>{
            axios.post("http://localhost:8080/api/newsletter",values)
                .then(response => navigate('/success'))
                .catch(err => {
                    setBackendErrors(err)
                    const encodedEmail= encodeURIComponent(values.email)
                    findUser(encodedEmail)
                })
        }
    });

    const findUser = (email)=>{
        axios.get(`http://localhost:8080/api/newsletter/email/${email}`)
            .then(response => {
                setUserPreferences(response.data)
            })
            .catch(err=>console.log(err))
    }


    return (
        <div className="APP">
            <div className="swg-center">
                <h1 className="swg-head-color mb-3">Newsletter Sign up</h1>
                <h4 className="swg-head-color mb-3">Please fill out the simple form below to receive your choice of email notifications about our company.</h4>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-5 col-12 mx-auto d-flex flex-column align-items-center">
                            {
                                    formik.touched.name && formik.errors.name ?
                                    <p className="text-danger swg-text-danger">{formik.errors.name}</p>:null
                            }
                        <input
                            className="w-50"
                            type="text"
                            id="name"
                            name="name"
                            placeholder="First Name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                        />
                            {
                                    backendErrors.message ? <p className="text-danger mt-3 swg-text-danger">Email is already in use.</p>:
                                    formik.touched.email && formik.errors.email ?
                                    <p className="text-danger mt-3 swg-text-danger">{formik.errors.email}</p>:null
                            }
                        <input
                            className="mt-3 mb-3 w-50"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                            {
                                formik.touched.contactPreferences && formik.errors.contactPreferences ?
                                    <p className="text-danger mt-3 swg-text-danger">{formik.errors.contactPreferences}</p>:null
                            }
                        <span className="mt-3 mb-3 d-flex justify-content-between">
                            <input
                                className="mx-auto"
                                type="checkbox"
                                name="contactPreferences"
                                id="betaTest"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value="betaTest"
                            /><label htmlFor="betaTest" className="ms-3 me-3 swg-text-color">Beta Test Opportunities</label>
                            <input
                                className="mx-auto"
                                type="checkbox"
                                name="contactPreferences"
                                id="news"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value="news"
                            /><label htmlFor="news" className="ms-3 me-3 swg-text-color">Company News</label>
                        </span>
                        <span className="mt-1 mb-3 d-flex justify-content-between">
                            <input
                                className="mx-auto"
                                type="checkbox"
                                name="contactPreferences"
                                id="deals"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value="deals"
                            /><label htmlFor="deals" className="ms-3 me-4 swg-text-color">Deals and Bundles</label>
                            <input
                                className="mx-auto ms-2"
                                type="checkbox"
                                name="contactPreferences"
                                id="gameStatus"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value="gameStatus"
                            /><label htmlFor="gameStatus" className="ms-3 me-3 swg-text-color">Game Status News</label>
                        </span>
                        <span className="col-12 d-flex justify-content-end">
                            <input type="submit" value="Sign Me Up!" className="btn swg-btn-color"/>
                        </span>
                    </div>
                </form>
                {
                    userPreferences?.id ?
                    <div className="col-5 mx-auto d-flex flex-column justify-content-start mt-5">
                        <p className="swg-text-color">Your email is already signed up. Click the link below to edit your preferences or unsubscribe.</p>
                        <Link className="btn swg-btn-color" to={`/edit/${userPreferences?.id}`}>Edit Contact Preferences</Link>
                    </div>:null

                }

            </div>
        </div>
    )
}

export default Subscribe