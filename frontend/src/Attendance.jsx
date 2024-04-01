import { useState, useCallback, useEffect } from 'react'
import Calendar from 'react-calendar'
import WeekDates from './WeekDates.jsx'
// import 'react-calendar/dist/Calendar.css'
// import './Calendar.css'

function Attendance() {
    // const [attendanceDates, setAttendanceDates] = useState([])
    const [weekDatesMetrics, setWeekDatesMetrics] = useState({
        selectedDate: '',
        year: '',
        month: '',
        weekStartDay: '',
        weekEndDay: '',
    })
    // const [selectedDate, setSelectedDate] = useState()
    // const [year, setYear] = useState()
    // const [month, setMonth] = useState()
    // const [weekStartDay, setWeekStartDay] = useState()
    // const [weekEndDay, setWeekEndDay] = useState()

    const isLeapYear = useCallback((year) => {
        return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
    })

    const daysInMonth = useCallback((month) => {
        const daysPerMonth = [null, 31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        return daysPerMonth[month]
    })

    const setStartAndEndDatesOfSelectedWeek = useCallback((selectedDate) => {
        let dateObject = new Date(selectedDate)
        let year = dateObject.getFullYear()
        let month = dateObject.getMonth() + 1
        let day = dateObject.getDate()
        let weekStartDay = ''
        let weekEndDay = ''
        // attendanceDates.push(day + '-' + month + '-' + year)
        // setAttendanceDates(attendanceDates)
        // console.log(attendanceDates)

        if ((Math.floor(day / 7) * 7) === 0)
            weekStartDay = 1
        else
            weekStartDay = Math.floor(day / 7) * 7

        if (weekStartDay === 28) {
            if (!isLeapYear(year) && month === 2)
                weekEndDay = weekStartDay + 0
            if (isLeapYear(year) && month === 2)
                weekEndDay = weekStartDay + 1
            if (daysInMonth(month) === 30)
                weekEndDay = weekStartDay + 2
            if (daysInMonth(month) === 31)
                weekEndDay = weekStartDay + 3
        }
        else
            weekEndDay = weekStartDay + 6

        const weekDatesMetricsTemp = {
            selectedDate: selectedDate,
            year: year,
            month: month,
            weekStartDay: weekStartDay,
            weekEndDay: weekEndDay,
        }

        setWeekDatesMetrics(weekDatesMetricsTemp)

        console.log('selectedDate = ' + selectedDate)
        console.log('Metrics : ' + JSON.stringify(weekDatesMetrics))
    })

    return (
        <div>
            <h2>Payroll App</h2>
            <p>Post Employee Attendance</p>
            <div>
                <Calendar
                    // value={selectedDate}
                    onChange={(selectedDate) => {
                        setStartAndEndDatesOfSelectedWeek(selectedDate)
                    }} />
            </div>
            <div>
                <WeekDates
                    year={weekDatesMetrics.year}
                    month={weekDatesMetrics.month}
                    weekStartDay={weekDatesMetrics.weekStartDay}
                    weekEndDay={weekDatesMetrics.weekEndDay}
                />
            </div>
        </div>

    );
}

export default Attendance;
