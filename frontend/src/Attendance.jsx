import { useState, useCallback, useRef } from 'react'
import Calendar from 'react-calendar'
import WeekDatesContainer from './WeekDatesContainer.jsx'
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
    const [attendanceDatesLockedList, setAttendanceDatesLockedList] = useState({})
    const [isLockForSubmittedAttendanceButtonDisabled, setIsLockForSubmittedAttendanceButtonDisabled] = useState(false)

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
        // console.log(monthWiseStartAndEndWeekDaysMatrix)
        for (let i = 0; i < monthWiseStartAndEndWeekDaysMatrix.length; i++) {
            // console.log(monthWiseStartAndEndWeekDaysMatrix[i])
            const weekDayRange = monthWiseStartAndEndWeekDaysMatrix[i]
            if (day >= weekDayRange[0] && day <= weekDayRange[1]) {
                weekStartDay = weekDayRange[0]
                weekEndDay = weekDayRange[1]
                break
            }
        }
        console.log([weekStartDay, weekEndDay])
        return [weekStartDay, weekEndDay]
    })

    const setStartAndEndDatesOfSelectedWeek = useCallback((selectedDate) => {
        const dateObject = new Date(selectedDate)
        const year = dateObject.getFullYear()
        const month = dateObject.getMonth()
        const day = dateObject.getDate()
        const [weekStartDay, weekEndDay] = getStartAndEndWeekDay(year, month, day)
        const startDayIndex = new Date(year, month, weekStartDay).getDay()

        let weekDatesMetricsTemp = {} = {
            selectedDate: selectedDate,
            year: year,
            month: month + 1,
            weekStartDay: weekStartDay,
            weekEndDay: weekEndDay,
            startDayIndex: startDayIndex,
        }

        setWeekDatesMetrics(weekDatesMetricsTemp)

        // console.log('selectedDate = ' + selectedDate)
        // console.log('date parts = ' + day)
        // console.log('Metrics : ' + JSON.stringify(weekDatesMetrics))
    })

    const findCurrentDateAndTime = async () => {
        const currentDateTimeStamp = new Date()
        const year = currentDateTimeStamp.getFullYear()
        const month = String(currentDateTimeStamp.getMonth() + 1).padStart(2, '0')
        const day = String(currentDateTimeStamp.getDate()).padStart(2, '0')
        const hours = String(currentDateTimeStamp.getHours()).padStart(2, '0')
        const minutes = String(currentDateTimeStamp.getMinutes()).padStart(2, '0')
        const seconds = String(currentDateTimeStamp.getSeconds()).padStart(2, '0')
        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        // console.log('currentDateAndTime = ' + formattedDateTime)
        return formattedDateTime
    }

    const submitAttendance = async (currentDateAndTime) => {
        try {
            console.log('Send Message = ' + JSON.stringify({
                empId: 935065,
                submissionDateAndTime: currentDateAndTime,
                attendanceDates: attendanceDatesLockedList
            }))

            const response = await fetch('http://127.0.0.1:3000/app/attendance', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({
                    empId: 935065,
                    submissionDateAndTime: currentDateAndTime,
                    attendanceDates: attendanceDatesLockedList
                })
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

    const foo = async (isLockForSubmittedAttendanceButtonDisabled) => {
        setIsLockForSubmittedAttendanceButtonDisabled(!isLockForSubmittedAttendanceButtonDisabled)
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
                <WeekDatesContainer
                    year={weekDatesMetrics.year}
                    month={weekDatesMetrics.month}
                    weekStartDay={weekDatesMetrics.weekStartDay}
                    weekEndDay={weekDatesMetrics.weekEndDay}
                    startDayIndex={weekDatesMetrics.startDayIndex}
                    attendanceDatesLockedList={attendanceDatesLockedList}
                    onAttendanceDatesLockedListChange={(attendanceDatesLockedList) => {
                        setAttendanceDatesLockedList(attendanceDatesLockedList)
                    }}
                    isLockForSubmittedAttendanceButtonDisabled={isLockForSubmittedAttendanceButtonDisabled}
                    onIsLockForSubmittedAttendanceButtonDisabledChange={(isLockForSubmittedAttendanceButtonDisabled) => {
                        setIsLockForSubmittedAttendanceButtonDisabled(isLockForSubmittedAttendanceButtonDisabled)
                    }} />
            </div>
            <div>
                <button
                    name="submit-attendance-button"
                    onClick={async () => {
                        const currentDateAndTime = await findCurrentDateAndTime()
                        await foo(isLockForSubmittedAttendanceButtonDisabled)
                        submitAttendance(currentDateAndTime)
                        // setAttendanceDatesLockedList([])
                    }}>Confirm & Submit</button>
            </div>
        </div>

    )
}

export default Attendance