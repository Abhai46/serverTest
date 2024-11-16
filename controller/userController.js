const userDetails = require('../models/userModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// register
exports.registerController = async (req, res) => {
    console.log("inside register controller");
    console.log(req.body);
    const { id, firstname, lastname, email, password, phonenumber } = req.body
    try {
        const existingUser = await userDetails.findOne({ id, email })

        if (existingUser) {
            res.status(406).json("Already Existing User........Please Login!!!")
        } else {
            // hashed password
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = new userDetails({
                id, firstname, lastname, email, password: hashedPassword, phonenumber
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (err) {
        console.log(err);
        res.status(401).json(err)
    }
}

// login
exports.loginController = async (req, res) => {
    console.log("Inside loginController");
    const { email, password } = req.body
    console.log(email, password);
    try {
        const existingUser = await userDetails.findOne({ email })
        if (existingUser) {
            const token = jwt.sign({ id: existingUser.id }, process.env.JWTPASSWORD)
            const isMatch = await bcrypt.compareSync(password, existingUser.password)
            if (isMatch) {
                res.status(200).json({
                    userDetails: existingUser, token
                })
            } else {
                res.status(404).json("Incorrect Password")
            }
        } else {
            res.status(404).json("Invalid Email / Password")
        }
    } catch (err) {
        console.log(err);        
    }
}

// view all user
exports.viewController = async(req,res)=>{
    console.log("inside viewController");
    try{
        const allUsers = await userDetails.find({}, '-password')
        res.status(200).json(allUsers)

    }catch(err){
        res.status(401).json(err)
    }
    
}

// single user Details
exports.singleUserController = async(req,res)=>{
    console.log("inside singleUserController");
    const{email} =req.body

    try{
        const user = await userDetails.findOne({email})
        
        res.status(200).json({
            id:user.id,
            firstname:user.firstname,
            lastname:user.lastname,
            email:user.email,
            phonenumber:user.phonenumber

        })
    }catch(err){
        res.status(401).json(err)
    }
    
}