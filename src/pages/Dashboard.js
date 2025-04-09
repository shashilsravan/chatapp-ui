import React from "react";
import iphone from '../assets/icons/iphone.png'
import circle1 from '../assets/icons/circle1.png'
import circle2 from '../assets/icons/circle2.png'
import polygons from '../assets/icons/polygons.png'
import spiral from '../assets/icons/spiral.png'
import strips from '../assets/icons/strips.png'
import peoples from '../assets/icons/peoples.png'
import { PlayCircle } from "@phosphor-icons/react";


const Dashboard = () => {
    return (
        <div className="vh-100 vw-100 d-flex align-items-center">
            <div className="h-100 w-50 d-flex justify-content-center align-items-center" style={{ backgroundColor: "rgb(244 239 233)" }}>
                <img src={iphone} width="250px" height="500px" />
            </div>
            <div className="h-100 w-50 position-relative" style={{ backgroundColor: "#1c1c25" }}>
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

                <div className="position-absolute d-flex flex-column" style={{ top: "200px", left: "40px" }}>
                    <div className="text-white fw-600 orbitron-family" style={{ fontSize: "44px" }}>Empowering Your <br/> Financial Dreams <br /> Start Here</div>
                    <div className="mt-22px fs-14px text-white fw-400">Welcome to a world of financial possibilities. We're here to empower  your dreams <br /> and your future </div>
                    <div className="mt-32px d-flex align-items-center gap-16px">
                        <div className="d-flex align-items-center justify-content-center fs-12px fw-400" style={{ height: "50px", width: "150px", backgroundColor: "#14c5cb" }}>
                            Get Started
                        </div>
                        <div className="d-flex align-items-center gap-8px">
                            <PlayCircle size={16} color="#14c5cb" />
                            <div className="fs-12px fw-500 text-white">Watch Video</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
