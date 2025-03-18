const users = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// register controller
exports.registerController = async (req,res) => {
    console.log("Inside registerController");
    const {username, email, password} = req.body
    try {
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("User already exists!!! Please Login.")
        }else{
            const encryptedPassword = await bcrypt.hash(password,10)
            const newUser = new users({
                username, email, password : encryptedPassword, profilePic : ""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        console.log(error);
    }

}

// login controller
exports.loginController = async (req,res) => {
    console.log("inside loginController");
    const {email, password} = req.body
    try {
        const existingUser = await users.findOne({email})
        if(existingUser){
            let isPasswordMatch = await bcrypt.compare(password,existingUser.password)
            if(isPasswordMatch || isPasswordMatch == existingUser.password){
                const token = jwt.sign({userId : existingUser._id}, process.env.JWTPASSWORD)
                res.status(200).json({user : existingUser, token})
            }else{
                res.status(406).json("Invalid Password")
            }
        }else{
            res.status(404).json("User Doesn't exist...Invalid username/password")
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// get user details
exports.userDetailsController