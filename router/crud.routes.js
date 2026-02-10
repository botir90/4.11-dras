const { Router } = require("express");
const { getAllcruds, getOnecrud, addcrud, updatecrud, deletecrud } = require("../controller/crud.controller");
const authorization = require("../middleware/authorization");


const crudRouter = Router();
crudRouter.get("/get_all_crud",getAllcruds)
crudRouter.get("/get_one_crud/:id",getOnecrud)
crudRouter.post("/add_crud",authorization,addcrud)
crudRouter.put("/update_crud/:id",authorization,updatecrud)
crudRouter.delete("/delete_crud/:id",authorization,deletecrud)


module.exports = crudRouter
