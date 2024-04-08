import { useEffect, useState, useCallback } from "react";
import WeekDatesCollection from "./WeekDatesCollection";

function WeekDatesContainer({
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
  onIsLockSessionHistoryButtonDisabledChange = null,
  previousSessionAttendanceData = null,
}) {
  console.log(
    "WeekDatesContainer running with Selected Date:________________________"
  );
  console.log("weekStartDay = " + weekStartDay);
  console.log("weekEndDay = " + weekEndDay);
  console.log("month = " + month);
  console.log("year = " + year);

  if (weekStartDay === null) return <div></div>;

  return (
    <div>
      <WeekDatesCollection
        year={year}
        month={month}
        weekStartDay={weekStartDay}
        weekEndDay={weekEndDay}
        startDayIndex={startDayIndex}
        attendanceDatesLockedList={attendanceDatesLockedList}
        onAttendanceDatesLockedListChange={onAttendanceDatesLockedListChange}
        isLockForSubmittedAttendanceButtonDisabled={
          isLockForSubmittedAttendanceButtonDisabled
        }
        onIsLockForSubmittedAttendanceButtonDisabledChange={
          onIsLockForSubmittedAttendanceButtonDisabledChange
        }
        attendanceDatesLockedSessionHistory={
          attendanceDatesLockedSessionHistory
        }
        onAttendanceDatesLockedSessionHistoryChange={
          onAttendanceDatesLockedSessionHistoryChange
        }
        isLockSessionHistoryButtonDisabled={isLockSessionHistoryButtonDisabled}
        onIsLockSessionHistoryButtonDisabledChange={
          onIsLockSessionHistoryButtonDisabledChange
        }
        previousSessionAttendanceData={previousSessionAttendanceData}
      />
    </div>
  );
}

export default WeekDatesContainer;
