const express = require('express')
const User = require('../models/User.js')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchUser = require('../middleware/fetchUser.js')
const dotenv=require('dotenv')
dotenv.config()

const JWT_SECRET= process.env.secret||'ThisIsSecret';
// console.log(JWT_SECRET)

const router = express.Router();

//ROUT1:create a user using POST: api/auth.js/createuser - Login not required
router.post('/createuser', [
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('email', 'enter a valid email').isEmail(),
    body('password', 'enter the password of length atleast 5').isLength({ min: 5 })
], async (req, res) => {
    // checking for the errors using express-validator
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    try {

        //check whether the email exist already
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            success = false;
            return res.status(400).json(success,"Sorry user with this email already exist");
        }
        
        const salt = await bcrypt.genSalt(10);
        const secpassword = await bcrypt.hash(req.body.password,salt);

        //create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secpassword,
            date: req.body.date
        })
        
        const data = {
            user:{
                id:user.id
            }
        }
        const authToken=jwt.sign(data,JWT_SECRET);
        success=true;
        res.json({success,authToken});
        // console.log("user added Successfully");
    } catch (err) {
        //catch the error
        // console.error(err.message);
        res.status(500).send("some error occured");
    }
})
// ROUT2 : login supporting backend using POST api/auth.js/login- Login not required
router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password can not be blank').exists()
], async (req, res) => {
    // checking for the errors using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const {email,password}=req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            success=false;
            return res.status(400).json({success,err:"Please try to login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            success=false;
            return res.status(400).json({success,err:"Please try to login with correct credentials"});
        }

        const data = {
            user:{
                id:user.id
            }
        }
        // console.log(data);
        const authToken=jwt.sign(data,JWT_SECRET);
        success = true;
        res.json({success,authToken});
        console.log("Data found")

    }catch(err){
        res.status(500).json("some error occured");
        // console.log(err.message);
    }
})

// ROUT3: Get user details using POST api/auth.js/getuser - Login required
router.post('/getuser', fetchUser,async (req, res) => {
    try{
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }catch(err){
        // console.error(err.message);
        res.status(500).send("some error occured");
    }

})


module.exports = router;