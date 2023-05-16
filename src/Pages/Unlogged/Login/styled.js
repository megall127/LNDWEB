import styled from "styled-components";



export const Body = styled.div`
    background-color: black;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

`

export const CardLogin = styled.div`
    height: 60vh;
    width: 60vh;
    background-color: white;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Logo = styled.img`
    height: 15vh;
    width: 30vh;
    margin-right: 40px;
`
export const InputsContainers = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50%;
    margin-top: 40px;
`
export const InputLnd = styled.input`
    height: 40px;
    width: 200px;
    margin: 20px;
    border-radius: 10px;
    border-color: black;
`
export const ButtonLnd = styled.button`
    margin-top: 50px;
    height: 40px;
    width: 250px;
    background-color: #FFDC03 ;
    border: none;
    border-radius: 10px;

    :hover{
        background-color: #ECC500;

    }
`



