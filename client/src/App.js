import './App.css';
import Navbar from "./components/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Preferences from "./components/Preferences";
import Subscribe from "./components/Subscribe";
import Edit from "./components/Edit";
import {useState} from "react";
import SubscribeSuccess from "./components/SubscribeSuccess";
import UnsubscribeSuccess from "./components/UnsubscribeSuccess";

function App() {
    const [backendErrors,setBackendErrors] = useState([])
  return (
    <div className="App swg-site-bg">
        <Navbar/>
        <BrowserRouter>
            <Routes>
                <Route element={<Home/>} path="/"/>
                <Route element={<Preferences/>} path="/search"/>
                <Route element={<Subscribe backendErrors={backendErrors} setBackendErrors={setBackendErrors}/>} path="/subscribe"/>
                <Route element={<Edit backendErrors={backendErrors} setBackendErrors={setBackendErrors}/>} path="/edit/:id"/>
                <Route element={<SubscribeSuccess/>} path="/success"/>
                <Route element={<UnsubscribeSuccess/>} path="/unsubsuccess"/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
