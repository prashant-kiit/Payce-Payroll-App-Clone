import { useEffect, useState, useCallback } from 'react'
import WorkHours from './WorkHours'

function WeekDates({
    empId = null,
    year = null,
    month = null,
    weekStartDay = null,
    weekEndDay = null,
    startDayIndex = null, }) {

    console.log('WeekDates running with Selected Date:')
    console.log('weekStartDay = ' + weekStartDay)
    console.log('weekEndDay = ' + weekEndDay)
    console.log('month = ' + month)
    console.log('year = ' + year)

    if (weekStartDay === null)
        return (<div></div>)

    const [weekDateDivs, setWeekDateDivs] = useState([])
    const [attendanceDates, setAttendanceDates] = useState({})
    const [attendanceDatesLockedList, setAttendanceDatesLockedList] = useState({})

    useEffect(() => {
        createweekDateDivsOfSelectedDate()
    }, [year,
        month,
        weekStartDay,
        weekEndDay,])

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
            console.log('Send Message = ' + JSON.stringify({ empId: empId, submissionDateAndTime: currentDateAndTime, attendanceDates: attendanceDatesLockedList }))

            const response = await fetch('http://127.0.0.1:3000/app/attendance', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({ empId: empId, submissionDateAndTime: currentDateAndTime, attendanceDates: attendanceDatesLockedList })
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

    const createweekDateDivsOfSelectedDate = useCallback(() => {
        let weekDateDivsTemp = []
        let dayIndex = startDayIndex
        for (let weekDay = weekStartDay; weekDay <= weekEndDay; weekDay++) {
            const weekDate =
                year + '-' +
                (month.toString().length === 1 ? '0' + month : month) + '-' +
                (weekDay.toString().length === 1 ? '0' + weekDay : weekDay)
            // console.log('weekDate = ' + weekDate)
            // console.log('Day = ' + weekdaysNumericRep[dayIndex])
            weekDateDivsTemp.push((
                <WorkHours
                    key={"keyWorkHours" + weekDate}
                    weekDate={weekDate}
                    dayIndex={dayIndex}
                    attendanceDates={attendanceDates}
                    onAttendanceDatesChange={(attendanceDates) => {
                        setAttendanceDates(attendanceDates)
                    }}
                    attendanceDatesLockedList={attendanceDatesLockedList}
                    onAttendanceDatesLockedList={(attendanceDatesLockedList) => {
                        setAttendanceDatesLockedList(attendanceDatesLockedList)
                    }}
                />))
            dayIndex = (++dayIndex) % 7
        }
        setWeekDateDivs(weekDateDivsTemp)
    })

    return <>
        <div>
            {weekDateDivs}
        </div>
        <div>
            <button
                name="submit-attendance"
                onClick={async () => {
                    const currentDateAndTime = await findCurrentDateAndTime()
                    submitAttendance(currentDateAndTime)
                    setAttendanceDates([])
                }}>Confirm & Submit</button>
        </div>
    </>
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