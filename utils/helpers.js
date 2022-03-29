const generateRandomId = () => {
    const randomId = Math.random().toString(36).substring(2, 16) + Math.random().toString(36).substring(2, 16)
    return randomId
}

const isValidDate = (dateObject) => {
    return dateObject instanceof Date && !isNaN(dateObject);
}

const isValidLng = (lng) => {
    return lng >= -180 && lng <= 180
}

const isValidLat = (lat) => {
    return lat >= -90 && lat <= 90
}

const convertMilesToRadians = (miles) => {
    return miles / 3963.2
}

module.exports = {
    generateRandomId,
    isValidDate,
    isValidLng,
    isValidLat,
    convertMilesToRadians,
}