import db from "../models/index";
import bcrypt from "bcryptjs";


let handleUserLogin = (username, password) => {
    return new Promise(async (resolve, reject) => {
        try{
            let UserData = {};
            let doExist = await checkUserEmail(username);
            if(doExist){
                let user = await db.User.findOne({
                    where: {email: username},
                    raw: true,
                    attributes: ['email', 'roleId', 'password'],
                });
                if (user){
                    let check = bcrypt.compareSync(password, user.password);
                    if (check){
                        UserData.errorCode = 0;
                        UserData.message = "Logged in";
                        delete user.password;
                        UserData.user = user;
                        
                    }else {
                        UserData.errorCode = 3;
                        UserData.message = "wrong pw";
                    }
                }else {
                    UserData.errorCode = 2;
                    UserData.message = "usr dont exist";
                }
            }else {
                UserData.errorCode = 1;
                UserData.message = "Nope MF";         
            }
            resolve(UserData);
        } catch(e) {
            reject(e);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: {email: userEmail}
            })
            if (user) {
                resolve(true);
            }else {
                resolve(false);
            }
        }catch(e) {
            reject(e);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise( async (resolve, reject) => {
        try{
            let users = '';
            if (userId === 'ALL'){
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                });
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: {id: userId},
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users);
        }catch(e) {
            reject(e);
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
} 