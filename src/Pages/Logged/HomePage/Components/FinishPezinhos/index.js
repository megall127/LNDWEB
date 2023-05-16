import React, { useEffect, useState } from "react";
import api from "../../../../../service/api";
import { Body, ButtonFinish, ButtonModal, ButtonModalOff, ButtonModalOn, ButtonOpenModalEdit, ButtonTeacher, ButtonTeacherON, ContainerDouble, ContainerList, ContainerListText, FormCoitainer, InputEdit, ModalBody, ModalText, MonitorList, SelectTeacher } from "./styled";
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { Dropdown } from 'primereact/dropdown';
import Modal from 'react-modal';
import { ProgressBar } from "react-loader-spinner";
import { useContext } from "react";
import GlobalStateContext from "../../../../Context/GlobalStateContext";


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: "20px",
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25);'
    },
};


const FinishPez = () => {
    const [dataTake, setDataTake] = useState([])
    const [selectedOptions, setSelectedOptions] = useState(null);
    const [selectedOptionsTeacher, setSelectedOptionsTeacher] = useState({});
    const [modalIsOpen, setIsOpen] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [loading, setLoading] = useState(false)
    const [selectMonitor, setSelectMonitor] = useState()
    const [editPezinhosState, setEditPezinhosState] = useState({
        newPesinhos: '',
        newAvulso: '',
        newSubs: ''
    })





    const options = [
        { name: 'Monitor', code: 'MT' },
        { name: 'Professor', code: 'PF' },
        { name: 'Aluno', code: 'AL' },
    ];
    const getInfos = (endpoint) => {
        setLoading(true)
        api.get(endpoint)
            .then((res) => {
                setDataTake(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }

    const clickButton = () => {
        api.get('/closemonth')
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const buttonActive = (value) => {
        api.post("/editvalidade", {
            id: selectedOptionsTeacher?.id,
            validade: value
        })
            .then((res) => {
                console.log("deu bom")
                getInfos('/takeprofessor')
                setIsOpen(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const editPezinhos = ( ) => {
        setLoading(true)
        api.post('/editpesinho',{
            newPesinhos: editPezinhosState.newPesinhos,
            newAvulso: editPezinhosState.newAvulso,
            newSubs: editPezinhosState.newSubs,
            id: selectMonitor
        })
        .then((res) => {
            console.log(res)
            setLoading(false)
            setOpenModalEdit(false)
            getInfos('/takemonitor')
        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
        })  
    }

    function openModal(obj) {
        setIsOpen(true);
        setSelectedOptionsTeacher(obj)
    }
    function handleOpenModalEdit(products) {
        setOpenModalEdit(true)
        setSelectMonitor(products?.id)
    }





    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;

    useEffect(() => {
        if (selectedOptions?.code === 'MT') {
            getInfos('/takemonitor')
        } else if (selectedOptions?.code === 'PF') {
            getInfos('/takeprofessor')
        } else {

        }
    }, [selectedOptions])


    const actionTemplateShowEdit = (products, column) => {
        return (
            <div>
                {products.active === 0 ?
                    <ButtonTeacher onClick={() => openModal(products)}>Pendente</ButtonTeacher>
                    :
                    <ButtonTeacherON onClick={() => openModal(products)}>Ativo</ButtonTeacherON>
                }

            </div>
        )
    }

    const actionTemplateButton = (products, column) => {
        return (
            <div>
                <ButtonOpenModalEdit onClick={() => handleOpenModalEdit(products)}>Editar</ButtonOpenModalEdit>
            </div>
        )
    }

    return (
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
            <FormCoitainer>
                <div style={{ justifySelf: "flex-start", alignSelf: "flex-start" }}>
                    <Dropdown value={selectedOptions} onChange={(e) => setSelectedOptions(e.value)} options={options} optionLabel="name"
                        placeholder="Selecione" className="w-full md:w-14rem" />
                </div>
                <ContainerDouble>
                    {selectedOptions?.code === "MT" ?

                        <DataTable value={dataTake} paginator responsiveLayout="scroll"
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10, 20, 50]}
                            paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                            <Column field="name" header="Name"></Column>
                            <Column field="pesinhos_years" header="Pezinho"></Column>
                            <Column field="pesinhos_month" header="Pezinho Gerado"></Column>
                            <Column field="avulso" header="Pontos por Aulas Avulsas"></Column>
                            <Column field="subs" header="Pontos por Substituição"></Column>
                            <Column field="elogio" header="Elogio"></Column>
                            <Column field="critica" header="Crítica"></Column>
                            <Column field='id' header='Editar' body={actionTemplateButton}> </Column>
                        </DataTable>


                        :

                        <DataTable value={dataTake} paginator responsiveLayout="scroll"
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10, 20, 50]}
                            paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} >
                            <Column field="name" header="Name"></Column>
                            {/* <Column field="elogio" header="Elogio"></Column>
                <Column field="critica" header="Crítica"></Column> */}
                            <Column field="active" body={actionTemplateShowEdit} header="Status"></Column>
                        </DataTable>



                    }
                </ContainerDouble>

            </FormCoitainer>
            <ButtonFinish onClick={() => clickButton()}>Encerrar o Mês</ButtonFinish>
            {modalIsOpen ?
                <ModalBody>
                    <ModalText>{selectedOptionsTeacher?.active === 0 ? 'Você selecionou parar "Ativar". Confirmar essa ação?' : 'Você selecionou para "Desativar" . Confirmar essa ação?'}</ModalText>
                    <div>
                        <ButtonModalOn onClick={() => buttonActive(selectedOptionsTeacher?.active === 0 ? 1 : 0)} >Confirmar</ButtonModalOn>
                        <ButtonModalOff onClick={() => setIsOpen(false)}>Cancelar</ButtonModalOff>

                    </div>
                </ModalBody> :

                null


            }

            {openModalEdit ?
                <ModalBody>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <InputEdit value={editPezinhosState.newPesinhos} onChange={(e) => setEditPezinhosState(prevState => ({...prevState, newPesinhos: e.target.value}))} placeholder="Pezinho Gerado"></InputEdit>
                        {/* <InputEdit value={editPezinhosState.newAvulso} onChange={(e => setEditPezinhosState(prevState => ({...prevState, newAvulso: e.target.value})))} placeholder="Aulas Avulsas"></InputEdit>
                        <InputEdit value={editPezinhosState.newSubs} onChange={(e) => setEditPezinhosState(prevState => ({...prevState, newSubs: e.target.value}))} placeholder="Substituição"></InputEdit> */}
                    </div>
                    <div>
                        <ButtonModalOn onClick={() => editPezinhos()} >Salvar</ButtonModalOn>
                        <ButtonModalOff onClick={() => setOpenModalEdit(false)}>Cancelar</ButtonModalOff>
                    </div>
                </ModalBody> :

                null


            }

        </Body>
    )
}

export default FinishPez;