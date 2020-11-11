const express = require('express');

const { check, validationResult } = require('express-validator')

const gravatar = require('gravatar');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const config = require('config');

const Product = require('../../model/Product')

const router = express.Router();

const fs = require('fs');

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

router.post("/addProduct",[
    check("title",'Title should be valid.').exists(),
    check('price','Price should be valid.').exists(),
    check('cloth_type','Type should be valid.').exists(),
],async (req,res)=>{
    const errors = validationResult(req);
    const {title, price, cloth_type, image, colors} = req.body;
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    console.log(colors)

    for(const [key,value] of Object.entries(colors)){
        if(value===true){
            req.body[`${key}_image`] = await updateFile(req.body[`${key}_image`], key, cloth_type, title);
            console.log(key)
        }
    }
    const {
        red_image,
        blue_image,
        white_image,
        black_image,
        yellow_image
    } = req.body;

    
    const product = new Product({
        title, 
        price, 
        cloth_type, 
        image, 
        colors, 
        red_image,
        blue_image,
        white_image,
        black_image,
        yellow_image
    })

    await product.save();

    return res.status(200).send("Success");

})


router.get("/getProduct/:type",async (req,res)=>{

    const {type} = req.params;
    const data = await Product.find({cloth_type: type});
    res.status(200).json(data);

})

router.get("/getProduct",async (req,res)=>{
    const {id} = req.query;
    const data = await Product.findById(id);
    console.log(data)
    res.status(200).json(data);
})
module.exports =  router;