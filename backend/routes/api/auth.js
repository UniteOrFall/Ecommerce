const express = require('express');

const { check, validationResult } = require('express-validator')

const gravatar = require('gravatar');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const config = require('config');

const User = require('../../model/User')

const router = express.Router();

const fs = require('fs');

const auth = require('../middleware/auth')

const updateFile = (img_arr, key,type, title)=>{

    let cnt = 0;
    let arr = [];
    img_arr.forEach(elem=>{
        // const data = Buffer.from(elem,'base64');
        // console.log(data)
        const base64dat = elem.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        title = title.replace(/\s+/g,'')
        fs.existsSync(`upload/${type}/${title}`) || fs.mkdirSync(`upload/${type}/${title}`)
        fs.writeFile(`upload/${type}/${title}/${key}_${cnt}.png`,base64dat, 'base64', (err)=>{
            if(err)
                console.log(err);
        });
        arr.push(`upload/${type}/${title}/${key}_${cnt++}.png`)
    });

    return arr;

}

router.post("/adduserCart",auth,async (req,res)=>{

    try {
        
        const user = await User.findOneAndUpdate({_id: req.user.id}, {cart: req.body});
        return res.status(200)

    } catch (error) {
        return res.status(500).send('Server Error')
    }

})

router.post("/signup",[
    check("email","Enter Valid Email").isEmail(),
    check("phone","Phone is Required").exists(),
    check("password","Password is Required").exists()
],async (req,res)=>{

    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const {email, phone, password} = req.body;
    try {

        let user = new User(
            {
                email,
                phone,
                password
            }
        )
        const salt = await bcrypt.genSalt(10);
    
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload,config.get('jwtSecret'),
        {expiresIn: 360000},
        (err,token)=>{
            if(err) throw err;
            res.json({ token });
        }
        );   
    }catch(err){
        res.status(500).send('Server Error')
    }
})

router.get("/login",auth,async (req,res)=>{

    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

})

router.post("/login",[
    check("email","Enter Valid Email").isEmail(),
    check("password","Password is Required").exists()
],async (req,res)=>{

    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    try {

        let user  = await User.findOne({email: email});
        if(!user){
            res.status(400).json({errors: [{msg: "Invalid."}]})
        }

        const isMatch = await bcrypt.compare(password, user.password);


        if(!isMatch){
            console.log("wrond pass");
            res.status(400).json({errors: [{msg: "Invalid."}]})
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload,config.get('jwtSecret'),
        {expiresIn: 360000},
        (err,token)=>{
            if(err) throw err;
            res.json({ token });
        }
        );   
    }catch(err){
        res.status(500).send('Server Error')
    }
})


module.exports =  router;