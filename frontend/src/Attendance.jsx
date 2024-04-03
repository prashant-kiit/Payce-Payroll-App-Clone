import { useState, useCallback, } from 'react'
import Calendar from 'react-calendar'
import WeekDates from './WeekDates.jsx'
// import 'react-calendar/dist/Calendar.css'

function Attendance() {
    // const [empId, setEmpId] = useState(935065)
    const [weekDatesMetrics, setWeekDatesMetrics] = useState({
        selectedDate: null,
        year: null,
        month: null,
        weekStartDay: null,
        weekEndDay: null,
        startDayIndex: null,
    })
    const [attendanceDates, setAttendanceDates] = useState({})
    const [attendanceDayWise, setAttendanceDayWise] = useState({})

    const daysPerMonth = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    const checkLeapYear = useCallback((year) => {
        return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
    })

    const getFirstSunDay = useCallback((year, month) => {
        const firstDayOfMonth = new Date(year, month, 1)
        return 1 + 7 - firstDayOfMonth.getDay()
    })

    const getMonthWisegetStartAndEndWeekDayAndEndWeekDaysMatrix = useCallback((month, year) => {
        const firstSunDay = getFirstSunDay(year, month)
        const isLeapYear = checkLeapYear(year)
        const daysInMonth = daysPerMonth[month]
        const matrix = [[1, firstSunDay],
        [firstSunDay + 1, firstSunDay + 7],
        [firstSunDay + 8, firstSunDay + 14],
        [firstSunDay + 15, firstSunDay + 21],
        [firstSunDay + 22, month === 1 ? (isLeapYear ? 29 : 28) : daysInMonth]]
        console.log(matrix)
        return matrix
    })

    const getStartAndEndWeekDay = useCallback((year, month, day) => {
        let weekStartDay = 0
        let weekEndDay = 0
        const monthWisegetStartAndEndWeekDayAndEndWeekDaysMatrix = getMonthWisegetStartAndEndWeekDayAndEndWeekDaysMatrix(month, year)
        for (let i = 0; i < monthWisegetStartAndEndWeekDayAndEndWeekDaysMatrix.length; i++) {
            console.log(monthWisegetStartAndEndWeekDayAndEndWeekDaysMatrix[i])
            const weekDayRange = monthWisegetStartAndEndWeekDayAndEndWeekDaysMatrix[i]
            if (day >= weekDayRange[0] && day <= weekDayRange[1]) {
                weekStartDay = weekDayRange[0]
                weekEndDay = weekDayRange[1]
                break
            }
        }
        return [weekStartDay, weekEndDay]
    })

    const setStartAndEndDatesOfSelectedWeek = useCallback((selectedDate) => {
        const dateObject = new Date(selectedDate)
        const year = dateObject.getFullYear()
        const month = dateObject.getMonth()
        const day = dateObject.getDate()
        const [weekStartDay, weekEndDay] = getStartAndEndWeekDay(year, month, day)
        const startDayIndex = new Date(year, month, weekStartDay).getDay()

        const weekDatesMetricsTemp = {
            selectedDate: selectedDate,
            year: year,
            month: month + 1,
            weekStartDay: weekStartDay,
            weekEndDay: weekEndDay,
            startDayIndex: startDayIndex,
        }

        setWeekDatesMetrics(weekDatesMetricsTemp)

        console.log('selectedDate = ' + selectedDate)
        console.log('Metrics : ' + JSON.stringify(weekDatesMetrics))
    })

    const findCurrentDateAndTime = async() => {
        const currentDateTimeStamp = new Date()
        const year = currentDateTimeStamp.getFullYear()
        const month = String(currentDateTimeStamp.getMonth() + 1).padStart(2, '0')
        const day = String(currentDateTimeStamp.getDate()).padStart(2, '0')
        const hours = String(currentDateTimeStamp.getHours()).padStart(2, '0')
        const minutes = String(currentDateTimeStamp.getMinutes()).padStart(2, '0')
        const seconds = String(currentDateTimeStamp.getSeconds()).padStart(2, '0')
        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        console.log('currentDateAndTime = ' + formattedDateTime)
        return formattedDateTime
    }

    const submitAttendance = async (currentDateAndTime) => {
        try {

            // await findCurrentDateAndTime()

            console.log('Send Message = ' + JSON.stringify({ empId: empId, submissionDateAndTime: currentDateAndTime, attendanceDates: attendanceDates }))

            const response = await fetch('http://127.0.0.1:3000/app/attendance', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({ empId: empId, submissionDateAndTime: currentDateAndTime, attendanceDates: attendanceDates })
            })

            console.log(response)

            if (!response.ok) {
                setStatus('Status : ' + response.status + ' - ' + response.statusText)
                throw new Error(response.status + ' - ' + response.statusText)
            }
        } catch (err) {
            console.log('Client-Error')
            console.log(err)
        }
    }

    const getAttendanceDayWise = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:3000/app/attendance/${empId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
            })

            if (!response.ok) {
                setStatus('Status : ' + response.status + ' - ' + response.statusText)
                throw new Error(response.status + ' - ' + response.statusText)
            }

            const data = await response.json()
            console.log('data')
            console.log(data)
            
            setAttendanceDayWise(data)
        } catch (err) {

        }
    }

    return (
        <div>
            <h2>Payroll App</h2>
            <p>Post Employee Attendance</p>
            <div>
                <label htmlFor="empId">Employee ID</label>
                {' '}
                <input
                    type="number"
                    name="empId"
                    placeholder="Employee Id"
                    value={945065}
                    readonly
                    onChange={(e) => {
                        // setEmpId(e.target.value)
                        // getAttendanceDayWise()
                    }} />
            </div>
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
                    startDayIndex={weekDatesMetrics.startDayIndex}
                    attendanceDates={attendanceDates}
                    onAttendanceDatesChange={(attendanceDates) => {
                        setAttendanceDates(attendanceDates)
                    }}
                />
            </div>
            <div>
                <button
                    name="submit-attendance"
                    onClick={async () => {
                        const currentDateAndTime = await findCurrentDateAndTime()
                        submitAttendance(currentDateAndTime)
                        setAttendanceDates([]) // reset attendanceDates to empty array
                    }}>Confirm & Submit</button>
            </div>
        </div>

    )
}

export default Attendance

// if (day % 7 === 0)
//     weekStartDay = (Math.floor(day / 7) - 1) * 7 + 1
// else
//     weekStartDay = Math.floor(day / 7) * 7 + 1

// if (weekStartDay === 29) {
//     if (!isLeapYear(year) && month === 2)
//         weekEndDay = weekStartDay + 0
//     if (isLeapYear(year) && month === 2)
//         weekEndDay = weekStartDay + 0
//     if (daysPerMonth[month] === 30)
//         weekEndDay = weekStartDay + 1
//     if (daysPerMonth[month] === 31)
//         weekEndDay = weekStartDay + 2
// }
// else
//     weekEndDay = weekStartDay + 6