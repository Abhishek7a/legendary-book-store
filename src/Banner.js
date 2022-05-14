import React, { useEffect, useState } from 'react'
import './Banner.css'

export default function Banner() {
    // For repeatingly typing text 
    const [type, settype] = useState("");
    let t = 0, txt, text = "";
    const typing = () => {
        txt = "Welcome to Legendary Book store         ";
        if (t < txt.length) {
            text += txt.charAt(t);
            settype(text);
            t++;
            setTimeout(typing, 170);
        }
        else {
            t = 0;
            text = ""
            typing()
        }
    }
    useEffect(() => {
        typing()
    }, [])

    return (
        <div id="banner" style={{ backgroundImage: `url("banner.PNG")` }}>
            <p className="heading">{type}</p>
            <p className="para">
                One best book is equal to hundred frinds but one good friend is equal to a library.
            </p>
        </div>
    )
}
