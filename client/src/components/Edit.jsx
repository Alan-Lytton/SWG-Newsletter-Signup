import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";

const Edit = (props) => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [isChecked,setIsChecked] = useState(false);
    const {backendErrors,setBackendErrors} = props;
    const [editDataRes,setEditDataRes] = useState();
    const [chosenPreferences,setChosenPreferences] = useState({
        betaTest:false,
        news:false,
        deals:false,
        gameStatus:false
    })

    const formik = useFormik({
        initialValues:{
            name:editDataRes?.name,
            email:editDataRes?.email,
            contactPreferences: editDataRes?.contactPreferences,
            id:editDataRes?.id
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("First name is required").max(20,"First name can not be more than 20 characters.").min(2,"First name must be at least 2 characters long."),
            email: Yup.string().required("Email address is required").email("Please enter a valid email address"),
            contactPreferences: Yup.array().min(1,"Must select at least 1 contact preference.").required()
        }),
        enableReinitialize:true,
        onSubmit:(values)=>{
            axios.put(`http://localhost:8080/api/newsletter/${id}`,values)
                .then(res => navigate('/success'))
                .catch(err => console.log(err))
        }
    })


    useEffect( ()=>{
        setBackendErrors([])
        axios.get(`http://localhost:8080/api/newsletter/${id}`)
            .then(res =>{
                setEditDataRes(res.data)
            })
            .catch((err => console.log(err)))
    },[])

    useEffect(()=>{
        if(editDataRes){
            setChecked();
        }
    },[editDataRes])

    // const setChecked = ()=>{
    //     let tempArr = editDataRes?.contactPreferences;
    //     for(let i = 0;i<tempArr.length;i++){
    //         if(tempArr[i] == "betaTest"){
    //             setChosenPreferences({...chosenPreferences,betaTest: true})
    //         }
    //         if(tempArr[i] == "news"){
    //             setChosenPreferences({...chosenPreferences, news: true})
    //         }
    //         if(tempArr[i] == "deals"){
    //             setChosenPreferences({...chosenPreferences, deals: true})
    //         }
    //         if(tempArr[i] == "gameStatus"){
    //             setChosenPreferences({...chosenPreferences, gameStatus: true})
    //         }
    //     }
    // }

    const setChecked = ()=>{
        let tempArr = editDataRes?.contactPreferences;
        let updatedChosenPreferences = {...chosenPreferences}
        for(let i = 0;i<tempArr.length;i++){
            if(tempArr[i] == "betaTest"){
                updatedChosenPreferences.betaTest = true;
            }
            if(tempArr[i] == "news"){
                updatedChosenPreferences.news = true;
            }
            if(tempArr[i] == "deals"){
                updatedChosenPreferences.deals = true
            }
            if(tempArr[i] == "gameStatus"){
                updatedChosenPreferences.gameStatus = true
            }
        }
        setChosenPreferences(updatedChosenPreferences);
    }
    function handleCheckClick(e) {
        let updatedChosenPreferences = {...chosenPreferences}
        if(e.target.value == "betaTest" ){
            updatedChosenPreferences.betaTest = !updatedChosenPreferences.betaTest
        }
        if(e.target.value == "news" ){
            updatedChosenPreferences.news = !updatedChosenPreferences.news
        }
        if(e.target.value == "deals" ){
                    updatedChosenPreferences.deals = !updatedChosenPreferences.deals
                }
        if(e.target.value == "gameStatus" ){
                    updatedChosenPreferences.gameStatus = !updatedChosenPreferences.gameStatus
                }
        setChosenPreferences(updatedChosenPreferences)
    }


    const handleDelete = (id) =>{
        axios.delete(`http://localhost:8080/api/newsletter/${id}`)
            .then(res => navigate('/unsubsuccess'))
            .catch(err => console.log(err))
    }


    return (
        <div className="APP">
            <div className="swg-center">
                <h1 className="swg-head-color swg-head-size mb-3">Edit My Preferences</h1>
                <form className="swg-custom-width" onSubmit={formik.handleSubmit}>
                    <div className="d-flex flex-column mb-5 mx-auto align-items-center">
                        {
                            formik.touched.name && formik.errors.name ?
                                <p className="swg-text-danger">{formik.errors.name}</p>:null
                        }
                        <input
                            className={`mb-3 swg-input-size swg-text-format ${formik.touched.name && formik.errors.name ? "swg-danger-box":"mt-3"}`}
                            type="text"
                            id="name"
                            name="name"
                            placeholder="First Name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                        />
                        {
                            backendErrors?.message ? <p className="mt-3 swg-text-danger">Email is already in use.</p>:
                                formik.touched.email && formik.errors.email ?
                                    <p className="mt-3 swg-text-danger">{formik.errors.email}</p>:null
                        }
                        <input
                            className={`mb-3 swg-input-size swg-input-format ${backendErrors.message ? "swg-danger-box": formik.touched.email && formik.errors.email ? "swg-danger-box":"mt-3" }`}
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
                                <p className="mt-3 swg-text-danger">{formik.errors.contactPreferences}</p>:null
                        }
                        <div className={`d-flex flex-column align-items-start ${formik.touched.contactPreferences && formik.errors.contactPreferences ? "swg-danger-box ps-4 mb-3":""}`}>
                            <div>
                                <input
                                    className="mx-auto swg-checks"
                                    type="checkbox"
                                    name="contactPreferences"
                                    id="betaTest"
                                    onChange={e=>{formik.handleChange(e); handleCheckClick(e)}}
                                    onBlur={formik.handleBlur}
                                    value="betaTest"
                                    checked={chosenPreferences?.betaTest ? true:false}
                                /><label htmlFor="betaTest" className="ms-3 me-3 swg-text-color">Beta Testing</label>
                            </div>
                            <div>
                                <input
                                    className="mx-auto swg-checks"
                                    type="checkbox"
                                    name="contactPreferences"
                                    id="news"
                                    onChange={e=>{formik.handleChange(e); handleCheckClick(e)}}
                                    onBlur={formik.handleBlur}
                                    value="news"
                                    checked={chosenPreferences?.news ? true:false}
                                /><label htmlFor="news" className="ms-3 me-3 swg-text-color">Company News</label>
                            </div>
                            <div>
                                <input
                                    className="mx-auto swg-checks"
                                    type="checkbox"
                                    name="contactPreferences"
                                    id="deals"
                                    onChange={e=>{formik.handleChange(e); handleCheckClick(e)}}
                                    onBlur={formik.handleBlur}
                                    value="deals"
                                    checked={chosenPreferences?.deals ? true:false}
                                /><label htmlFor="deals" className="ms-3 me-3 swg-text-color">Deals and Bundles</label>
                            </div>
                            <div>
                                <input
                                    className="mx-auto swg-checks"
                                    type="checkbox"
                                    name="contactPreferences"
                                    id="gameStatus"
                                    onChange={e=>{formik.handleChange(e); handleCheckClick(e)}}
                                    onBlur={formik.handleBlur}
                                    value="gameStatus"
                                    checked={chosenPreferences?.gameStatus ? true:false}
                                /><label htmlFor="gameStatus" className="ms-3 me-3 swg-text-color">Game Status News</label>
                            </div>
                        </div>
                            <span className="mt-3 col-8 d-flex justify-content-end">
                                <input type="submit" value="Update  Preferences" className="btn swg-btn-color"/>
                            </span>
                    </div>
                    <span className="d-flex flex-column col-5 mx-auto justify-content-start">
                        <span className="d-flex mb-3 mx-auto">
                            <input
                                className="swg-checks"
                                type="checkbox"
                                name="unsubscribe"
                                id="unsubscribe"
                                onChange={(e)=> {setIsChecked(!isChecked)}}
                                checked={isChecked ? "checked":null}
                            /><label htmlFor="unsubscribe" className="ms-3 me-3 swg-text-color">Unsubscribe?</label>
                        </span>
                        {
                           isChecked? <button type="button" onClick={(e)=> {handleDelete(formik.values.id)}} className="btn btn-danger swg-danger-btn">Yes Unsubscribe</button>:null
                        }
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Edit