import { useEffect, useState, useCallback } from 'react'
import WeekDatesCollection from './WeekDatesCollection'

function WeekDatesContainer({
    year = null,
    month = null,
    weekStartDay = null,
    weekEndDay = null,
    startDayIndex = null,
    attendanceDatesLockedList = null,
    onAttendanceDatesLockedListChange = null,
    isLockForSubmittedAttendanceButtonDisabled = null,
    onIsLockForSubmittedAttendanceButtonDisabledChange = null, }) {

    console.log('WeekDatesContainer running with Selected Date:________________________')
    console.log('weekStartDay = ' + weekStartDay)
    console.log('weekEndDay = ' + weekEndDay)
    console.log('month = ' + month)
    console.log('year = ' + year)

    if (weekStartDay === null)
        return (<div></div>)

    const [attendanceDates, setAttendanceDates] = useState({})

    useEffect(() => {
        setAttendanceDates([])
    }, [year,
        month,
        weekStartDay,
        weekEndDay,])

    return (
        <div>
            <WeekDatesCollection
                year={year}
                month={month}
                weekStartDay={weekStartDay}
                weekEndDay={weekEndDay}
                startDayIndex={startDayIndex}
                attendanceDates={attendanceDates}
                onAttendanceDatesChange={(attendanceDates) => {
                    setAttendanceDates(attendanceDates)
                }}
                attendanceDatesLockedList={attendanceDatesLockedList}
                onAttendanceDatesLockedListChange={onAttendanceDatesLockedListChange}
                isLockForSubmittedAttendanceButtonDisabled={isLockForSubmittedAttendanceButtonDisabled}
                onIsLockForSubmittedAttendanceButtonDisabledChange={onIsLockForSubmittedAttendanceButtonDisabledChange} />
        </div>
    )
}

export default WeekDatesContainer
