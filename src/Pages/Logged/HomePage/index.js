import React, { useEffect, useState } from "react";
import { Body, ButtonsMenu, HeaderMenu, Logo, Menu } from "./styled";
import lnd from '../../../assets/img/LND_1.png'
import FinishPez from "./Components/FinishPezinhos";
import Agenda from "./Components/Agenda";
import CadastrarTurma from "./Components/CadastrarTurmas";

const HomePage = () => {

    const[selectPage, setSelectPage] = useState(1)

    const selectHandle = () => {
        if(selectPage === 1){
            return(
                <FinishPez/>
            )
        } else if(selectPage === 2) {
            return(
                <Agenda/>
            )
        } else {
            return(
                <CadastrarTurma/>
            )
        }
    }

    return(
        <Body>
            <HeaderMenu>
                <Logo src={lnd}/>
                <ButtonsMenu onClick={() => setSelectPage(1)}>Fechar Pezinhos</ButtonsMenu>
                <ButtonsMenu onClick={() => setSelectPage(2)}>Agenda</ButtonsMenu>
                <ButtonsMenu onClick={() => setSelectPage(3)}>Cadastro de Turmas</ButtonsMenu>
            </HeaderMenu>
            {selectHandle()}
        </Body>
    )
}

export default HomePage;