import { useState, useCallback, useRef } from 'react'
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

    const [attendanceDayWise, setAttendanceDayWise] = useState({})

    const daysPerMonth = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    const checkLeapYear = useCallback((year) => {
        return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
    })

    const getFirstSunDay = useCallback((year, month) => {
        const firstDayOfMonth = new Date(year, month, 1)
        return 1 + 7 - firstDayOfMonth.getDay()
    })

    const getMonthWiseStartAndEndWeekDaysMatrix = useCallback((month, year) => {
        const firstSunDay = getFirstSunDay(year, month)
        const isLeapYear = checkLeapYear(year)
        const daysInMonth = daysPerMonth[month]
        const matrix = [[1, firstSunDay],
        [firstSunDay + 1, firstSunDay + 7],
        [firstSunDay + 8, firstSunDay + 14],
        [firstSunDay + 15, firstSunDay + 21],
        [firstSunDay + 22, month === 1 ? (isLeapYear ? 29 : 28) : daysInMonth]]
        // console.log(matrix)
        return matrix
    })

    const getStartAndEndWeekDay = useCallback((year, month, day) => {
        let weekStartDay = 0
        let weekEndDay = 0
        const monthWiseStartAndEndWeekDaysMatrix = getMonthWiseStartAndEndWeekDaysMatrix(month, year)
        for (let i = 0; i < getMonthWiseStartAndEndWeekDaysMatrix.length; i++) {
            // console.log(monthWiseStartAndEndWeekDaysMatrix[i])
            const weekDayRange = monthWiseStartAndEndWeekDaysMatrix[i]
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

        // console.log('selectedDate = ' + selectedDate)
        // console.log('Metrics : ' + JSON.stringify(weekDatesMetrics))
    })

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
                    readOnly
                    onChange={(e) => {
                        // setEmpId(e.target.value)
                        // getAttendanceDayWise()
                    }} />
            </div>
            <div>
                <Calendar
                    onChange={(selectedDate) => {
                        setStartAndEndDatesOfSelectedWeek(selectedDate)
                    }} />
            </div>
            <div>
                <WeekDates
                    empId={935065}
                    year={weekDatesMetrics.year}
                    month={weekDatesMetrics.month}
                    weekStartDay={weekDatesMetrics.weekStartDay}
                    weekEndDay={weekDatesMetrics.weekEndDay}
                    startDayIndex={weekDatesMetrics.startDayIndex} />
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