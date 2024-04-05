import { useEffect, useState, useCallback } from 'react'
import WeekDateUnit from './WeekDateUnit'

function WeekDatesCollection({
    year = null,
    month = null,
    weekStartDay = null,
    weekEndDay = null,
    startDayIndex = null,
    attendanceDatesLockedList = null,
    onAttendanceDatesLockedListChange = null,
    isLockForSubmittedAttendanceButtonDisabled = null,
    onIsLockForSubmittedAttendanceButtonDisabledChange = null, 
    attendanceDatesLockedSessionHistory = null,
    onAttendanceDatesLockedSessionHistoryChange = null,
    isLockSessionHistoryButtonDisabled = null,
    onIsLockSessionHistoryButtonDisabledChange = null, }) {

    console.log('WeekDatesCollection running _______________')

    let weekDateDivsList = []
    let dayIndex = startDayIndex
    for (let weekDay = weekStartDay; weekDay <= weekEndDay; weekDay++) {
        const weekDate =
            year + '-' +
            (month.toString().length === 1 ? '0' + month : month) + '-' +
            (weekDay.toString().length === 1 ? '0' + weekDay : weekDay)
        // console.log('weekDate=' + weekDate)
        weekDateDivsList.push((
            <WeekDateUnit
                key={"keyWorkHours" + weekDate}
                weekDate={weekDate}
                dayIndex={dayIndex}
                attendanceDatesLockedList={attendanceDatesLockedList}
                onAttendanceDatesLockedListChange={onAttendanceDatesLockedListChange}
                isLockForSubmittedAttendanceButtonDisabled={isLockForSubmittedAttendanceButtonDisabled}
                onIsLockForSubmittedAttendanceButtonDisabledChange={onIsLockForSubmittedAttendanceButtonDisabledChange} 
                attendanceDatesLockedSessionHistory={attendanceDatesLockedSessionHistory}
                onAttendanceDatesLockedSessionHistoryChange={onAttendanceDatesLockedSessionHistoryChange}
                isLockSessionHistoryButtonDisabled={isLockSessionHistoryButtonDisabled}
                onIsLockSessionHistoryButtonDisabledChange={onIsLockSessionHistoryButtonDisabledChange}/>))

        dayIndex = (++dayIndex) % 7
    }

    return (
        <div>
            {weekDateDivsList}
        </div>
    )
}

export default WeekDatesCollection