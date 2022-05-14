import React from 'react'
import './Footer.css'

export default function Footer() {
    return (
        <>
            <div className="centerContent">
                <video src="video3.mp4" controls autoPlay loop muted></video>
                <video src="video3.mp4" controls autoPlay loop muted></video>
                <video src="video3.mp4" controls autoPlay loop muted></video>
            </div>
            <footer id="Services">
                <div>
                    <p id="ser">Services</p>
                </div>
                <div id="logos">
                    <img className="logo" src="mi.PNG" alt="error" />
                    <img className="logo" src="addidas.PNG" alt="error" />
                    <img className="logo" src="pepsi.PNG" alt="error" />
                    <img className="logo" src="samsung.PNG" alt="error" />
                    <img className="logo" src="google.PNG" alt="error" />
                    <img className="logo" src="intel.webp" alt="error" />
                </div>
                <div id="www">
                    <p id="w">www.legandaryBooks.com&copy;</p>
                </div>
            </footer>
        </>
    )
}
