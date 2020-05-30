import React from 'react'
import {Link} from 'react-router-dom'
import '../css/landingpage.css'
import LoginModal from './LoginModal';

const LandingPage = () => {
    return (
      <div className="lp">
        <div className="row justify-content-end mr-4 pt-2">
          <LoginModal />
        </div>
        <header id="showcase">
          <div className="container showcase-content">
            <h1>StackHack 1.0</h1>
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Molestiae, quasi quam tenetur exercitationem sint suscipit ipsum
              in pariatur officiis mollitia!
            </p>
            <Link
              to="/register"
              className="bttn"
              style={{ textDecoration: "none", color: "inherit" }}>
              Register Now!
            </Link>
          </div>
        </header>
      </div>
    );
}

export default LandingPage
