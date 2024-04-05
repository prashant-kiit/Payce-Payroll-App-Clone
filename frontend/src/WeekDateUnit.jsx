import { useEffect, useState } from 'react'

function WeekDateUnit({
    weekDate = null,
    dayIndex = null,
    attendanceDates = null,
    onAttendanceDatesChange = null,
    attendanceDatesLockedList = null,
    onAttendanceDatesLockedListChange = null,
    isLockForSubmittedAttendanceButtonDisabled = null,
    onIsLockForSubmittedAttendanceButtonDisabledChange = null, }) {
    console.log('WeekDateUnit running_______________________')

    const [workHours, setWorkHours] = useState(undefined)
    const [isAttendanceLocked, setIsAttendanceLocked] = useState(undefined)

    const weekdaysNumericRep = ['Sun', 'Mon', 'Tue', 'Wed', 'Thru', 'Fri', 'Sat']

    const callLockedAttendance = async (temp) => {
        await onAttendanceDatesLockedListChange(temp)
    }

    const callLockers = async (isAttendanceLocked, temp) => {
        setIsAttendanceLocked(!isAttendanceLocked)
        await callLockedAttendance(temp)
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
                value={workHours ?? attendanceDatesLockedList[weekDate]} // workhours = ('') or num >=0 
                disabled={!!(isAttendanceLocked ?? attendanceDatesLockedList[weekDate])} // isAttendanceLocked = (undefined) or true or false
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
                disabled={(!!attendanceDatesLockedList[weekDate] && isLockForSubmittedAttendanceButtonDisabled) ? true : false}
                onClick={async () => {
                    console.log('Lock/Unlock Clicked = ')
                    console.log('Work Hours = ' + workHours)
                    console.log('Is Attendance Locked = ' + isAttendanceLocked)
                    console.log('Attendance Dates Locked List [weekDate] = ' + attendanceDatesLockedList[weekDate])
                    console.log('Cond 1 = ' + !(workHours ?? attendanceDatesLockedList[weekDate]))
                    console.log('Cond 2 = ' + !(isAttendanceLocked ?? attendanceDatesLockedList[weekDate]))
                    console.log('Cond 3 = ' + !!(isAttendanceLocked ?? attendanceDatesLockedList[weekDate]))
                    if (!(workHours ?? attendanceDatesLockedList[weekDate])) {
                        alert('Invalid Input. Cannot be locked or Unlocked')
                    }
                    else if (typeof Number(workHours ?? attendanceDatesLockedList[weekDate]) === 'number'
                        && !isNaN(Number(workHours ?? attendanceDatesLockedList[weekDate]))
                        && Number(workHours ?? attendanceDatesLockedList[weekDate]) >= 0) {
                        console.log('Valid Input. Can be Locked or Unlocked')
                        let temp = {}
                        if (!(isAttendanceLocked ?? attendanceDatesLockedList[weekDate])) {
                            setIsAttendanceLocked(!(isAttendanceLocked ?? attendanceDatesLockedList[weekDate]))
                            Object.assign(temp, attendanceDatesLockedList)
                            temp[weekDate] = workHours ?? attendanceDatesLockedList[weekDate]
                            onAttendanceDatesLockedListChange(temp)
                            console.log('Got Locked')
                        }
                        else if (!!(isAttendanceLocked ?? attendanceDatesLockedList[weekDate])) {
                            setIsAttendanceLocked(!(isAttendanceLocked ?? attendanceDatesLockedList[weekDate]))
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