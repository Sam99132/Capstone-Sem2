import{useState} from "react"


const CalendarApp = () => {
    const daysOfWeek=['Sun',"Mon","Tue","Wed","Thu","Fri","Sat"]
    const monthsOfYear = ["January","February","Martch","April","May","June","July","August","September","October","November","December"]
    
    
    const currentDate = new Date()
    console.log(currentDate)
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth())
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear())
    const [selectedDate,setSelectedDate] = useState(currentDate)
    const [showEventPopup,setShowEventPopup] = useState(false)
    const [events,setEvents] = useState([])
    const [eventTime,setEventTime] = useState({hours:'00',minutes:'00'})
    const [eventText,setEventText] = useState('')
    const[editingEvent,setEditingEvent] = useState(null)
    const daysInMonth = new Date(currentYear,currentMonth+1,0).getDate()

    const firstDayOfMonth = new Date(currentYear,currentMonth,1).getDay()

    const prevMonth=()=>{
        setCurrentMonth((prevMonth)=>(currentMonth===0?11:currentMonth-1))
        setCurrentYear(prevYear=> currentMonth===0?prevYear-1:prevYear)
    }

    const nextMonth=()=>{
        setCurrentMonth((nextMonth)=>(currentMonth===11?0:currentMonth+1))
        setCurrentYear(nextYear=> currentMonth===11?nextYear+1:nextYear)
    }

    const handleDayClick=(day)=>{
        const clickedDate = new Date(currentYear,currentMonth,day)
        const today = new Date()
        
        if (clickedDate >= today || isSameDay(clickedDate,today)){
            setSelectedDate(clickedDate)
            setShowEventPopup(true)
            setEventText("")
            setEventTime({hours:'00',minutes:'00'})
            setEditingEvent(null)
        }
    }

    const isSameDay=(date1,date2)=>{
        return(
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth()&&
            date1.getDate() == date2.getDate()
        )
    }

    const handleEventSubmit = ()=>{
        const newEvent = {
            id : editingEvent?editingEvent.id : Date.now(),
            date: selectedDate,
            time: `${eventTime.hours.padStart(2,'0')}:${eventTime.minutes.padStart(2,'0')}`,
            text: eventText
        }

        let updatedEvents = [...events]
        if (editingEvent){
            updatedEvents = updatedEvents.map((event)=>
                 event.id === editingEvent.id?newEvent:event,)
        }
        else{
            updatedEvents.push(newEvent)
        }

        updatedEvents.sort((a,b)=> new Date(a.date) - new Date(b.date))

        setEvents([updatedEvents])
        setEventTime({hours:'00',minutes:'00'})
        setEventText("")
        setShowEventPopup(false)
        setEditingEvent(null)

    }   

    const handleEditEvent=(event)=>{
        setSelectedDate(new Date(event.date))
        setEventTime({
            hours: event.time.split(":")[0],
            minutes : event.time.split(":")[1],
        })
        setEventText(event.text)
        setEditingEvent(event)
        setShowEventPopup(true)

    }

    const CloseEventPopup=()=>{
        setShowEventPopup(false)
    }

  return (
    <div className="calendar-app">
        <div className="calendar">
            <h1 className="heading">Calendar</h1>
            <div className="navigate-date">
                <h2 className="month">{monthsOfYear[currentMonth]}</h2>
                <h2 className="year">{currentYear}</h2>
                <div className="buttons">
                    <i className="bx bx-chevron-left" onClick={prevMonth}>
                    <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M14.29 6.29 8.59 12l5.7 5.71 1.42-1.42-4.3-4.29 4.3-4.29z"></path></svg>
                    </i>
                    <i className="bx bx-chevron-right" onClick={nextMonth}>
                    <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="m9.71 17.71 5.7-5.71-5.7-5.71-1.42 1.42 4.3 4.29-4.3 4.29z"></path></svg>
                    </i>
                </div>
            </div>
            <div className="weekdays">
                {daysOfWeek.map((day)=>(
                    <span key={day}> {day}</span>))}
            </div>
            <div className="days">
                {[...Array(firstDayOfMonth).keys()].map((_,index)=> (
                <span/>))}

                {[...Array(daysInMonth).keys()].map((day)=>
                <span 
                key={day+1} 
                className={day+1===currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear===currentDate.getFullYear()?"current-day":""} onClick={()=> handleDayClick(day+1)}>{day+1}
                </span>)}
            
            </div>
        </div>
        <div className="events">
            {showEventPopup &&(<div className="event-popup">
                <div className="time-input">
                    <div className="event-popup-time">Time</div>
                    <input 
                        type="number" 
                        name="hours" 
                        min={0} 
                        max={24} 
                        className="hours" 
                        value ={eventTime.hours} 
                        onChange={(e)=>{setEventTime({...eventTime,hours:e.target.value})}}/>
                    <input 
                        type="number" 
                        name="minutes" 
                        min={0} 
                        max={60} 
                        className="minutes"
                        value ={eventTime.minutes} 
                        onChange={(e)=>{setEventTime({...eventTime,minutes:e.target.value})}}/>
                </div>
                <textarea placeholder="Enter Event Text (Maximum 60 Characters)" 
                value={eventText}
                onChange={(e)=>{
                    if (e.target.value.length <= 60){
                        setEventText(e.target.value)
                    }
                }}
                ></textarea>
                <button className="event-popup-btn" onClick={handleEventSubmit}>{editingEvent?"Update Event" : "Add Event"}</button>
                <button className="close-event-popup" onClick={CloseEventPopup}>
                    <i className="bx bx-x"><svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z"></path></svg></i>
                </button>
            </div>)}
            {events.map((event,index)=>(
            <div className="event" key={index}>
                <div className="event-date-wrapper">
                    <div className="event-date">{`${monthsOfYear[event.date.getMonth()]} ${event.date.getDate()} ${event.date.getFullYear()}`}</div>
                    <div className="event-time">{event.time}</div>
                </div>
                
                <div className="event-text">{event.text}</div>
                <div className="event-buttons">
                    <i className="bx bxs-edit-alt" onClick={()=> handleEditEvent(event)}><svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="m17.71 7.29-3-3a.996.996 0 0 0-1.41 0l-11.01 11A1 1 0 0 0 2 16v3c0 .55.45 1 1 1h3c.27 0 .52-.11.71-.29l11-11a.996.996 0 0 0 0-1.41ZM5.59 18H4v-1.59l7.5-7.5 1.59 1.59zm8.91-8.91L12.91 7.5 14 6.41 15.59 8zM11 18h11v2H11z"></path></svg></i>
                    <i className="bx bxs-message-alt-x"><svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z"></path></svg></i>

                </div>
            </div>
            ))}
            
        </div>
    </div>
  )
}

export default CalendarApp