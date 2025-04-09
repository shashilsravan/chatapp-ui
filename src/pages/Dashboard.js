import React from "react";
import iphone from '../assets/icons/iphone.png'
import circle1 from '../assets/icons/circle1.png'
import circle2 from '../assets/icons/circle2.png'
import polygons from '../assets/icons/polygons.png'
import spiral from '../assets/icons/spiral.png'
import star1 from '../assets/icons/Star1.png'
import strips from '../assets/icons/strips.png'
import peoples from '../assets/icons/peoples.png'
import long_bar from '../assets/icons/long_bar.png'
import Sparkle from '../assets/icons/Sparkle.png'
import TypingEffect from "../components/TypingEffect";
import { useNavigate } from "react-router";

const Dashboard = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/details");
    };

    return (
        <div className="vh-100 vw-100 d-flex align-items-center">
            <div className="w-100 position-absolute" style={{ top: 0, left: 0, zIndex: 3 }}>
                <div className="container p-3 d-flex align-items-center w-100" style={{ gap: 24 }}>
                    <img src="https://www.cdnlogo.com/logos/h/74/hdfc-bank.svg" className="me-2" height={28} />

                    {["Credit/Debit Cards", "Accounts", "Deposits", "Loans", "Bonds"].map((item, index) => (
                        <p className="fs-12px font-numans" key={index} style={{ color: "#141615", fontWeight: 600 }}>{item}</p>
                    ))}
                </div>
            </div>
            <div className="h-100 w-50 d-flex justify-content-center align-items-center position-relative" style={{ backgroundColor: "rgb(244 239 233)" }}>
                <div className="position-absolute" style={{ top: "100px", left: "100px" }}>
                    <img src={star1} height="24px" />
                </div>
                <img src={iphone} width="250px" height="500px" />
            </div>
            <div className="h-100 w-50 position-relative" style={{ backgroundColor: "#1c1c25" }}>
                <div className="position-absolute" style={{ top: "220px", left: "-18px" }}>
                    <img src={Sparkle} height="40px" />
                </div>
                <div className="position-absolute" style={{ top: "70px", right: "100px" }}>
                    <img src={star1} height="24px" />
                </div>
                <div className="position-absolute" style={{ top: "290px", left: "-5px" }}>
                    <img src={long_bar} height="280px" />
                </div>
                <div className="position-absolute" style={{ top: "30px", left: "40px" }}>
                    <img src={circle1} width="500px" height="500px" />
                </div>

                <div className="position-absolute" style={{ top: "500px", left: "5px" }}>
                    <img src={polygons} width="100px" height="100px" />
                </div>
                <div className="position-absolute" style={{ bottom: "10px", right: "0px" }}>
                    <img src={circle2} width="300px" height="280px" />
                </div>
                <div className="position-absolute" style={{ bottom: "30px", left: "90px" }}>
                    <img src={strips} width="30px" height="100px" />
                </div>
                <div className="position-absolute" style={{ bottom: "90px", left: "250px" }}>
                    <img src={spiral} width="30px" height="45px" />
                </div>
                <div className="position-absolute" style={{ bottom: "40px", right: "40px" }}>
                    <img src={peoples} width="100px" height="100px" />
                </div>

                <div className="position-absolute d-flex flex-column" style={{ top: "194px", left: "50px" }}>
                    <TypingEffect text={"Empowering Your Financial Dreams Start Here ..."}></TypingEffect>
                    <div className="mt-0 fs-14px text-white fw-400" style={{ width: "60%" }}>Welcome to a world of financial possibilities. We're here to empower  your dreams and your future </div>
                    <div onClick={handleClick} className="cursor text-white d-flex align-items-center justify-content-center fs-13px fw-bold mt-32px" style={{ height: "50px", width: "150px", backgroundColor: "#14c5cb" }}>
                        Get Started
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
