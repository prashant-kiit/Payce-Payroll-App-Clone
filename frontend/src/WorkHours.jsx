import { useState } from 'react'

function WorkHours({
    weekDate = null,
    dayIndex = null,
    attendanceDates = null,
    onAttendanceDatesChange = null,
    attendanceDatesLockedList = null,
    onAttendanceDatesLockedList = null, }) {

    const [workHours, setWorkHours] = useState()
    const [isSubmittedAttendanceLocked, setIsSubmittedAttendanceLocked] = useState(false)

    const weekdaysNumericRep = ['Sun', 'Mon', 'Tue', 'Wed', 'Thru', 'Fri', 'Sat']

    return <div key={"keyDiv" + weekDate}>
        Week-Date {' '} {weekDate} {' '} {weekdaysNumericRep[dayIndex]}
        {' '}
        <label key={"keyLabelHours" + weekDate} htmlFor={"labelHours" + weekDate}>Work-Hours</label>
        {' '}
        <input
            key={"keyInputHours" + weekDate}
            type="number"
            name={"labelHours" + weekDate}
            value={workHours ?? attendanceDatesLockedList[weekDate]}
            disabled={isSubmittedAttendanceLocked ? isSubmittedAttendanceLocked : !!attendanceDatesLockedList[weekDate]}
            onChange={(e) => {
                // console.log(weekDate)
                // console.log(e.target.value)
                const attendanceDatesTemp = attendanceDates
                if (e.target.value === '' || e.target.value === 0) {
                    // setWorkHours(e.target.value)
                    delete attendanceDatesTemp[weekDate]
                } else if (e.target.value > 0) {
                    // setWorkHours(Number(e.target.value))
                    attendanceDatesTemp[weekDate] = Number(e.target.value)
                } else {
                    e.target.value = ''
                }
                onAttendanceDatesChange(attendanceDatesTemp)
                setWorkHours(attendanceDates[weekDate])
                console.log('Attendance dates : ')
                console.log(attendanceDates)
            }} />
        {' '}
        <button onClick={() => {
            if (attendanceDates[weekDate]) {
                if (!isSubmittedAttendanceLocked) {
                    console.log('Lock : ')
                    let temp = {}
                    temp[weekDate] = attendanceDates[weekDate]
                    Object.assign(attendanceDatesLockedList, temp)
                }
                else {
                    console.log('UnLock : ')
                    delete attendanceDatesLockedList[weekDate]
                }
                onAttendanceDatesLockedList(attendanceDatesLockedList)
                setIsSubmittedAttendanceLocked(!isSubmittedAttendanceLocked)
                console.log(attendanceDatesLockedList)
            }
        }}>
            Lock
        </button>
    </div>
}

export default WorkHours