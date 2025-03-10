const users = require("../models/userModel")

// register controller
exports.registerController = async (req,res) => {
    console.log("Inside registerController");
    const {username, email, password} = req.body
    try {
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("User already exists!!! Please Login.")
        }else{
            const newUser = new users({
                username, email, password, profilePic : ""
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
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            res.status(200).json(existingUser)
        }else{
            res.status(404).json("User Doesn't exist...Invalid username/password")
        }
    } catch (error) {
        res.status(401).json(error)
    }
}