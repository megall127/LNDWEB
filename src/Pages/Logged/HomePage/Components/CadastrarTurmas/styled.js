import styled from "styled-components";


export const Body = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`

export const ButtonYellow = styled.button`
    background: #FFCD03;
    border-radius: 10px;
    width: 200px;
    height: 48px;
    border: none;
    color: white;
    margin-top: 20px;
    cursor: pointer;

    :hover{
        background-color: black;
        color: #FFCD03;
    }
`