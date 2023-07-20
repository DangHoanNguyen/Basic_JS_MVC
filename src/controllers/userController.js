//import AsyncQueue from "sequelize/types/dialects/mssql/async-queue";
import userService from "../services/userService";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errorCode: 1,
            message: "Missing email or password!!!"
        })
    }

    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({
        errorCode: userData.errorCode,
        message: userData.message,
        email: email, 
        user: userData.user? userData.user : {}
        
    });
}

let handleGetAllUsers = async (req, res) =>{
    let id = req.body.id;
    if (!id) {
        return res.status(200).json({
            errorCode: 1,
            errMessage: "missing parameters",
            users: [],
        })
    }

    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errorCode: 0,
        errMessage: 'OK',
        users: users,
    })
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
}