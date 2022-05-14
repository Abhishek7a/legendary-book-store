import React from 'react'
import "./Alert.css"

export default function Alert(props) {
    // When click on yes button in alert while return book 
    const ok = () => {
        props.showConform(null);
        props.showAlert("green", "Sucess", "Your book is sucessfully issued");
        props.deleteData();
        props.frontDelete();
    }
    // When click on cancle for cancle return book
    const cancle = () => {
        props.showConform(null);
    }
    return (
        <>
            {props.alert &&
                <div id={`${props.alert ? props.alert.color : ""}`} className="message" >
                    <p id="Message"><b>{props.alert.type}:</b>{props.alert.msg}</p>
                </div>
            }
            {props.conform &&
                <div id="yellow" className="message" >
                    <p id="Message"><b>Alert:</b>{props.conform}</p>
                    <div className="paddingAlert"></div>
                    <button className='btnOk' onClick={ok}>YES</button>
                    <button className='btnCancle' onClick={cancle}>NO</button>
                </div>
            }
        </>
    )
}
