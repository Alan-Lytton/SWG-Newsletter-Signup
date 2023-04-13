import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";

const SubscribeSuccess = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            navigate("/");
        },10000)
        return ()=>{
            clearTimeout(timeout)
        };
    },[]);

    return (
        <div className="APP">
            <div className="swg-center">
                <h1 className="swg-head-color">Thank you for your interest.</h1>
                <h4 className="swg-head-color">Your submission has been received and we will be in touch with future communications.</h4>
                <p className="swg-text-color">This page will automatically re-direct to the home page. If it does not click <Link to={"/"} className="text-decoration-none">here</Link></p>
            </div>
        </div>
    )
}

export default SubscribeSuccess