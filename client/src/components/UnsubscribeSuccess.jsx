import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";

const UnsubscribeSuccess = () => {
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
            <div className="APP">
                <h1 className="swg-head-color">Thank you for visiting.</h1>
                <h4 className="swg-head-color">Your unsubscribe request has been processed and your information has been removed from our systems.</h4>
                <p className="swg-text-color">This page will automatically re-direct to the home page. If it does not click <Link to={"/"} className="text-decoration-none">here</Link></p>
            </div>
        </div>
    )
}

export default UnsubscribeSuccess