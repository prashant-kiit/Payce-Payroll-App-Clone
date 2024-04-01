import { useEffect, useState, useCallback } from 'react'

function WeekDates({
    year = null,
    month = null,
    weekStartDay = null,
    weekEndDay = null,
    attendanceDates = null,
    onAttendanceDatesChange = null }) {

    console.log('WeekDates running with Selected Date = ')
    console.log('weekStartDay = ' + weekStartDay)
    console.log('weekEndDay = ' + weekEndDay)
    console.log('month = ' + month)
    console.log('year = ' + year)

    const [weekDateDivs, setWeekDateDivs] = useState([])

    useEffect(() => {
        createweekDateDivsOfSelectedDate()
    }, [year,
        month,
        weekStartDay,
        weekEndDay,])

    const createweekDateDivsOfSelectedDate = useCallback(() => {
        let weekDateDivsTemp = []
        for (let weekDay = weekStartDay; weekDay <= weekEndDay; weekDay++) {
            console.log('weekDate = ' + weekDay + '/' + month + '/' + year)
            const identifier = (weekDay === '' ? 'DD' : weekDay) + '/' + (month === '' ? 'MM' : month) + '/' + (year === '' ? 'YYYY' : year)
            weekDateDivsTemp.push((
                <div key={"keyDiv" + identifier}>
                    <label key={"keyLabelWeekDate" + identifier} htmlFor={"labelWeekDate" + identifier}>Week Date {' '} {identifier}</label>
                    {/* {' '}
                    <label key={"keyLabelLock" + identifier} htmlFor={"labelLock" + identifier}>Lock</label>
                    <input
                        key={"keyInputLock" + identifier}
                        type="checkbox"
                        name={"labelLock" + identifier}
                        onChange={() => {

                        }} /> */}
                    {' '}
                    <label key={"keyLabelHours" + identifier} htmlFor={"labelHours" + identifier}>Work Hours</label>
                    <input
                        key={"keyInputHours" + identifier}
                        type="number"
                        name={"labelHours" + identifier}
                        onChange={(e) => {
                            console.log(e.target.value)
                            const attendanceDatesTemp = attendanceDates
                            attendanceDatesTemp[identifier] = e.target.value
                            onAttendanceDatesChange(attendanceDatesTemp)
                            console.log(identifier)
                            console.log(attendanceDates)
                        }} />
                </div>
            ))
        }
        setWeekDateDivs(weekDateDivsTemp)
    })

    return weekDateDivs
}

export default WeekDates

/*
const attendanceDatesTemp = attendanceDates
if (!(!!attendanceDates.weekDay || attendanceDates.weekDay))
    attendanceDatesTemp.weekDay = 1
if (attendanceDates.weekDay)
    attendanceDatesTemp.weekDay = 0
setAttendanceDates(attendanceDatesTemp) 
*/