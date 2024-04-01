// const WeekdaysNumericRep = ['Sun', 'Mon', 'Tue', 'Wed', 'Thru', 'Fri', 'Sat']

const daysPerMonth = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

const checkLeapYear = (year) => {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
}

const getFirstSunDay = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1)
    return 1 + 7 - firstDayOfMonth.getDay()
}

const getMonthWisegetStartAndEndWeekDayAndEndWeekDaysMatrix = (month, year) => {
    const firstSunDay = getFirstSunDay(year, month)
    const isLeapYear = checkLeapYear(year)
    const daysInMonth = daysPerMonth[month]
    const matrix = [[1, firstSunDay],
    [firstSunDay + 1, firstSunDay + 7],
    [firstSunDay + 8, firstSunDay + 14],
    [firstSunDay + 15, firstSunDay + 21],
    [firstSunDay + 22, month === 1 ? (isLeapYear ? 29 : 28) : daysInMonth]]
    console.log(matrix)
    return matrix
}


const getStartAndEndWeekDay = (year, month, day) => {

    // console.log('WeekDay of First Date of the month = ' + WeekdaysNumericRep[firstDayOfMonth.getDay()]);
    // console.log('Day of the first Sunday of the month = ' +
    //     (1 + 7 - firstDayOfMonth.getDay()) + '/' +
    //     (month + 1) + '/' +
    //     year)
    let weekgetStartAndEndWeekDayDay = 0
    let weekEndDay = 0
    const monthWisegetStartAndEndWeekDayAndEndWeekDaysMatrix = getMonthWisegetStartAndEndWeekDayAndEndWeekDaysMatrix(month, year)
    for (let i = 0; i < monthWisegetStartAndEndWeekDayAndEndWeekDaysMatrix.length; i++) {
        console.log(monthWisegetStartAndEndWeekDayAndEndWeekDaysMatrix[i])
        const weekDayRange = monthWisegetStartAndEndWeekDayAndEndWeekDaysMatrix[i]
        if (day >= weekDayRange[0] && day <= weekDayRange[1]) {
            weekgetStartAndEndWeekDayDay = weekDayRange[0]
            weekEndDay = weekDayRange[1]
            break
        }
    }
    return [weekgetStartAndEndWeekDayDay, weekEndDay]
}

console.log('Answer = ' + getStartAndEndWeekDay(2024, 4, 32))