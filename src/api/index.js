const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
const Post = require("./models/post");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');

const salt = bcrypt.genSaltSync(10); // creates random things for bcrypt
const secret = "fhaf39396&&^@*(@Y(^&@(^!!";

app.use(cors({credentials:true, origin:"http://localhost:3000"}));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname+"/uploads"));

mongoose.connect("mongodb+srv://<username>:<password>@cluster0.peuyfuv.mongodb.net/?retryWrites=true&w=majority");

app.post("/Register", async (req, res) => {
    
    const {username, password} = req.body;

    try{
        const userDoc = await User.create({username, password:bcrypt.hashSync(password, salt)});
        res.json(userDoc);

    }catch(e){
        res.status(400).json(e);
    }
})

app.post("/Login", async (req, res) => {
    const {username, password} = req.body;

    const userDoc = await User.findOne({username});
    
    const passOk = bcrypt.compareSync(password, userDoc.password);
    
    if(passOk){
        jwt.sign({username, id:userDoc._id}, secret, {}, (err, token) => {
            if( err ) throw err;

            res.cookie("token", token).json({
                id:userDoc._id,
                username,
            }); // setting up a cookie named "token" with the value token
        });
    }else{
        res.send(400).json("Wrong credentials");
    }
})

app.get("/profile", (req, res) => {
    const {token} = req.cookies;
    
    jwt.verify(token, secret, {}, (err, info) => {
        if(err) throw err;

        res.json(info);
    })

});

app.post("/logout", (req, res) => {
    res.cookie('token', '').json("ok");
});

app.post("/create", uploadMiddleware.single("file") , async (req, res) => {

    const {originalname, path} = req.file;

    const parts = originalname.split('.');

    const extension = parts[parts.length-1];
    const newPath = path+'.'+extension;

    fs.renameSync(path,newPath);

    const {title, summary, content, author} = req.body;

    const postDoc =  await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: author,
    })

    res.json(postDoc);
})

app.get("/create", async (req, res) => {

    res.json( await Post.find().sort({'createdAt':-1}).limit(20));
})


app.put("/create", uploadMiddleware.single("file"),(req, res) => {

    let newPath = '';
    if(req.file){
        const {originalname, path} = req.file;

        const parts = originalname.split('.');

        const extension = parts[parts.length-1];
        newPath = path+'.'+extension;

        fs.renameSync(path,newPath);

    }

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if(err) throw err;

        const {id, title, summary, content} = req.body;

        console.log(id);
        const postDoc = await Post.findById(id);

        const oldPath = postDoc.cover;

        await postDoc.updateOne({
            title,
            summary,
            content,
            cover: newPath ? newPath : oldPath,
        }) 
        
        res.json("ok")
    })

    
})

app.get("/post/:id", async (req, res) => {
    const {id} = req.params;

    const postDoc = await Post.findById(id);

    res.json(postDoc);
})

app.listen(4000);