import db from '../models/index.js';
import CRUDservice from '../services/CRUDservice.js';

let getHomePage = async (req,res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch(e){
        console.log(e);
    }
};

let getAbout = (req, res) => {
    return res.render('test/about.ejs');
};

let getRestaurant = (req, res) => {
    return res.render('test/restaurant.ejs');
};

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {

    let message = await CRUDservice.creatNewUser(req.body);
    console.log(message);
    return res.send("post crud from server");
}

let displayGetCRUD = async (req, res) =>{
    try{
        let data = await CRUDservice.getAllUser();
        return res.render('displayCRUD.ejs', {
            dataTable: data,
        });
    }catch(e){
        console.log(e);
    }    
}

let display = async (req, res) =>{
    let userId = req.query.id;
    if(userId){
        let userData = await CRUDservice.getUserInfoByID(userId);
        return res.render("display.ejs",{
            data: userData,
        });
    }else {
        return res.send('no');
    }
}

let getEditCRUD = async (req, res) =>{
    let userId = req.query.id;
    if(userId){
        let userData = await CRUDservice.getUserInfoByID(userId);
        return res.render("editCRUD.ejs",{
            dataToChange: userData,
        });
    }else{
        return res.send("Who r u mf?");
    }
}

let putCRUD = async (req, res) => {
    let data = await req.body;
    console.log('1');
    let allUsers = await CRUDservice.updateUserData(data);
    console.log('end');
    return res.render("displayCRUD.ejs",{
        dataTable: allUsers,
    })
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    let allUsers = await CRUDservice.deleteUserById(id);
    return res.render("displayCRUD.ejs", {
        dataTable: allUsers,
    });

}

module.exports = {
    getHomePage: getHomePage,
    getAbout: getAbout,
    getRestaurant: getRestaurant,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
    display: display,
};