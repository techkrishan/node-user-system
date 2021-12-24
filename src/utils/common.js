export const hideFields = (data, hiddenFields) => {
    data = data.toJSON();    
    for( let i in hiddenFields) {
        delete data[hiddenFields[i].substring(1)];
    }
    return data;
};

export const generateCode = (length) => {
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
};

export const isDateTimeExpired = (expiryDateTime, expiryTime) => {
    let compareDate = new Date((new Date(expiryDateTime)).getTime() + expiryTime * 60000);
    return compareDate.getTime() < (new Date()).getTime();
};