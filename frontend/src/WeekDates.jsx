import { useEffect, useState, useCallback } from 'react'

function WeekDates({
    year = 'YYYY',
    month = 'MM',
    weekStartDay = 'DD',
    weekEndDay = 'DD', }) {

    console.log('WeekDates running with Selected Date = ')
    console.log('weekStartDay = ' + weekStartDay)
    console.log('weekEndDay = ' + weekEndDay)
    console.log('month = ' + month)
    console.log('year = ' + year)

    const [weekDateDivs, setWeekDateDivs] = useState([])

    useEffect(() => {
        createweekDateDivsOfSelectedDate()
    }, [year,
        month,
        weekStartDay,
        weekEndDay,])

    const createweekDateDivsOfSelectedDate = useCallback(() => {
        let weekDateDivs = []
        for (let weekDay = weekStartDay; weekDay <= weekEndDay; weekDay++) {
            console.log('weekDate = ' + weekDay + '/' + month + '/' + year)
            const identifier = (weekDay === '' ? 'DD' : weekDay) + '/' + (month === '' ? 'MM' : month) + '/' + (year === '' ? 'YYYY' : year)
            weekDateDivs.push((
                <div key={"keyDiv" + identifier}>
                    <label key={"keyLabelWeekDate" + identifier} htmlFor={"labelWeekDate" + identifier}>{identifier}</label>
                    {' '}
                    <label key={"keyLabelLock" + identifier} htmlFor={"labelLock" + identifier}>Lock</label>
                    <input key={"keyInputLock" + identifier} type="checkbox" name={"labelLock" + identifier} />
                    {' '}
                    <label key={"keyLabelHours" + identifier} htmlFor={"labelHours" + identifier}>Hours</label>
                    <input key={"keyInputHours" + identifier} type="number" name={"labelHours" + identifier} />
                </div>
            ))
        }
        setWeekDateDivs(weekDateDivs)
    })

    return weekDateDivs
}

export default WeekDates