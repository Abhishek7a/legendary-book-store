import React, { useEffect } from 'react'
import './Status.css'
export default function Status(props) {
    useEffect(() => {
        props.fetchData()
    }, [])
    return (
        <main>
            {
                props.data.length === 0 ? <p className="mainPara">No book is issued</p> :
                    props.data.map((user) => {
                        return <div className="grid">
                            <div className='statusImg'>
                                <img className="imgBorder" src={user.image} alt="Error Load Image" />
                            </div>
                            <div className="mainContent">
                                <div className="content"><b>Name:</b>{user.name}</div>
                                <div className="content"><b>Email:</b>{user.email}</div>
                                <div className="content"><b>Phone no:</b>{user.phoneNo}</div>
                                <div className="content"><b>Address:</b>{user.address}</div>
                                <div className="content"><b>BookName:</b>{user.bookName}</div>
                            </div>
                                <div className="result">Pending!!</div>
                        </div>
                    })}
        </main>
    )
}
