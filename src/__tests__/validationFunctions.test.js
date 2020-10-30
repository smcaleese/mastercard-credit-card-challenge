const validationFunctions = require('../validationFunctions');

test("validateInput(), positive test", () => {
    expect(validationFunctions.validateInput("Stephen", "5341823638175168", "05/24", "123")).toEqual([]);
});

// test all possible error messages using the following two tests
test("validateInput(), negative test", () => {
    expect(validationFunctions.validateInput("12345", "12345", "12345", "12345")).toEqual(
        ["Name must consist only of letters and spaces",
        "Credit card number is invalid",
        "Invalid expiry date format",
        "CVV is invalid"]
    );
});

test("validateInput(), more negative tests", () => {
    expect(validationFunctions.validateInput("Stephen", "5341823638175168", "15/15", "123")).toEqual(
        ["Invalid month", "Card is out of date"]
    );
});

test("onlyNumbers(), positive test", () => {
    expect(validationFunctions.onlyNumbers("12345")).toBe(true);
});

test("onlyNumbers(), negative test", () => {
    expect(validationFunctions.onlyNumbers("1234abc6553")).toBe(false);
});

test("luhnCheck(), positive test", () => {
    expect(validationFunctions.luhnCheck("5341823638175168")).toBeTruthy();
});

test("luhnCheck(), negative test", () => {
    expect(validationFunctions.luhnCheck("1")).toBe(false);
});

test("validateMonthAndYear(), positive test", () => {
    expect(validationFunctions.validateMonthAndYear("12/20")).toBe(true);
});

test("validateMonthAndYear(), negative test", () => {
    expect(validationFunctions.validateMonthAndYear("05/20")).toBe(false);
});