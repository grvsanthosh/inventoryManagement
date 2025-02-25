export const validateEmail = function(email) {
    let re = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    return re.test(email)
};

