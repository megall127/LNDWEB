import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import HomePage from "../Pages/Logged/HomePage";
import Login from "../Pages/Unlogged/Login";



const Router = () => {



    return(
        <BrowserRouter>
        <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<HomePage/>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default Router;