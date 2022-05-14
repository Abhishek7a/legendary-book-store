import React, { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";
import './Navigation.css'
import './Mobile.css'
export default function Navigation(props) {
    let location = useLocation()
    const handleOnChange = (e) => {
        props.search(e);
    }
    useEffect(() => {
        toggleState()
    }, [])

    // For top loading bar  
    const [load, setload] = useState("1");
    const loading = () => {
        setload("0");
        // When user in the middle of the page and click on nav item then the component is change but user get still middle of the page to solve the problem use this line of code.
        document.documentElement.scrollTop = 0;
        // In which 0 timeout means runs when program is finished
        setTimeout(() => {
            setload("1");
        }, 0);
    }
    // For hiding the nav items for mobile screens
    const [mainMenu, setmainMenu] = useState(true);
    const toggleState = () => {
        setmainMenu(!mainMenu)
    }
    return (
        <>
            <div className={load === "0" ? "unload" : "load"}></div>
            <div id="navigationBar" className="fix">
                <div id="menu" onClick={toggleState}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
                <div className='logoBorder'>
                    <img id="logo" src="logo.jpg" alt="Error Load Image" />
                </div>
                <div className={`${mainMenu === true ? 'middleNav' : 'middleNavHide'}`}>
                    <div className="nav" id={`${location.pathname === "/" ? "nav1" : ""}`}><Link className='navbarItem' onClick={function (event) { loading(); toggleState() }} to="/">Home</Link></div>
                    <div className="nav" id={`${location.pathname === "/returnBook" ? "nav1" : ""}`}><Link className='navbarItem' onClick={function (event) { loading(); toggleState() }} to="/returnBook">ReturnBook</Link></div>
                    <div className="nav" id={`${location.pathname === "/status" ? "nav1" : ""}`}><Link className='navbarItem' onClick={function (event) { loading(); toggleState() }} to="/status">Status</Link></div>
                </div>
                <div id="serch">
                    <a href="#head"><button className="btn">Search</button></a>
                    <svg id="scearchImg" className="scearh" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>
                    <input type="search" className="search" onChange={handleOnChange} placeholder="Search" />
                </div>
            </div>
        </>
    )
}
