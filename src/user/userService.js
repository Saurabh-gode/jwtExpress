const UserModel = require('../models/user');
const { getToken } = require('../middlewares/auth');
const { error } = require('../../config/constants');

const userRegisterService = async (body) => {
    try {


        const saveData = await UserModel.create(body);
        console.log(saveData);

        return { error: false, message: "saved success", data: [saveData._id] }

    } catch (err) {
        console.log(err.message);
        if (err.code === 11000) {
            return { error: true, message: "Provided data already exists" }
        }
        return { error: true, message: err.message }
    }
}

const loginService = async (email) => {
    try {

        const getUserbyEmail = await UserModel.findOne({ email: email }, { token: 0 }).lean();

        return { error: false, message: "login success", data: getUserbyEmail }
    } catch (err) {
        console.log(err)
        return { error: true, message: err.message }
    }
}

const getTokenService = async (info) => {
    try {

        let userData = await getToken(info);

        if (userData) {
            const saveTokenData = await UserModel.updateOne({ email: info.email }, { $set: { token: userData } })

        }

        return { error: false, message: "token is generated", data: userData };

    } catch (err) {
        console.log(err)
        return { error: true, message: err.message }
    }
}

const getUsersService = async () => {
    try {
        const users = await UserModel.find({}, { token: 0, password: 0 }).lean();
        return { error: false, message: "data feteched success", data: users }
    } catch (err) {
        console.log(err);
        return { error: true, message: error.defaultFail }
    }
}


module.exports = {
    userRegisterService,
    loginService,
    getTokenService,
    getUsersService,
}