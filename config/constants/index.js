const constants = Object.freeze({
    error: {
        defaultFail : "something went wrong",
        defaultSuccess : "success!!",
        noauth : "unauthorized access",
        token_required: "unauthorized access, token required."
    },
    SALTROUNDS : 10,
})

module.exports = constants;