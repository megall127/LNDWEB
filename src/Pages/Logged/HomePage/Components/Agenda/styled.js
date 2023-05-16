import styled from "styled-components";




export const Body = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export const FormEvent = styled.div`
    margin-left: 20px;



`
export const InputEvent = styled.input`
    margin: 10px;
    width: 60px;


`
export const InputEventText = styled.input`
    margin: 10px;
`
export const InputEventSelect = styled.select`
    margin: 10px;
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