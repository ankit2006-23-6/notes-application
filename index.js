const express = require("express");
const app = express();
const path = require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
let port = 3000;
app.listen(port,()=>{
    console.log(`listening to port ${3000}`);
})
const{v4:uuidv4} = require ("uuid");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

let notes = [
    {
        id : uuidv4(),
        username:"groceries",
        content : "example: tomatoes, cabbage, etc"
    },
    {
        id : uuidv4(),
        username : "task to complete",
        content : "example: fix patch request, assingment of data structers , etc"
    }
];

app.get("/notes",(req,res)=>{
    res.render("index.ejs",{notes});
})

app.get("/notes/new",(req,res)=>{
    res.render("newpost.ejs");
})

app.post("/notes",(req,res)=>{
    let {username,content} = req.body;
    let id = uuidv4();
    notes.push({id,username,content});
    res.redirect("/notes");
})

app.get("/notes/:id",(req,res)=>{
    let {id} = req.params;
    let info = notes.find((p)=>id==p.id);
    res.render("detail.ejs",{info});
})

app.get("/notes/:id/edit",(req,res)=>{
    let {id} = req.params;
    let info = notes.find((p)=>id==p.id);
    res.render("edit.ejs",{info});
})
app.patch("/notes/:id",(req,res)=>{
    let {id} = req.params;
    let newcontent = req.body.content;
    let info = notes.find((p)=>id==p.id);
    info.content = newcontent;
    res.redirect("/notes");
})

app.delete("/notes/:id",(req,res)=>{
    let {id} = req.params;
    notes = notes.filter((p)=>id!=p.id);
    res.redirect("/notes");
})

