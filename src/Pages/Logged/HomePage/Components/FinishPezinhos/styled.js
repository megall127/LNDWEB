import styled from "styled-components";



export const Body = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`


export const FormCoitainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`
export const ContainerDouble = styled.div`
    display: flex;
`
export const ButtonFinish = styled.button`
   height: 50px;
   width: 150px;
   border: none;
   background-color: #FFDC03;
   margin-top: 50px;
   margin-left: 10%;

   :hover{
        background-color: #ECC500;

    }
`
export const ButtonTeacher = styled.button`
    border: 1px solid #FFCD03;
    height: 33px;
    width: 180px;
    background: #FFFFFF;
    border-radius: 12px;
    text-align: center;
    color: #AEA7A7;
    cursor: pointer;

    :hover{
        background-color: #ECC500;

    }
`
export const ButtonTeacherON = styled.button`
    border: 1px solid #4EB845;
    height: 33px;
    width: 180px;
    background: #FFFFFF;
    border-radius: 12px;
    text-align: center;
    color: #AEA7A7;
    cursor: pointer;

    :hover{
        background-color: #4EB845;

    }
`
export const ModalBody = styled.div`
    position: absolute;
    width: 510px;
    background-color: white;
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const ModalText = styled.text`
    color: #74797A;
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 29px;
    text-align: center;

`

export const ButtonModalOn = styled.button`
    width: 170px;
    height: 48px;
    margin: 14px;
    border: none;
    border-radius: 10px;
    background-color: #FFCD03;
    color: white;
    cursor: pointer;

    :hover{
        border: 1px solid black;
    }
`
export const ButtonModalOff = styled.button`
    width: 170px;
    height: 48px;
    margin: 14px;
    border: none;
    border-radius: 10px;
    background-color: #EA4747;
    color: white;
    cursor: pointer;

    :hover{
        border: 1px solid black;
    }
`

export const ButtonOpenModalEdit = styled.button`
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

export const InputEdit = styled.input`
    height: 48px;
    border: 1px solid #FFCD03;
    width: 200px;
    color: black;
    background: white;
    border-radius: 10px;
    margin: 10px;
`