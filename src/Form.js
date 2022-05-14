import React, { useState } from 'react'
import './Form.css'
export default function Form(props) {
    // Update form
    const [form, setform] = useState({ id: null, name:undefined, email:undefined, phoneNo:undefined})
    // For hide or cancle the form when click on button
    const cancle=()=>{
        props.showEditForm()
    }
    // Set the value of input
    const handleOnChange = (e) => {
        setform({...form, [e.target.id]:e.target.value });
    }
    // Update the details the in the database
    const conform= async () =>{
        const host = "http://localhost:5000/update";
         await fetch(host, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id:props.Id, name:form.name, email:form.email, phoneNo:form.phoneNo})
        });
    }
    return (
        <>
        {props.hideEditForm &&
            <form method='put' className='editForm'>
                <p className='titleForm'>Update Details</p>
                <input className='edit' type="text" id='name' onChange={handleOnChange}  placeholder='Enter Your Name'></input>
                <input className='edit' type="email" id='email' onChange={handleOnChange} placeholder='Enter Your Email'></input>
                <input className='edit' type="number" id='phoneNo' onChange={handleOnChange} placeholder='Enter Your PhoneNO'></input>
                <button className='formBtn' onClick={conform()}>Conform</button>
                <button className='formBtn ' onClick={cancle}>Cancle</button>
            </form>
            }
        </>
    )
}
