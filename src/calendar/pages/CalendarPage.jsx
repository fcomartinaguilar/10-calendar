import { Calendar } from "react-big-calendar"
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { addHours } from "date-fns"
import { localizer, getMessagesES } from "../../helpers";
import { CalendarEvent, CalendarModal, NavBar } from "../";
import { useState } from "react";

export const CalendarPage = () => {

    const [lastView, setLastView] = useState( localStorage.getItem( 'lastView' || 'week' ) );

    const eventStyleGetter = ( event, start, end, isSelected ) => {

        const style = {
            backgroundColor: '#347CF7',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
      }

      return {
        style
      }
    }

    const onDoubleClick = ( event ) => {
        // console.log({ doubleClick: event });
        openDateModal();
    }

    const onSelect = ( event ) => {
        // console.log({ click: event });
        setActiveEvent( event );
    }

    const onViewChanged = ( event ) => {
        localStorage.setItem('lastView', event );
        setLastView( event )
    }

    const events = [{
        title: 'Cumpleaños del jefe',
        notes: 'Hay q comprar el pastel',
        start: new Date(),
        end: addHours( new Date(), 2 ),
        bgColor: '#fafafa',
        user: {
            _id: '123',
            name: 'Pepito'
        }
    }]

    return (
        <>
            <NavBar />

            <Calendar
                culture="es"
                localizer={localizer}
                events={events}
                defaultView={ lastView }
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc( 100vh - 80px )' }}
                messages={ getMessagesES() }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelect }
                onView={ onViewChanged }
                components={{
                    event: CalendarEvent
                }}
            />

            {/* <CalendarModal /> */}
        </>
    )
}
