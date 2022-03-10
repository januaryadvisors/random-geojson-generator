const selectRandomValue = (values) => {
    const valuesArray = values.split(',')
    const trimmedValuesArray = valuesArray.map(value => value.trim())
    return trimmedValuesArray[Math.floor(Math.random() * trimmedValuesArray.length)]
}

const generateRandomString = (min, max) => {
    let randomString = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const stringLength = generateRandomIntInclusive(min, max)
    for (let i = 0; i < stringLength; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return randomString
}

const generateRandomParagraph = (min, max) => {
    let randomParagraph = ''
    let numWords = generateRandomIntInclusive(min, max)
    for (let i = 0; i <= numWords; i++) {
        const word = generateRandomString(1, 12)
        randomParagraph += ' ' + word
    }
    return randomParagraph.trim()
}

const generateRandomIntInclusive = (min, max) => {
    const minInt = parseInt(min)
    const maxInt = parseInt(max)
    return Math.floor(Math.random() * (maxInt - minInt + 1) + minInt)
}

const generateRandomFloatInclusive = (min, max) => {
    const minFloat = parseFloat(min)
    const maxFloat = parseFloat(max)
    const randomFloat = Math.random() * (maxFloat - minFloat) + minFloat
    // maybe make this a param at some point
    const minDecimalInt = 0
    const maxDecimalInt = 10
    const randomFloatLength = Math.floor(Math.random() * (maxDecimalInt - minDecimalInt + 1) + minDecimalInt)
    return randomFloat.toFixed(randomFloatLength)
}

const generateFeatureProperties = (propertyOptions) => {
    let properties = {}
    
    propertyOptions.forEach(propertyOption => {
        let property
        switch (propertyOption.type) {
            case 'string_from_set':
                // select random string from set of strings
                property = selectRandomValue(propertyOption.values)
                break
            case 'string_var_len':
                // generate string of variable length
                property = generateRandomString(propertyOption.min, propertyOption.max)
                break
            case 'paragraph_var_len':
                property = generateRandomParagraph(propertyOption.min, propertyOption.max)
                break
            case 'number_from_set':
                // select random number from set of numbers
                property = parseFloat(selectRandomValue(propertyOption.values))
                break
            case 'int_var_value':
                // generate random integer between min and max
                property = generateRandomIntInclusive(propertyOption.min, propertyOption.max)
                break
            case 'float_var_value':
                // generate random float between min and max rounded to a decimal place between minDecimal and maxDecimal
                property = generateRandomFloatInclusive(propertyOption.min, propertyOption.max)
                break
            default:
                // throw error
                break
        }
        properties[`${propertyOption.name}`] = property
    })
    
    return properties
}

module.exports = {
    generateFeatureProperties
}