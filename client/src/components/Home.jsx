import React from "react";
import {Link} from "react-router-dom";
import draken from "../extras/imgs/draken-island.png"

const Home = () => {

    return (
        <div className="APP">
            <h1 className="mt-3 swg-head-color swg-head-size">Welcome to <span className="swg-lettering">S</span>harp <span className="swg-lettering">W</span>it <span className="swg-lettering">G</span>ames</h1>
            <div className="d-flex flex-column justify-content-center align-items-center mx-auto mt-3">
                <img className="img-fluid swg-draken-img me-4" src={draken} alt="The World of Draken"/>
                <span className="d-flex flex-column mt-3 col-8">
                    <p className="swg-text-color">
                        SWG was formed by a group of friends who wanted to take their gaming experience to a new level and challenge,
                        by making their own concepts come to life. We are currently working on a game built around open world
                        RPG elements set in the world of Draken. A mythical land inhabited by dragons. You will have to grow
                        and evolve as a dragon to overcome the challenges Draken has to offer. Learn to fly, swim, dive and hunt to
                        survive. Many breath types are available ranging from fire, to poison and many magical adaptations can be discovered.
                        Take to the skies with a truly responsive feel as you control  every beat of your wings, and whether you want to
                        hover or accelerate. Follow the link below to sign up for updates and even have a chance to get access to our beta.
                        This game is a work in progress and currently has no release date, but follow us to keep up to date.
                    </p>
                        <Link className="btn align-self-center swg-btn-color" to={"/subscribe"}>Sign Up</Link>
                </span>
            </div>

        </div>
    )
}

export default Home