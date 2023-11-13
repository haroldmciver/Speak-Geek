import '../css/home.css'
import image from "../assets/wallpaper.avif";
import Google from "../assets/google.png";
import Meta from "../assets/Meta.png";
import Microsoft from "../assets/Microsoft.png";
import Amazon from "../assets/Amazon.png";
import Deloitte from "../assets/Deloitte.png";
import IBM from "../assets/IBM.png";
import Intel from "../assets/Intel.png";
import Netflix from "../assets/Netflix.png";
import PwC from "../assets/pwclogo.png";
import Uber from "../assets/Uber.png";
import BOA from "../assets/BoA.png";
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';

export default function Home() {

    useEffect(() => {
        // existing ScrollReveal effects
        ScrollReveal().reveal('.animate-slide-in-right', {
            distance: '100px',
            origin: 'right',
            duration: 1300,
            reset: true
        });

        ScrollReveal().reveal('.animate-slide-in-left', {
            distance: '100px',
            origin: 'left',
            duration: 1300,
            reset: true
        });


    }, []);


    return (
        <>
        <div className="home-container">
            <div className="image-container">
                <img src={image} alt="Wallpaper" className="side-image" />
                <h2 className="img-container-text">Modern Way to Interview</h2>
                <p className="paragraph">Practice Behavior and Technical Interviews</p>
            </div>
        </div>
        <div className="confidence-container animate-slide-in-right">
            <h2>Interview with Confidence</h2>
            <p> SpeakGeek simulates behavioral and technical interviews, providing a safe 
                environment for you to prepare effectively and efficiently. We utilize AI to 
                generate instant feedback, offering valuable insights on the strengths and weaknesses
                of your response, to ensure you're prepared for success </p>
        </div>
        <div className="companies-container">
            <h5>Practice Interviews for companies such as:</h5>
            <div className="logos-wrapper" id="company-logos">
                <div className="logos-container">
                    <div className="logo-set">
                        <img src={Google} alt="Google Logo" className="company-logo" />
                        <img src={Meta} alt="Meta Logo" className="company-logo" />
                        <img src={Microsoft} alt="Microsoft Logo" className="company-logo" />
                        <img src={Amazon} alt="Amazon Logo" className="company-logo" />
                        <img src={Deloitte} alt="Deloitte Logo" className="company-logo" />
                        <img src={IBM} alt="IBM Logo" className="company-logo" />
                        <img src={Intel} alt="Intel Logo" className="company-logo" />
                        <img src={Netflix} alt="Netflix Logo" className="company-logo" />
                        <img src={PwC} alt="PwC Logo" className="company-logo" />
                        <img src={Uber} alt="Uber Logo" className="company-logo" />
                        <img src={BOA} alt="BoA Logo" className="company-logo" />
                    </div>
                    <div className="logo-set">
                        <img src={Google} alt="Google Logo" className="company-logo" />
                        <img src={Meta} alt="Meta Logo" className="company-logo" />
                        <img src={Microsoft} alt="Microsoft Logo" className="company-logo" />
                        <img src={Amazon} alt="Amazon Logo" className="company-logo" />
                        <img src={Deloitte} alt="Deloitte Logo" className="company-logo" />
                        <img src={IBM} alt="IBM Logo" className="company-logo" />
                        <img src={Intel} alt="Intel Logo" className="company-logo" />
                        <img src={Netflix} alt="Netflix Logo" className="company-logo" />
                        <img src={PwC} alt="PwC Logo" className="company-logo" />
                        <img src={Uber} alt="Uber Logo" className="company-logo" />
                        <img src={BOA} alt="BoA Logo" className="company-logo" />
                    </div>
                </div>
            </div>
        </div>

        <div className="speakgeek-info-container animate-slide-in-right">
            <h2>How to prepare for interviews using SpeakGeek?</h2>
            <div className="info-section">
                <div className="info-one">
                    <h4>1. Select Your Question Type</h4>
                    <p>Choose from a range of questions with various difficulty levels and companies of your interest.</p>
                </div>
                <div className="info-two">
                    <h4>2. Craft Your Response</h4>
                    <p>Practice makes perfect. Record and re-record your answers until you're confident you've captured your best response.</p>
                </div>
                <div className="info-three">
                    <h4>3. Receive Comprehensive Feedback!</h4>
                    <p>Upon submission, our AI will evaluate your response, providing you with a score and in-depth feedback on aspects like tone, grammar, confidence, and overall performance.</p>
                </div>
            </div>
        </div>

        <div className="green-box animate-slide-in-left">
            <h2> Ready to improve your interview skills?</h2>
            <Link to="/Speaktool/problemset" className="button-28" role="button">Start Now</Link>

        </div>

        </>
    )
}
