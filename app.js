const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const { signmodel } = require("./models/signup")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://edisongeorge:edisonmg@cluster0.7y1x5l7.mongodb.net/blogdb?retryWrites=true&w=majority&appName=Cluster0")

const generateHashedPassword = async(password) => {
const salt=await bcrypt.genSalt(10)
return bcrypt.hash(password,salt)

}
app.post("/signup", async(req, res) => {
    let input = req.body
    let HashedPassword= await generateHashedPassword(input.password)
    console.log(HashedPassword)
    input.password=HashedPassword
    let sign=new signmodel(input)
    sign.save()
    res.json({ status: "HI lenex" })
})

app.listen(8003, () => {
    console.log("server started, smile please")
})