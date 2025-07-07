import{useState} from "react"


const CalendarApp = () => {
    const daysOfWeek=['Sun',"Mon","Tue","Wed","Thu","Fri","Sat"]
    const monthsOfYear = ["January","February","Martch","April","May","June","July","August","September","October","November","December"]
    
    
    const currentDate = new Date()
    console.log(currentDate)
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth())
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear())
    
    const daysInMonth = new Date(currentYear,currentMonth+1,0).getDate()

    const firstDayOfMonth = new Date(currentYear,currentMonth,1).getDay()

    const prevMonth=()=>{
        setCurrentMonth((prevMonth)=>(prevMonth===0?11:prevMonth-1))
        setCurrentYear(prevYear=> currentMonth===0?prevYear-1:prevYear)
    }

    const nextMonth=()=>{
        setCurrentMonth((nextMonth)=>(nextMonth===11?0:nextMonth+1))
        setCurrentYear(nextYear=> currentMonth===11?nextYear+1:nextYear)
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
                {daysOfWeek.map((day)=><span key={day}> {day}</span>)}
            </div>
            <div className="days">
                {[...Array(firstDayOfMonth).keys()].map((_,index)=> (
                <span key={`empty-${index}`}/>))}


            {[...Array(daysInMonth).keys()].map((day)=>
            <span key={day+1}>{day+1}</span>)}
            
            </div>
        </div>
        <div className="events">
            <div className="event-popup">
                <div className="time-input">
                    <div className="event-popup-time">Time</div>
                    <input type="number" name="hours" min={0} max={24} className="hours"/>
                    <input type="number" name="minutes" min={0} max={60} className="minutes"/>


                </div>
                <textarea placeholder="Enter Event Text (Maximum 60 Characters) "></textarea>
                <button className="event-popup-btn">Add Event</button>
                <button className="close-event-popup">
                    <i className="bx bx-x"><svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z"></path></svg></i>
                </button>
            </div>
            <div className="event">
                <div className="event-date-wrapper">
                    <div className="event-date">July 1 2025</div>
                    <div className="event-time">21:00</div>

                </div>
                <div className="event-text">capstone Project Work</div>
                <div className="event-buttons">
                    <i className="bx bxs-edit-alt"><svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="m17.71 7.29-3-3a.996.996 0 0 0-1.41 0l-11.01 11A1 1 0 0 0 2 16v3c0 .55.45 1 1 1h3c.27 0 .52-.11.71-.29l11-11a.996.996 0 0 0 0-1.41ZM5.59 18H4v-1.59l7.5-7.5 1.59 1.59zm8.91-8.91L12.91 7.5 14 6.41 15.59 8zM11 18h11v2H11z"></path></svg></i>
                    <i className="bx bxs-message-alt-x"><svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z"></path></svg></i>

                </div>
            </div>
        </div>
    </div>
  )
}

export default CalendarApp