const MONTH_NAMES = ['JAN', 'FEB', 'MAR',
                     'APR', 'MAY', 'JUN',
                     'JUL', 'AUG', 'SEP',
                     'OCT', 'NOV', 'DEC'];
const getMonthName = () => {
    const currentDate = new Date();
    const monthDigit = currentDate.getMonth();

    const monthShortName = MONTH_NAMES[monthDigit];

    return monthShortName;
};

const getDayOfCreation = () => {
    const currentDate = new Date();
    const dateCreated = currentDate.getDate();

    return dateCreated;
};

export { getMonthName, getDayOfCreation };
