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
            <h1>Edit your email preferences below.</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="d-flex flex-column col-3 mx-auto">
                    {
                        formik.touched.name && formik.errors.name ?
                            <p className="text-danger">{formik.errors.name}</p>:null
                    }
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="First Name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {
                        backendErrors?.message ? <p className="text-danger mt-3">Email is already in use.</p>:
                            formik.touched.email && formik.errors.email ?
                                <p className="text-danger mt-3">{formik.errors.email}</p>:null
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
                    {
                        formik.touched.contactPreferences && formik.errors.contactPreferences ?
                            <p className="text-danger mt-3">{formik.errors.contactPreferences}</p>:null
                    }
                    <span className="mt-3 mb-3 d-flex justify-content-between">
                        <input
                            className="mx-auto"
                            type="checkbox"
                            name="contactPreferences"
                            id="contactPreferences"
                            onChange={e=>{formik.handleChange(e); handleCheckClick(e)}}
                            onBlur={formik.handleBlur}
                            value="betaTest"
                            checked={chosenPreferences?.betaTest ? true:false}
                        /><label>Beta Test Opportunities</label>
                        <input
                            className="mx-auto"
                            type="checkbox"
                            name="contactPreferences"
                            id="contactPreferences"
                            onChange={e=>{formik.handleChange(e); handleCheckClick(e)}}
                            onBlur={formik.handleBlur}
                            value="news"
                            checked={chosenPreferences?.news ? true:false}
                        /><label>Company News</label>
                    </span>
                    <span className="mt-1 mb-3 d-flex justify-content-between">
                        <input
                            className="mx-auto"
                            type="checkbox"
                            name="contactPreferences"
                            id="contactPreferences"
                            onChange={e=>{formik.handleChange(e); handleCheckClick(e)}}
                            onBlur={formik.handleBlur}
                            value="deals"
                            checked={chosenPreferences?.deals ? true:false}
                        /><label>Deals and Bundles</label>
                        <input
                            className="mx-auto"
                            type="checkbox"
                            name="contactPreferences"
                            id="contactPreferences"
                            onChange={e=>{formik.handleChange(e); handleCheckClick(e)}}
                            onBlur={formik.handleBlur}
                            value="gameStatus"
                            checked={chosenPreferences?.gameStatus ? true:false}
                        /><label>Game Status News</label>
                    </span>
                    <span className="col-12 d-flex justify-content-end">
                        <input type="submit" value="Update Preferences" className="btn swg-btn-color"/>
                    </span>
                </div>
                <span className="d-flex flex-column col-2 mx-auto justify-content-start">
                    <input
                        className="mx-auto"
                        type="checkbox"
                        name="unsubscribe"
                        id="unsubscribe"
                        onChange={(e)=> {setIsChecked(!isChecked)}}
                        checked={isChecked ? "checked":null}
                    /><label>Unsubscribe?</label>
                    {
                       isChecked? <button type="button" onClick={(e)=> {handleDelete(formik.values.id)}} className="btn btn-danger">Yes Unsubscribe</button>:null
                    }
                </span>
            </form>

        </div>
    )
}

export default Edit