
const sendResponse = (res, responseStatus, statusCode, responseErrors, responseData = [] ) => {

    return res.status(statusCode).send({
        status: responseStatus,
        statusCode: statusCode,
        message: responseErrors,
        data: responseData,
    })
}

module.exports = {
    sendResponse
}