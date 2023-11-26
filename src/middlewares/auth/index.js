const jwt = require('jsonwebtoken');
const { sendResponse } = require('../../../config/response');
const { error } = require('../../../config/constants');

const authenticateToken = async (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(' ')[1];

            const verificationStatus = await jwt.verify(token, process.env.JWT_SECRET);

            console.log(verificationStatus)

            console.log(new Date(verificationStatus.exp), new Date())

            req.decoded = { user_id: verificationStatus.user_id, email: verificationStatus.email, first_name: verificationStatus.first_name, last_name: verificationStatus.last_name, age: verificationStatus.age };

            next();

        } else {
            return sendResponse(res, false, 401, error.token_required)
        }

    } catch (err) {
        // console.log(err);
        return sendResponse(res, false, 401, error.noauth)
    }
}

const getToken = async (info) => {
    const tokenData = await jwt.sign(info, process.env.JWT_SECRET, { expiresIn: 900 });

    return tokenData;
}


module.exports = {
    getToken,
    authenticateToken,
}