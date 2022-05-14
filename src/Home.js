import React, { useState, useEffect, useLocalStorage } from 'react'
import './Home.css'
export default function Home(props) {
    //  save data into database or API call
    let issueBookInDataBase;
    try {
        const host = "http://localhost:5000/";
        issueBookInDataBase = async (id, name, email, phoneNo, address, bookName, dollar, image, paymentMethod, bookMarked) => {
            await fetch(host, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, name, email, phoneNo, address, bookName, dollar, image, paymentMethod, bookMarked })
            });
        }
    } catch (error) {
        console.log("failed to fetch");
    }
    const [bookMarkBtn, setbookMarkBtn] = useState([]);
    const [data, setData] = useState([])
    
    // Set the empty array in the local storage when user visit first time on the weebsite
    if (localStorage.getItem('bookMarked') === null) {
        localStorage.setItem('bookMarked', []);
    }

    // Bookmark functionallity-when click on the book mark button it will goes to the first
    const toogleState = (id) => {
        let storage;
        // Remove the id of the book in the local storage 
        if (localStorage.getItem('bookMarked').includes(id)) {
            storage = localStorage.setItem('bookMarked', JSON.stringify(JSON.parse(localStorage.getItem('bookMarked')).filter((e) => {
                return e !== id;
            })))
            setbookMarkBtn([storage])
        }
        // Set the id of the book in the local storage  
        else {
            if (localStorage.getItem('bookMarked') === "" || localStorage.getItem('bookMarked') === null)
                localStorage.setItem('bookMarked', JSON.stringify([]));
            storage = localStorage.setItem('bookMarked', JSON.stringify(JSON.parse(localStorage.getItem('bookMarked')).concat(id)));
            setbookMarkBtn([storage])
        }
    }
    // Fetch the data from the database
    const URL = `http://localhost:5000/`;
    const url = `${URL}read`;
    const fetchData = async () => {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
    }
    // Make the array of issued books
    let issuedBooks = [];
    data.map((user) => {
        issuedBooks = issuedBooks.concat(user.id);
    })
    issuedBooks = JSON.stringify(issuedBooks);

    useEffect(() => {
        fetchData()
    }, [])

    // Hiding payment visa details if cod is not selected 
    const [form, setform] = useState({ id: undefined, name: undefined, email: undefined, phoneNo: undefined, address: undefined, bookName: undefined, dollar: undefined, image: undefined, paymentMethod: undefined })
    let [visa, setvisa] = useState(true)
    let [cod, setcod] = useState(false)
    let isCod = () => {
        if (cod === false) {
            setcod(true);
            setvisa(false);
            setform({ ...form, paymentMethod: "VISA" })
        }
        else if (visa === false) {
            setcod(false);
            setvisa(true);
            setform({ ...form, paymentMethod: "COD" })
        }
    }

    const [conform, setconform] = useState(0);
    // Fill the details of book in the form when click on the issue button
    const cardTOForm = (Name, dollar, id, image) => {
        setform({ ...form, bookName: Name, dollar: dollar, id: id, image: image });
        setconform("1");
    }

    // Set the value of input
    const handleOnChange = (e) => {
        setform({ ...form, [e.target.id]: e.target.value });
    }

    // Regax-For validation in the form 
    let nameReg = /^[a-zA-Z]([0-9 a-z A-Z]){2,25}$/;
    let emailReg = /^([_\-.0-9a-zA-Z]+)@([_\-.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
    let phoneNoReg = /^([0-9]){10}$/;
    let addressReg = /^[a-zA-Z]([0-9 a-z / : . , A-Z]){7,70}$/;

    // Set the value of dollar when user write the book name in the form
    const handleOnChangeBookName = (e) => {
        setform({ ...form, [e.target.id]: e.target.value });
        setconform("0");
        props.books.map((book) => {
            if (book.name === e.target.value || book.name.toLowerCase() === e.target.value || book.name.toUpperCase() === e.target.value) {
                setconform("1");
                setform({ ...form, [e.target.id]: e.target.value, dollar: book.dollar, id: book.id, image: book.src });
            }
        });

    }
    // Show the toast the book is issued or not when click on the submit button 
    const clickOnHandle = () => {
        if ((!nameReg.test(form.name) || !emailReg.test(form.email) || !phoneNoReg.test(form.phoneNo) || !addressReg.test(form.address) || (!form.name || !form.email || !form.phoneNo || !form.address || !form.bookName))) {
            props.showAlert("red", "Error", "Your book is not issued");
            setform({...form, id: "", name: "", email: "", phoneNo: "", address: "" })
            if (form.bookName === undefined)
                setconform("0");
        }
        else {
            props.showAlert("green", "Sucess", "Your book is sucessfully issued");
            issueBookInDataBase(form.id, form.name, form.email, form.phoneNo, form.address, form.bookName, form.dollar, form.image, "COD", form.bookMarked);
            setform({ name: "", email: "", phoneNo: "", address: "", bookName: "", dollar: "" })
            fetchData()
        }
    }

    return (
        <>
            <div className='backgroundImage' style={{
                backgroundImage: `url("background.png")`,
                backgroundSize: "cover",
                opacity: "0.9"
            }}>
                <div id="head">
                    <p >Available Books</p>
                </div>
                <div id="booksContainer">
                    {props.books.map((book) => {
                        return <div key={book.id} className={localStorage.getItem('bookMarked').includes(book.id) ? "frontIssueBtn" : "frontIssued"} id={book.name.toLowerCase().includes(props.hideBook) ? "unHide" : "hide"} >
                            <h3 className='card'>
                                <button className={localStorage.getItem('bookMarked').includes(book.id) ? "bookmarked" : "bookMarkBtn"} onClick={() => { toogleState(book.id) }}>BookMark</button>
                                <div className='padding'></div>
                                <div className='mainSide'>
                                    <div className='imageSide'>
                                        <img className="img" src={book.src} alt="Error Load Image" />
                                        <span className="prize red">{book.dollar}$</span>
                                    </div>
                                    <div className='nameSide'>
                                        {props.hideBook === '' ?
                                            <p className='bookName'>{book.name}</p> : <>
                                                {book.name.toLowerCase().includes(props.hideBook) ? <p className='block'>
                                                    <span >{book.name.toLowerCase().split(props.hideBook)[0]}</span>
                                                    <span className='red '>{book.name.charAt(0) === props.hideBook.toUpperCase().charAt(0) ? book.name.charAt(0).toUpperCase() + props.hideBook.slice(1, props.hideBook.length) : props.hideBook}</span>
                                                    <span >{book.name.toLowerCase().split(props.hideBook)[1]}</span>
                                                </p> : <p>{book.name}</p>
                                                }
                                            </>
                                        }
                                        {issuedBooks.includes(book.id) ? <a  ><button className="issuedBtn">Issued</button></a> :
                                            <a href="#Issue Book"><button onClick={() => { cardTOForm(book.name, book.dollar, book.id, book.src) }} className="issuBtn">Issue</button></a>
                                        }
                                    </div>
                                </div>
                                <div className="rating">
                                    <svg className="fullStar" viewBox="0 0 576 512"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>

                                    <svg className="fullStar" viewBox="0 0 576 512"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>

                                    <svg className="fullStar" viewBox="0 0 576 512"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>

                                    <svg className="fullStar" viewBox="0 0 576 512"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>

                                    {book.star === "empty star.PNG" ? <svg className="fullStar" viewBox="0 0 576 512"><path fill="currentColor" d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path></svg> : <svg className="fullStar" viewBox="0 0 536 512"><path fill="currentColor" d="M508.55 171.51L362.18 150.2 296.77 17.81C290.89 5.98 279.42 0 267.95 0c-11.4 0-22.79 5.9-28.69 17.81l-65.43 132.38-146.38 21.29c-26.25 3.8-36.77 36.09-17.74 54.59l105.89 103-25.06 145.48C86.98 495.33 103.57 512 122.15 512c4.93 0 10-1.17 14.87-3.75l130.95-68.68 130.94 68.7c4.86 2.55 9.92 3.71 14.83 3.71 18.6 0 35.22-16.61 31.66-37.4l-25.03-145.49 105.91-102.98c19.04-18.5 8.52-50.8-17.73-54.6zm-121.74 123.2l-18.12 17.62 4.28 24.88 19.52 113.45-102.13-53.59-22.38-11.74.03-317.19 51.03 103.29 11.18 22.63 25.01 3.64 114.23 16.63-82.65 80.38z"></path></svg>
                                    }
                                </div>
                                <p className="para2">{book.disc.length < 52 ? book.disc : book.disc.slice(0, 52) + "..."}</p>
                            </h3>
                        </div>
                    })}
                </div>
            </div>
            <main style={{
                backgroundImage: `url("library 3.PNG")`,
                opacity: "0.9",
            }}>
                <div id="Issue Book"></div>
                <div id="cu">
                    <p id="headingBook">IssueBook</p>
                </div>
                <div id="form">
                    <form action="/" method="post"></form>
                    <div>
                        <label htmlFor="text" >Name</label>
                        <input type="text" value={form.name} className={!nameReg.test(form.name) && form.name !== undefined ? "title1 valid" : "title1 validPro"} id="name" onChange={handleOnChange} placeholder="Enter your name" /> {!nameReg.test(form.name) && form.name !== undefined && <small className="errorWord">Enter valid name</small>}
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" value={form.email} className={!emailReg.test(form.email) && form.email !== undefined ? "title1 valid" : "title1 validPro"} id="email" onChange={handleOnChange} placeholder="Enter your email" required={true} />{!emailReg.test(form.email) && form.email !== undefined && <small className="errorWord">Enter valid email</small>}
                    </div>
                    <div>
                        <label htmlFor="number">Phone no.</label>
                        <input type="number" value={form.phoneNo} className={!phoneNoReg.test(form.phoneNo) && form.phoneNo !== undefined ? "title1 valid" : "title1 validPro"} id="phoneNo" onChange={handleOnChange} placeholder="Enter your phone no." required />{!phoneNoReg.test(form.phoneNo) && form.phoneNo !== undefined && <small className="errorWord">Enter valid phone no.</small>}
                    </div>
                    <div>
                        <label htmlFor="text">Address</label>
                        <input type="text" value={form.address} className={!addressReg.test(form.address) && form.address !== undefined ? "title1 valid" : "title1 validPro"} id="address" onChange={handleOnChange} placeholder="Enter your address" required />{!addressReg.test(form.address) && form.phoneNo !== undefined && <small className="errorWord">Enter valid address </small>}
                    </div>
                    <div>
                        <label htmlFor="textarea">Book name</label>
                        <input type="textarea" id="bookName" value={form.bookName} onChange={handleOnChangeBookName} className={conform === "0" && conform !== null ? "title1 valid" : "title1 validPro"} placeholder="Enter book name " required />
                        {conform === "0" && conform !== null && <small className="errorWord">Enter valid book name </small>}
                    </div>
                    <label htmlFor="text">Dollar($)</label>
                    <input type="number" value={conform === "1" ? form.dollar : "0"} readOnly={true} className={conform === "0" && conform !== null ? "title1 valid" : "title1 validPro"} />

                    <label htmlFor="radio">Payment method</label>
                    <div id="paymentMethod">
                        <input type="radio" onClick={isCod} className="inline" onChange={handleOnChange} name="paymentMethod" checked={visa === true ? "checked" : ""} />
                        <img className="PaymentImg" src="visa.PNG" alt="" />
                        <input type="radio" onClick={isCod} className="inline" onChange={handleOnChange} name="paymentMethod"
                            checked={cod === true ? "checked" : ""}
                        />
                        <img className="PaymentImg" src="cod.PNG" alt="" />
                    </div>
                    {cod === false &&
                        <div className="cod">
                            <label htmlFor="numeber">Card number</label>
                            <input type="number" className="title1 " id="phoneNo" onChange={handleOnChange} placeholder="Enter your phone no." />
                            <label htmlFor="date">Expiration Date</label>
                            <input type="date" className="Special" onChange={handleOnChange} />

                            <label htmlFor="password" >CVV</label>
                            <input type="password" className="title1" onChange={handleOnChange} placeholder="Enter CVV" />
                        </div>
                    }
                    <label htmlFor="submit" className="title1" label />
                    <button className="subBtn" onClick={clickOnHandle}>Submit</button>
                </div>
            </main>
        </>
    )
}
