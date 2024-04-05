import { useEffect, useState } from 'react'

function WeekDateUnit({
    weekDate = null,
    dayIndex = null,
    attendanceDatesLockedList = null,
    onAttendanceDatesLockedListChange = null,
    isLockForSubmittedAttendanceButtonDisabled = null,
    onIsLockForSubmittedAttendanceButtonDisabledChange = null,
    attendanceDatesLockedSessionHistory = null,
    onAttendanceDatesLockedSessionHistoryChange = null,
    isLockSessionHistoryButtonDisabled = null,
    onIsLockSessionHistoryButtonDisabledChange = null, }) {
    console.log('WeekDateUnit running_______________________')

    const [workHours, setWorkHours] = useState(undefined)
    const [isAttendanceLocked, setIsAttendanceLocked] = useState(undefined)

    const weekdaysNumericRep = ['Sun', 'Mon', 'Tue', 'Wed', 'Thru', 'Fri', 'Sat']

    const callLockedAttendance = async (temp) => {
        await onAttendanceDatesLockedListChange(temp)
    }

    function isLockButtonDisabled(attendanceDatesLockedSessionHistory, weekDate, isLockSessionHistoryButtonDisabled) {
        console.log('## Lock button disabled for Submitted Attendances ##')
        console.log(attendanceDatesLockedSessionHistory)
        console.log(!!attendanceDatesLockedSessionHistory[weekDate])
        console.log(!!isLockSessionHistoryButtonDisabled)
        console.log((!!attendanceDatesLockedSessionHistory[weekDate])
            && (!!isLockSessionHistoryButtonDisabled))
        return (!!attendanceDatesLockedSessionHistory[weekDate])
            && (!!isLockSessionHistoryButtonDisabled)
    }
    return (
        <div key={"keyDiv" + weekDate}>
            Week-Date {' '} {weekDate} {' '} {weekdaysNumericRep[dayIndex]}
            {' '}
            <label key={"keyLabelHours" + weekDate} htmlFor={"labelHours" + weekDate}>Work-Hours</label>
            {' '}
            <input
                key={"keyInputHours" + weekDate}
                name={"labelHours" + weekDate}
                value={workHours
                    ?? attendanceDatesLockedList[weekDate]
                    ?? attendanceDatesLockedSessionHistory[weekDate]} // workhours = ('') or num >=0 
                disabled={!!(isAttendanceLocked
                    ?? attendanceDatesLockedList[weekDate]
                    ?? attendanceDatesLockedSessionHistory[weekDate])} // isAttendanceLocked = (undefined) or true or false
                onChange={async (e) => {
                    console.log('Input  = ' + e.target.value)
                    if (typeof Number(e.target.value) === 'number'
                        && !isNaN(Number(e.target.value))
                        && Number(e.target.value) >= 0) {
                        console.log('Input is Number and More than or equal to 0')
                        setWorkHours(e.target.value)
                        console.log('Work Hours  = ' + e.target.value)
                    }
                    else if (e.target.value === '') {
                        setWorkHours('')
                    }
                    else {
                        setWorkHours('')
                        alert('Input is either not Number or Less than 0')
                    }
                }} />
            {' '}
            <button
                name="lock-button"
                disabled={isLockButtonDisabled(attendanceDatesLockedSessionHistory, weekDate, isLockSessionHistoryButtonDisabled)}
                onClick={async () => {
                    console.log('Lock/Unlock Clicked = ')
                    console.log('Work Hours = ' + workHours)
                    console.log('Is Attendance Locked = ' + isAttendanceLocked)
                    console.log('Attendance Dates Locked List [weekDate] = ' + attendanceDatesLockedList[weekDate])
                    console.log('Cond 1 = ' + !(workHours ?? attendanceDatesLockedList[weekDate]))
                    console.log('Cond 2 = ' + !(isAttendanceLocked ?? attendanceDatesLockedList[weekDate]))
                    console.log('Cond 3 = ' + !!(isAttendanceLocked ?? attendanceDatesLockedList[weekDate]))
                    if (!(workHours ?? attendanceDatesLockedList[weekDate] ?? attendanceDatesLockedSessionHistory[weekDate])) {
                        alert('Invalid Input. Cannot be locked or Unlocked')
                    }
                    else if (typeof Number(workHours ?? attendanceDatesLockedList[weekDate] ?? attendanceDatesLockedSessionHistory[weekDate]) === 'number'
                        && !isNaN(Number(workHours ?? attendanceDatesLockedList[weekDate] ?? attendanceDatesLockedSessionHistory[weekDate]))
                        && Number(workHours ?? attendanceDatesLockedList[weekDate] ?? attendanceDatesLockedSessionHistory[weekDate]) >= 0) {
                        console.log('Valid Input. Can be Locked or Unlocked')
                        let temp = {}
                        if (!(isAttendanceLocked ?? attendanceDatesLockedList[weekDate] ?? attendanceDatesLockedSessionHistory[weekDate])) {
                            setIsAttendanceLocked(!(isAttendanceLocked ?? attendanceDatesLockedList[weekDate] ?? attendanceDatesLockedSessionHistory[weekDate]))
                            Object.assign(temp, attendanceDatesLockedList)
                            temp[weekDate] = workHours ?? attendanceDatesLockedList[weekDate] ?? attendanceDatesLockedSessionHistory[weekDate]
                            onAttendanceDatesLockedListChange(temp)
                            console.log('Got Locked')
                        }
                        else if (!!(isAttendanceLocked ?? attendanceDatesLockedList[weekDate] ?? attendanceDatesLockedSessionHistory[weekDate])) {
                            setIsAttendanceLocked(!(isAttendanceLocked ?? attendanceDatesLockedList[weekDate] ?? attendanceDatesLockedSessionHistory[weekDate]))
                            Object.assign(temp, attendanceDatesLockedList)
                            setWorkHours(temp[weekDate])
                            delete temp[weekDate]
                            onAttendanceDatesLockedListChange(temp)
                            console.log('Got Unlocked')
                        }
                        console.log('Locked List')
                        console.log(temp)
                    }
                }}>
                Lock/Unlock
            </button>
        </div>
    )
}

export default WeekDateUnit