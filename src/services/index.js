// Common services

// INFO: If I had more time I'd create a API Endpoint function which would validate based on the various credit cards supported.
export const SUPPORTED_CREDIT_CARDS = Object.freeze([
    { name: "Visa", identifyRegex: /^4[0-9]/, validateRegex: /^4[0-9]{12}(?:[0-9]{3})?$/ },
    { name: "Discover", identifyRegex: /^6(?:011|5[0-9])/, validateRegex: /^6(?:011|5[0-9]{2})[0-9]{12}$/ },
    { name: "MasterCard", identifyRegex: /^(?:5[1-5][0-9])|[0-9]$/, validateRegex: /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/ }
]);
