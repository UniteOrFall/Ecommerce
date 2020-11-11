const express = require('express');

const app = express();

const cors = require('cors');

const Product = require('./routes/api/product');

const auth = require('./routes/api/auth')

app.use(cors());

const connectDB = require('./config/db');
const User = require('./model/User');

connectDB()

//Middlewares

app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.get('/',(req,res) => res.send("API working"));


app.get('/upload/:type/:title/:name',(req,res)=>{
    const{type, title, name} = req.params
    res.sendFile(__dirname + `/upload/${type}/${title}/${name}`)
})

app.use("/api",Product);

app.use("/api/auth",auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))