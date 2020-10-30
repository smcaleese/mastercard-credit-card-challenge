function validateInput(name, creditCardNumber, expiryDate, cvv) {
    let errorMessages = [];
    // check if name is valid (only consists of letters and spaces)
    const re1 = /^[a-zA-z\s]+$/;
    const validName = re1.test(name);
    if(!(validName)) {
        errorMessages.push("Name must consist only of letters and spaces");
    }
    // check if the creditCardNumber is valid
    if(!(onlyNumbers(creditCardNumber)) || creditCardNumber.length !== 16 || !(luhnCheck(creditCardNumber))) {
        errorMessages.push("Credit card number is invalid");
    }
    // check if expiryDate is valid
    const re2 = /^\d{2}\/\d{2}$/;
    const validFormat = re2.test(expiryDate);
    if(!(validFormat)) {
        errorMessages.push("Invalid expiry date format");
    } else {
        // format needs to be valid for checkMonthAndYear to work properly
        const monthOnCard = expiryDate.split("/")[0];
        if(parseInt(monthOnCard) < 1 || parseInt(monthOnCard) > 12) {
            errorMessages.push("Invalid month");
        }
        const validMonthAndYear = validateMonthAndYear(expiryDate);
        if(!(validMonthAndYear)) {
            errorMessages.push("Card is out of date");
        }
    }
    // check if CVV is valid
    if(!(onlyNumbers(cvv)) || cvv.length !== 3) {
        errorMessages.push("CVV is invalid");
    }
    return errorMessages;
}

function onlyNumbers(string) {
    // return true if string contains only numbers. Otherwise return false.
    for(let i = 0; i < string.length; i++) {
        if(isNaN(string.charAt(i))) {
            return false;
        }
    }
    return true;
}

function luhnCheck(creditCardNumber) {
    let newArray = [];
    const creditCardNumberList = creditCardNumber.split('');
    let arraySum = 0;
    // iterating from right to left
    for(let i = creditCardNumberList.length - 1; i >= 0; i--) {
        let currentNumber = parseInt(creditCardNumberList[i]);
        // double every second number
        if(i % 2 === 0) {
            currentNumber *= 2;
            // if the doubled number is above 9, subtract 9
            if(currentNumber > 9) {
                currentNumber -= 9;
            }
            newArray.push(currentNumber);
        } else {
            newArray.push(currentNumber);
        }
        arraySum += currentNumber;
    }
    // find the sum of all the numbers and find the modulo 10 of this sum
    // if the modulo is 0, return true. Otherwise, return false.
    console.log("actual answer:", arraySum % 10 === 0);
    return arraySum % 10 === 0;
}

function validateMonthAndYear(expiryDate) {
    const monthOnCard = expiryDate.split("/")[0];
    const yearOnCard = parseInt(expiryDate.split("/")[1]);
    const currentYear = new Date().getFullYear() - 2000;
    if(yearOnCard < currentYear) {
        return false;
    } else if(yearOnCard === currentYear) {
        const currentMonth = new Date().getMonth() + 1;
        if(monthOnCard < currentMonth) {
            return false;
        }
        // return true if monthOnCard is greater than or equal to the current month
        return true;
    } else {
        // if the year is greater than this year, return true
        return true;
    }
}

module.exports = {
    validateInput,
    onlyNumbers,
    luhnCheck,
    validateMonthAndYear
}