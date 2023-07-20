import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";


let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);

    router.get("/about", homeController.getAbout);

    router.get("/restaurant", homeController.getRestaurant);

    

    //CRUD
    ///Create
    router.get("/crud", homeController.getCRUD);
    router.post("/post-crud", homeController.postCRUD);
    ///Read
    router.get("/display-crud", homeController.displayGetCRUD);
    ///Update
    router.get("/edit-crud", homeController.getEditCRUD);
    router.post("/put-crud", homeController.putCRUD);
    ///Delete
    router.get("/delete-crud", homeController.deleteCRUD);

    router.get("/displayit", homeController.display)

    router.post("/api/login", userController.handleLogin);
    router.get("/api/get-all-users", userController.handleGetAllUsers);

    return app.use("/", router);
};

module.exports = initWebRoutes;