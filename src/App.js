import './App.css';
import Navigation from './Navigation';
import Home from './Home';
import Footer from './Footer';
import ReturnBook from './ReturnBook';
import Banner from './Banner';
import Status from './Status';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Alert from './Alert';
import { useState } from 'react';
import book from './books';
import Form from './Form';

function App() {
  const books = book.books;
  const URL = `http://localhost:5000/`;
  const [data, setdata] = useState([]);
  const [dbId, setdbId] = useState(null);
  const [hideEditForm, sethideEditForm] = useState(0)
  // For set id of the book
  const Id = (id) => {
    setdbId(id);
  }

  // For fetch the data that stored in database
  const url = `${URL}read`;
  const fetchData = async () => {
    const response = await fetch(url);
    const json = await response.json();
    setdata(json);
  }

  // For return the book means delete the book in the database 
  const uri = `${URL}delete`;
  const deleteData = async () => {
    await fetch(uri, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: dbId })
    });
  }
  
  // for show Alert,Error,Sucess messages with in 3 seconds  
  const [alert, setalert] = useState(null)
  const showAlert = (color, type, msg) => {
    setalert({ color: color, type: type, msg: msg })
    setTimeout(() => {
      setalert(null)
    }, 3000);
  }
  // Set message in the Toast 
  const [conform, setconform] = useState(null)
  const showConform = (msg) => {
    setconform(msg)
  }
  // Set the value of search in useState hook
  const [hideBook, sethideBook] = useState("");
  const search = (e) => {
    sethideBook(e.target.value);
  }
  // For remove the book in the frontend in the returnBook page 
  const [frontendReturnBookDelete, setfrontendReturnBookDelete] = useState(false)
  const frontDelete = () => {
    setfrontendReturnBookDelete(!frontendReturnBookDelete);
  }
  //For Show/Hide the update detials form 
  const showEditForm = () => {
    if (hideEditForm === 0)
      sethideEditForm(1)
    else
      sethideEditForm(0)
  }

  return (
    <>
      <Router>
        <Navigation search={search} />
        <Alert alert={alert} showAlert={showAlert} frontDelete={frontDelete} conform={conform} showConform={showConform} fetchData={fetchData} deleteData={deleteData} />
        <Form hideEditForm={hideEditForm} showEditForm={showEditForm} Id={dbId} />
        <Switch>
          <Route exact path="/" >
            <Banner />
            <Home books={books} showAlert={showAlert} hideBook={hideBook} />
          </Route>
          <Route exact path="/returnBook" >
            <Banner />
            <ReturnBook data={data} setdata={setdata} showAlert={showAlert} showConform={showConform} Id={Id} fetchData={fetchData} deleteData={deleteData} showEditForm={showEditForm} frontDelete={frontDelete} frontendReturnBookDelete={frontendReturnBookDelete} />
          </Route>
          <Route exact path="/status">
            <Status data={data} fetchData={fetchData} />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
