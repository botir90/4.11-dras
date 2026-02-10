const express=require("express")
require("dotenv").config()
const cors=require("cors")

const crudRouter = require("./router/crud.routes")
const registerrouter = require("./router/register.routes")

 
const app=express()
app.use(express.json())
const PORT=process.env.PORT || 3001
app.use(cors())

 

app.use(crudRouter)
app.use(registerrouter)

app.listen(PORT,()=>{
  console.log("Server is runing ", PORT); 
})