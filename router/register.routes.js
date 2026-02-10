const {Router}=require("express")
const { register, login } = require("../controller/register.controller")

const registerrouter=Router()

registerrouter.post("/register",register)
registerrouter.post("/login",login)


module.exports= registerrouter
