import React, { useEffect, useState } from "react";
import { Body, ButtonYellow } from "./styled";
import { InputText } from "primereact/inputtext";
import  {Calendar} from 'primereact/calendar';
import api from "../../../../../service/api";
import { ProgressBar } from "react-loader-spinner";
import { Dropdown } from "primereact/dropdown";

const CadastrarTurma = () => {
    const [myEventsList, setMyEventsList] = useState([])
    const [datetime24h, setDateTime24h] = useState(null);
    const [datetime24hB, setDateTime24hB] = useState(null);
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [selectedOptions, setSelectedOptions] = useState(null);

    const handleRegister = () => {
        setLoading(true)
        api.post('/registerclass',{
            name: title,
            room: selectedOptions?.code,
            start: datetime24h,
            end: datetime24hB
        })
        .then((res) => {
            setTitle("")
            setDateTime24h("")
            setDateTime24hB("")
            setLoading(false)
            console.log("deu bom")
        })
        .catch((err) => {
            setLoading(false)
            console.log(err)
        })

    }


    const options = [
        { name: 'Sala 1', code: 1 },
        { name: 'Sala 2', code: 2 },
        { name: 'Sala 3', code: 3 },
        { name: 'Sala 4', code: 4 },
        { name: 'Salão', code: 5 },
    ];

    return(
        <Body>
            <div style={{position:"absolute", zIndex:10}}>
            <ProgressBar
                height="80"
                width="80"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass="progress-bar-wrapper"
                borderColor = 'black'
                barColor = '#FFCD03'
                visible={loading}
                />
            </div>
            <view style={{height: 400, width: 500, display: "flex", flexDirection: "column", alignItems: "center"}}>
                <text>Vamos cadastrar uma turma?
                </text>
                <Dropdown value={selectedOptions} style={{marginTop: 10, width: 200}} onChange={(e) => setSelectedOptions(e.value)} options={options} optionLabel="name"
                        placeholder="Selecione" className="w-full md:w-14rem" />
            <InputText placeholder="Título" style={{marginTop: 10, width: 300}} value={title} onChange={(e) => setTitle(e.target.value)} />
            <Calendar placeholder="Começar" style={{marginTop: 10, width: 300}} id="calendar-24h" value={datetime24h} onChange={(e) => setDateTime24h(e.value)} showTime hourFormat="24" />
            <Calendar placeholder="Termina" style={{marginTop: 10, width: 300}} id="calendar-24h" value={datetime24hB} onChange={(e) => setDateTime24hB(e.value)} showTime hourFormat="24" />
            <ButtonYellow onClick={() => handleRegister()}>Cadastrar</ButtonYellow>
            </view>

       

        </Body>
    )
}

export default CadastrarTurma;