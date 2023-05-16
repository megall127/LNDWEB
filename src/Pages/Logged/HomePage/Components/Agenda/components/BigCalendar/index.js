import React from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment, { max } from "moment";
import { useState } from "react";
import { useCallback } from "react";
import { useMemo } from "react";



const cultures = ["pt"]

const lang = {
  en: null,
  'en-GB': null,
  pt: {
    week: 'Semana',
    work_week: 'Semana de trabalho',
    day: 'Dia',
    month: 'Mês',
    previous: 'Anterior',
    next: 'Proximo',
    today: 'Hoje',
    agenda: 'Agenda',

    showMore: (total) => `+${total} mais`,
  },


}


const BigCalendar = ({myEventsList}) => {
    const localizer = momentLocalizer(moment)

    const [culture, setCulture] = useState('pt')
    const [rightToLeft, setRightToLeft] = useState(false)
  
    const cultureOnClick = useCallback(
      ({ target: { value } }) => {
        // really better to useReducer for simultaneously setting multiple state values
        setCulture(value)
        setRightToLeft(value === 'ar-AE')
      },
      [setCulture]
    )
  
    const { defaultDate, messages } = useMemo(
      () => ({
        defaultDate: new Date(2015, 3, 1),
        messages: lang[culture],
      }),
      [culture]
    )



    return(
        <>
        <Calendar
      culture={culture}
      localizer={localizer}
      events={myEventsList}
      messages={messages}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 , width: 800}}
        />
        </>
    )
}

export default BigCalendar;