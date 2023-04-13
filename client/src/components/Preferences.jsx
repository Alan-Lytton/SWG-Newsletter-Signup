import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import {Link} from "react-router-dom";

const Preferences = () => {
    const [emailFound,setEmailFound] = useState(false);
    const [noEmail,setNoEmail] = useState(false);
    const [currentInfo,setCurrentInfo] = useState({})

    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Email address is required").email("Please enter a valid email address")
        }),
        enableReinitialize: true,
        onSubmit: (values) => {
            setEmailFound(false)
            setNoEmail(false)
            const encodedEmail= encodeURIComponent(values.email)
            axios.get(`http://localhost:8080/api/newsletter/email/${encodedEmail}`)
                .then(res => {
                    setCurrentInfo(res.data)
                    setEmailFound(true)
                })
                .catch(err => {
                    setNoEmail(true)
                })
        }
    })

    return (
        <div className="APP">
            <div className="swg-center">
                <h1 className="swg-head-color">Email Lookup</h1>
                <h4 className="swg-head-color">Search your email below to check if you have registered already</h4>
                <form onSubmit={formik.handleSubmit}>
                    <div className="d-flex flex-column col-12 mx-auto">
                        {
                            // backendErrors?.message ? <p className="text-danger mt-3">Email is already in use.</p>:
                                formik.touched.email && formik.errors.email ?
                                    <p className="text-danger mt-3 swg-text-danger">{formik.errors.email}</p>:null
                        }
                        <input
                            className="mt-3 mb-3"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        <span className="col-12 d-flex justify-content-end">
                            <input type="submit" value="Search" className="btn swg-btn-color"/>
                        </span>
                    </div>
                </form>
                {
                    emailFound?
                        <div className="mt-5 col-5">
                            <p className="swg-text-color">Your email is in our records please click the button below if you would like to update your preferences.</p>
                            <Link to={`/edit/${currentInfo.id}`} className="btn swg-btn-color">Update Preferences</Link>
                        </div>
                        :null
                }
                {
                    noEmail?
                        <div className="mt-5 col-5">
                            <p className="swg-text-color">Your email was not found in our records please click the button below if you would like to subscribe.</p>
                            <Link to={`/subscribe`} className="btn swg-btn-color">Subscribe</Link>
                        </div>
                        :null
                }
            </div>
        </div>
    )
}

export default Preferences