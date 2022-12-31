import express from "express";
import homeController from "../controllers/homeController";


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

    return app.use("/", router);
};

module.exports = initWebRoutes;