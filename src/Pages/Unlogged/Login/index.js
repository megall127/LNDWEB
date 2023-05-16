import React, { useState } from "react";
import { Body, ButtonLnd, CardLogin, InputLnd, InputsContainers, Logo } from "./styled";
import lnd from "../../../assets/img/LND_2.png"
import api from "../../../service/api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import GlobalStateContext from "../../Context/GlobalStateContext";



const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigation = useNavigate()

    const {setUserInfos} = useContext(GlobalStateContext);

    const loginHandle = () => {
        api.post('/login',{
            email: email,
            password: password
        })
        .then((res) => {
            localStorage.setItem("@token", res.data.token.token)
            navigation('/home')
            setUserInfos(res.data.user)
        })
        .catch((err) => {
            console.log(err)
        })
    }


    return(
        <Body>
            <CardLogin>
                <Logo src={lnd}/>
                <InputsContainers>
                    <InputLnd placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}></InputLnd>
                    <InputLnd type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}></InputLnd>
                    <ButtonLnd onClick={() => loginHandle()}>Login</ButtonLnd>
                </InputsContainers>
            </CardLogin>
        </Body>
    )

}

export default Login;