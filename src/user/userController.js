const { sendResponse } = require('../../config/response')
const { error, SALTROUNDS } = require('../../config/constants');
const { userRegisterService, loginService, getTokenService, getUsersService } = require('./userService');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, SALTROUNDS);

        const body = { ...req.body }

        body.password = hashedPassword;

        const saveUser = await userRegisterService(body)

        if (saveUser.error) {
            return sendResponse(res, false, 400, saveUser.message, [])
        }


        return sendResponse(res, true, 201, error.defaultSuccess, saveUser)
    } catch (err) {
        console.log(err, 'ERR registerUser')
        return sendResponse(res, false, 500, error.defaultFail)
    }
}

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;
        const getUser = await loginService(email);

        if (getUser.error || !getUser.data?._id) {
            return sendResponse(res, true, 400, "user not found.", [])
        }

        const evaluatePassword = await bcrypt.compare(password, getUser.data.password);

        if (!evaluatePassword) {
            return sendResponse(res, true, 401, error.noauth, [])
        } else {
            const respObj = { user_id: getUser.data._id, email: getUser.data.email, first_name: getUser.data.first_name, last_name: getUser.data.last_name, age: getUser.data.age, }
            let userData = await getTokenService(respObj);

            respObj.token = userData.data;

            return sendResponse(res, true, 200, error.defaultSuccess, [respObj])
        }

        // sendResponse(res, true, 200, error.defaultSuccess, [])
    } catch (err) {
        console.log(err, 'ERR loginUser')
        return sendResponse(res, false, 500, error.defaultFail)
    }
}

const getUsers = async (req, res) => {
    try {

        const userData = await getUsersService();

        if (userData.error) {
            return sendResponse(res, false, 500, error.defaultFail)
        }

        return sendResponse(res, true, 200, error.defaultSuccess, userData.data);
    } catch (err) {
        console.log(err);
        return sendResponse(res, false, 500, error.defaultFail)
    }
}

const keepMeLoggedIn = async (req, res) => {
    try {

        let refreshedToken = await getTokenService(req.decoded);

        if(refreshedToken.error){
            return sendResponse(res, true, 401, error.noauth, [])
        }

        return sendResponse(res, true, 200, error.defaultSuccess, [{token: refreshedToken.data}]);
    } catch (err) {
        console.log(err);
        return sendResponse(res, false, 500, error.defaultFail)
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    keepMeLoggedIn
}