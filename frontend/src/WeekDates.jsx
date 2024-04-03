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

    useEffect(() => {
        createweekDateDivsOfSelectedDate()
    }, [year,
        month,
        weekStartDay,
        weekEndDay,])

    const weekdaysNumericRep = ['Sun', 'Mon', 'Tue', 'Wed', 'Thru', 'Fri', 'Sat']

    const createweekDateDivsOfSelectedDate = useCallback(() => {
        let weekDateDivsTemp = []
        let dayIndex = startDayIndex
        for (let weekDay = weekStartDay; weekDay <= weekEndDay; weekDay++) {
            const weekDate = year + '-' + (month.toString().length === 1 ? '0' + month : month) + '-' + (weekDay.toString().length === 1 ? '0' + weekDay : weekDay)
            // console.log('weekDate = ' + weekDate)
            // console.log('Day = ' + weekdaysNumericRep[dayIndex])
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
                        value={attendanceDates[weekDate]}
                        onChange={(e) => {
                            // console.log(weekDate)
                            // console.log(e.target.value)
                            if (e.target.value >= 1) {
                                const attendanceDatesTemp = attendanceDates
                                attendanceDatesTemp[weekDate] = Number(e.target.value)
                                onAttendanceDatesChange(attendanceDatesTemp)
                            } else if (e.target.value === '') {
                                const attendanceDatesTemp = attendanceDates
                                delete attendanceDatesTemp[weekDate]
                                onAttendanceDatesChange(attendanceDatesTemp)
                            } else {
                                e.target.value = ''
                            }
                            console.log(attendanceDates)
                        }} />
                    {' '}
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

/*
<label key={"keyLabelTick" + weekDate} htmlFor={"labelTick" + weekDate}>Leave = Zero Work Hour</label>
{' '}
<input
    key={"keyInputTick" + weekDate}
    type="checkbox"
    name={"labelTick" + weekDate}
    onChange={(e) => {

    }} /> 
<button
key={"keyInputTick" + weekDate}
name={"labelTick" + weekDate}
onClick={() => {
    const attendanceDatesTemp = attendanceDates
    attendanceDatesTemp[weekDate] = '0'
    onAttendanceDatesChange(attendanceDatesTemp)
    console.log(weekDate)
    console.log(attendanceDates)
}}>
Click if you were on Leave on this Day
</button> 
*/