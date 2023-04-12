import React from "react";
import swgLogo from "../extras/imgs/swg-logo.png";

const Navbar = () => {

    return (
        <div className="APP">
            <nav className="navbar navbar-expand-xl navbar-light bg-light swg-bg-nav">
                <div className="container-fluid">
                    <a className="navbar-brand w-auto swg-anchor-hover" href="/"><img className="swg-logo" src={swgLogo} alt="SWG logo"></img></a>
                    <button className="navbar-toggler swg-btn-bg" type="button" data-bs-toggle="collapse" data-bs-target="#navbarBasic"
                            aria-controls="navbarBasic" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon "></span>
                    </button>
                    <div className="collapse navbar-collapse show " id="navbarBasic">
                        <ul className="navbar-nav me-auto mb-2 mb-xl-0 swg-ul-text">
                            <li className="nav-item">
                                <a className="nav-link swg-nav-text" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link swg-nav-text" href="/search">Check Email Preferences</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link swg-nav-text" href="/Subscribe" >Sign Up</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar