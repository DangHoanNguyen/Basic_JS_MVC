import bcrypt from "bcryptjs";
import db from "../models";
const salt = bcrypt.genSaltSync(10);

let creatNewUser = async (data) => {
    return new Promise(async (resolve,reject)=>{
        try{
            let hashPasswordFromBcrypt = await hashPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address:  data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === "1" ? true : false,
                roleId: data.roleId,
            })
            resolve('New user created!!')
        }catch(e){
            reject(e);
        }
    })
};

let hashPassword = (password) =>{
    return new Promise(async(resolve, reject) => {
        try{
            let hashPassword = await bcrypt.hashSync(password,salt);
            resolve(hashPassword);
        }catch(e){
            reject(e);
        }
    })
};

let getAllUser = () => {
    return new Promise( async (resolve, reject)=>{
        try{
            let users = await db.User.findAll({
                raw: true,
            });
            resolve(users);
        }catch(e){
            reject(e);
        }
    })
}

let getUserInfoByID = (userId) =>{
    return new Promise(async(resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: {id: userId},
                raw: true,
            })
            if(user){
                resolve(user);
            }else{
                resolve({});
            }
        }catch(e){
            reject(e);
        }
    })
}

let updateUserData = (data) => {
    return new Promise( async (resolve, reject) => {
        try{
            let usr = await db.User.findOne({
                where: {id:data.id},
            })
            if(usr){
                usr.firstName = data.firstName;
                usr.lastName = data.lastName;
                usr.address = data.address;
                usr.phoneNumber = data.phoneNumber;
                //usr.gender = data.gender === "1" ? true : false;

                await usr.save();
                let allUsers = await db.User.findAll(); 
                resolve(allUsers);
            }else{
                resolve();
            }
        }catch(e){
            console.log(e);
            reject(e);
        }
    })
}

let deleteUserById = (id) => {
    return new Promise(async (resolve, reject) =>{
        try{
            let usr = await db.User.findOne({
                where: {id: id},
            })
            if(usr){
                await usr.destroy();

                let allUsers = await db.User.findAll();
                resolve(allUsers);
            }else{
                resolve();
            }
        }catch(e){
            reject(e);
        }
    })
}

module.exports = {
    creatNewUser: creatNewUser,
    getAllUser: getAllUser,
    getUserInfoByID: getUserInfoByID,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
};