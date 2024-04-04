import { useEffect, useState } from 'react'

function WeekDateUnit({
    weekDate = null,
    dayIndex = null,
    attendanceDates = null,
    onAttendanceDatesChange = null,
    attendanceDatesLockedList = null,
    onAttendanceDatesLockedListChange = null,
    isLockForSubmittedAttendanceButtonDisabled = null,
    onIsLockForSubmittedAttendanceButtonDisabledChange = null,
}) {
    console.log('WeekDateUnit running_______________________')

    const [workHours, setWorkHours] = useState(0)
    const [isAttendanceLocked, setIsAttendanceLocked] = useState(false)

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
                type="number"
                name={"labelHours" + weekDate}
                value={workHours == 0 ? attendanceDatesLockedList[weekDate] : workHours}
                disabled={!isAttendanceLocked ? attendanceDatesLockedList[weekDate] : isAttendanceLocked}
                onChange={(e) => {
                    console.log(e.target.value)
                    if (e.target.value >= 0)
                        setWorkHours(e.target.value)
                }} />
            {' '}
            <button
                name="lock-button"
                disabled={isAttendanceLocked && isLockForSubmittedAttendanceButtonDisabled ? true : false}
                onClick={async () => {
                    console.log('Lock/Unlock Clicked')
                    console.log(attendanceDatesLockedList[weekDate])
                    let temp = {}
                    Object.assign(temp, attendanceDatesLockedList)
                    if (workHours === 0) {
                        console.log('Workhours Input is in Locked State')
                        setWorkHours(temp[weekDate])
                        delete temp[weekDate]
                        await callLockers(isAttendanceLocked, temp)
                    }
                    else if (attendanceDatesLockedList[weekDate] > 0) {
                        console.log('Workhours Input is in Locked State')
                        setWorkHours(temp[weekDate])
                        delete temp[weekDate]
                        await callLockers(isAttendanceLocked, temp)
                    }
                    else if (workHours > 0) {
                        console.log('Workhours are filled')
                        console.log(workHours)
                        if (!isAttendanceLocked) {
                            console.log('Workhours Input is in Unlocked State')
                            temp[weekDate] = workHours
                        }
                        else {
                            console.log('Workhours Input is in Locked State')
                            delete temp[weekDate]
                        }
                        await callLockers(isAttendanceLocked, temp)
                    }
                    console.log(temp)
                }}>
                Lock/Unlock
            </button>
        </div>
    )
}

export default WeekDateUnit