const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log("Inside JwtMiddleware");
    const token = req.headers['authorization'].split(" ")[1]
    console.log(token);
    if (token) {
        try {
            const jwtResponse = jwt.verify(token,process.env.JWTPASSWORD)
            console.log(jwtResponse);
            req.id = jwtResponse.id
            next()
        } catch (err) {
            res.status(401).json("Authorization Failed Please Login!!!!")
        }
    } else {
        res.status(404).json("Authorization Failed Token is missing!!!!")
    }
}


module.exports = jwtMiddleware