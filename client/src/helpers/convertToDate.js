
const convertToDate = (stringDate) => {
    const date =  new Date(stringDate);
    const formattedDate = date.toLocaleString().split(',')[0];
    return formattedDate;
}

export default convertToDate