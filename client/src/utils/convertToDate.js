
const convertToDate = (stringDate) => {
    if (stringDate) {
        const date =  new Date(stringDate);
        const formattedDate = date.toLocaleString().split(',')[0];
        return formattedDate;
    }
    return null;
}

export default convertToDate