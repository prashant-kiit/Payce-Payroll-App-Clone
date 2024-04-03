import { useEffect, useState, useCallback } from 'react'

function WeekDates({
    year = null,
    month = null,
    weekStartDay = null,
    weekEndDay = null,
    startDayIndex = null,
    attendanceDates = null,
    onAttendanceDatesChange = null }) {

    console.log('WeekDates running with Selected Date = ')
    console.log('weekStartDay = ' + weekStartDay)
    console.log('weekEndDay = ' + weekEndDay)
    console.log('month = ' + month)
    console.log('year = ' + year)

    if (weekStartDay === null)
        return (<div></div>)

    const [weekDateDivs, setWeekDateDivs] = useState([])

    const weekdaysNumericRep = ['Sun', 'Mon', 'Tue', 'Wed', 'Thru', 'Fri', 'Sat']

    useEffect(() => {
        createweekDateDivsOfSelectedDate()
    }, [year,
        month,
        weekStartDay,
        weekEndDay,])

    const createweekDateDivsOfSelectedDate = useCallback(() => {
        let weekDateDivsTemp = []
        let dayIndex = startDayIndex
        for (let weekDay = weekStartDay; weekDay <= weekEndDay; weekDay++) {
            console.log('Day = ' + weekdaysNumericRep[dayIndex])
            const weekDate = year + '-' + (month.toString().length === 1 ? '0' + month : month) + '-' + (weekDay.toString().length === 1 ? '0' + weekDay : weekDay)
            console.log('weekDate = ' + weekDate)
            weekDateDivsTemp.push((
                <div key={"keyDiv" + weekDate}>
                    Week-Date {' '} {weekDate} {' '} {weekdaysNumericRep[dayIndex]} 
                    {' '}
                    <label key={"keyLabelHours" + weekDate} htmlFor={"labelHours" + weekDate}>Work-Hours</label>
                    {' '}
                    <input
                        key={"keyInputHours" + weekDate}
                        type="number"
                        name={"labelHours" + weekDate}
                        onChange={(e) => {
                            console.log(e.target.value)
                            const attendanceDatesTemp = attendanceDates
                            attendanceDatesTemp[weekDate] = e.target.value
                            onAttendanceDatesChange(attendanceDatesTemp)
                            console.log(weekDate)
                            console.log(attendanceDates)
                        }} />
                    {/* {' '}
                    <label key={"keyLabelTick" + weekDate} htmlFor={"labelTick" + weekDate}>Confirm</label>
                    {' '}
                    <input
                        key={"keyInputTick" + weekDate}
                        type="checkbox"
                        name={"labelTick" + weekDate}
                        onChange={(e) => {
                            
                        }} /> */}
                </div>
            ))
            dayIndex = (++dayIndex) % 7
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