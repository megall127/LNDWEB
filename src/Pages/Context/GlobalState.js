import React from "react";
import { useState } from "react";
import GlobalStateContext from "./GlobalStateContext";




const GlobalState = (props) => {
    const [userInfos, setUserInfos] = useState()


    const data = {
        setUserInfos,
        userInfos
    }

    return(
        <GlobalStateContext.Provider value={data}>
        {props.children}
        </GlobalStateContext.Provider>
    )
}

export default GlobalState;