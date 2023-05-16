import React, { useEffect, useState } from "react";
import BigCalendar from "./components/BigCalendar";
import { Body, ButtonYellow, FormEvent, InputEvent, InputEventSelect, InputEventText } from "./styled";
import  {Calendar} from 'primereact/calendar';
import { InputText } from "primereact/inputtext";
import { useSession , useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react";
import { RRule } from "rrule";
import { Dropdown } from "primereact/dropdown";
import api from "../../../../../service/api";




const Agenda = () => {
    const [myEventsList, setMyEventsList] = useState([])
    const [myEventsRoom, setMyEventsRoom] = useState([])
    const [datetime24h, setDateTime24h] = useState(null);
    const [datetime24hB, setDateTime24hB] = useState(null);
    const [title, setTitle] = useState("")
    const [Room, setRoom] = useState(1)
    const [selectedOptions, setSelectedOptions] = useState(null);


    const session = useSession();
    const supabase = useSupabaseClient();
    const {isLoading} = useSessionContext();


    
    const options = [
      { name: 'Sala 1', code: 1 },
      { name: 'Sala 2', code: 2 },
      { name: 'Sala 3', code: 3 },
      { name: 'Sala 4', code: 4 },
      { name: 'Salão', code: 5 },
  ];


  useEffect(() => {
    api.post('/takeclass',{
      roomSelect: selectedOptions?.code
    })
    .then((res) => {
      let newArray = []
      res.data.map((itens) => {
        for (let i = 0; i < 60; i += 7) {
          const startDate = new Date(itens?.start);
          startDate.setDate(startDate.getDate() + i);
          const endDate = new Date(itens?.end);
          endDate.setDate(endDate.getDate() + i);
          newArray.push({
            title: itens.name,
            allDay: false,
            start: startDate,
            end: endDate,
          });
        }
      })
      setMyEventsRoom(newArray)
    })
    .catch((err) => {
      console.log(err)
    })

  },[selectedOptions])


    async function createCalendarEvent() {
        console.log("Creating calendar event");
        const event = {
          'summary': title,
          'description': "eventDescription",
          'start': {
            'dateTime': datetime24h, // Date.toISOString() ->
            'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone // America/Los_Angeles
          },
          'end': {
            'dateTime': datetime24hB, // Date.toISOString() ->
            'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone // America/Los_Angeles
          }
        }
        await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
          method: "POST",
          headers: {
            'Authorization':'Bearer ' + session.provider_token // Access token for google
          },
          body: JSON.stringify(event)
        }).then((data) => {
          return data.json();
        }).then((data) => {
          console.log(data);
          alert("Event created, check your Google Calendar!");
        });
      }


      async function getCalendarEvents() {
        const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/leandro.wilker132@gmail.com/events", {
          method: "GET",
          headers: {
            'Authorization': 'Bearer ' + session.provider_token // Access token for google
          }
        });
        const data = await response.json(); // Array of all events in the primary calendar "RRULE:FREQ=DAILY"
        let newArray = []
        let array = data?.items.map((item,index) => {
          if (item?.recurrence?.indexOf("WEEKLY") !== -1){
            newArray.push({
              title: item.name,
              allDay: false,
              start: new Date(item?.start?.dateTime),
              end: new Date(item?.end?.dateTime),
            })
          } else if(item?.recurrence?.indexOf("DAILY") !== -1){
            newArray.push({
              title: item.name,
              allDay: false,
              start: new Date(item?.start?.dateTime),
              end: new Date(item?.end?.dateTime),
            })
          } else {
            for (let i = 0; i < 60; i += 7) {
              const startDate = new Date(item?.start?.dateTime);
              startDate.setDate(startDate.getDate() + i);
              const endDate = new Date(item?.end?.dateTime);
              endDate.setDate(endDate.getDate() + i);
              newArray.push({
                title: item.summary,
                allDay: false,
                start: startDate,
                end: endDate,
              });
            }
        }
        }) 
        console.log(data)
        setMyEventsList(newArray)
        alert("Eventos obtidos com sucesso!");
      }
      


    async function googleSignIn() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                scopes: 'https://www.googleapis.com/auth/calendar'
            }

        })
        if(error) {
            alert("Error logging in to Google provider with Supabase");
            console.log(error);
          }
    }

    async function signOut() {
        await supabase.auth.signOut();
      }


    return(
    <Body>
             <Dropdown value={selectedOptions} style={{marginBottom: 40, alignSelf: "center", marginRight: 200}} onChange={(e) => setSelectedOptions(e.value)} options={options} optionLabel="name"
                        placeholder="Selecione a Sala" className="w-full md:w-14rem" />
      <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
        <BigCalendar myEventsList={myEventsRoom} setMyEventsList={setMyEventsList}  />
    <FormEvent>
        <text>Marcar um evento</text>
        <div>
        <InputText placeholder="Título" style={{marginTop: 10}} value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <text>Inicio</text>
        <div>
        <Calendar id="calendar-24h" value={datetime24h} onChange={(e) => setDateTime24h(e.value)} showTime hourFormat="24" />
        </div>
        <text>Final</text>
        <div>
        <Calendar id="calendar-24h" value={datetime24hB} onChange={(e) => setDateTime24hB(e.value)} showTime hourFormat="24" />
        </div>
        {session ?  
            <>
                <ButtonYellow onClick={() => createCalendarEvent()}>Adicionar</ButtonYellow>
                <ButtonYellow onClick={() => getCalendarEvents()}>Pegar</ButtonYellow>
                <ButtonYellow onClick={() => signOut()}>Singout</ButtonYellow>
                </>   :
        <ButtonYellow onClick={() => googleSignIn()}>SingIn</ButtonYellow> 
        }
    </FormEvent>
    </div>
    </Body>
    )
}

export default Agenda;